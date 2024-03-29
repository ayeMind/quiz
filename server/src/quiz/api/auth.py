from fastapi import APIRouter

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from ..models.auth import Token, User_auth
from ..models.users import User, UserCreate

from ..services.auth import AuthService, get_current_user

router = APIRouter(
    prefix='/auth',
)

@router.post('/sign-up/', response_model=Token, tags=["AUTH"], description="Register a new user")
def sign_up(user_data: UserCreate, service: AuthService = Depends()):
    return service.register_new_user(user_data)

@router.post('/sign-in/', response_model=Token, tags=["AUTH"], description="Sign in")
def sign_in(form_data: OAuth2PasswordRequestForm = Depends(), service: AuthService = Depends()):
    return service.authenticate_user(form_data.username, form_data.password)

@router.get('/user/', response_model=User_auth, tags=["AUTH"], description="Get user by token")
def get_user(user: User = Depends(get_current_user)):
    return user