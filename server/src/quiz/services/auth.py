import datetime
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from jose import jwt, JWTError
from pydantic import ValidationError

from ..database import  get_session

from .. import tables
from ..models.users import User, UserCreate
from ..models.auth import Token, User_auth
from ..settings import settings


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/sign-in/')
def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    return AuthService.validate_token(token)

class AuthService:
    @classmethod
    def verify_password(cls, plain_password: str, hashed_password: str) -> bool:
        return bcrypt.verify(plain_password, hashed_password)
    
    @classmethod
    def hashed_password(cls, password: str) -> str:
        return bcrypt.hash(password)
    
    @classmethod
    def validate_token(cls, token: str) -> User_auth:

        exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Could not validate credentials',
            headers={'WWW-Authenticate': 'Bearer'}
        )

        try:
            payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        
        except JWTError:
            raise exception from None
        

        user_data = payload.get('user')

        try:
            user = User_auth.model_validate(user_data)

        except ValidationError:
            raise exception from None
        
        return user
        
    @classmethod
    def create_token(cls, user: tables.User) -> Token:
        user_data = User_auth.from_orm(user)

        now = datetime.datetime.utcnow()
        payload = {
            'iat': now,
            'nbf': now,
            'exp': now + datetime.timedelta(seconds=settings.jwt_expiration),
            'sub': str(user_data.id),
            'user': user_data.model_dump()
        }
        
        token = jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)

        return Token(access_token=token, token_type='bearer')
    

    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def register_new_user(self, user_data: UserCreate) -> Token:
        user = tables.User(
            email=user_data.email,
            user_name=user_data.user_name,
            password=self.hashed_password(user_data.password),
            avatar='default.png',

            created_quizzes_ids=[],
            number_of_quizzes=0,
            completed_quizzes=0


        )

        self.session.add(user)
        self.session.commit()

        return self.create_token(user)
    
    def authenticate_user(self, email: str, password: str) -> Token:
        user = self.session.query(tables.User).filter(tables.User.email == email).first()
        if not user or not self.verify_password(password, user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='Incorrect username or password',    
                headers={'WWW-Authenticate': 'Bearer'}
            )
        
        return self.create_token(user)