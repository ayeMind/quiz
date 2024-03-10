from typing import List
from fastapi import Depends
from sqlalchemy.orm import Session

from .. import tables
from ..database import get_session

class UsersService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def get_list(self) -> List[tables.User]:
        users = self.session.query(tables.User).all()
        return users
    
    def get_user(self, user_id: int) -> tables.User:
        user = self.session.query(tables.User).get(user_id)
        if not user:
            raise ValueError('User not found')
        return user
    
    def complete_quiz(self, user_id: int) -> tables.User:
        user = self.get_user(user_id)
        user.completed_quizzes += 1
        self.session.commit()
        self.session.refresh(user)
        return user
    
    def create_quiz(self, user_id: int) -> tables.User:
        user = self.get_user(user_id)
        user.number_of_quizzes += 1
        self.session.commit()
        self.session.refresh(user)
        return user
    
    def remove_quiz(self, user_id: int) -> tables.User:
        user = self.get_user(user_id)
        
        if user.number_of_quizzes == 0:
            raise ValueError('User has no quizzes')
        
        user.number_of_quizzes -= 1
        self.session.commit()
        self.session.refresh(user)
        return user