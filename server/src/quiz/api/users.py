from fastapi import APIRouter, Body, Depends
from typing import List

from ..services.users import UsersService
from ..models.users import User

router = APIRouter(
    prefix='/users'
)

@router.get('/', response_model=List[User], tags=["USERS"], description="Get a list of users")
def get_users(service:  UsersService = Depends()):
    return service.get_list()

@router.get('/{user_id}', response_model=User, tags=["USERS"], description="Get a user by id")
def get_user(user_id: int, service: UsersService = Depends()):
    return service.get_user(user_id)

@router.put('/{user_id}/complete', response_model=User, tags=["USERS"], description="Update a user after completing a quiz")
def complete_quiz(user_id: int, service: UsersService = Depends()):
    return service.complete_quiz(user_id)

@router.put('/{user_id}/create/', response_model=User, tags=["USERS"], description="Update a user after creating a quiz")
def create_quiz(user_id: int, service: UsersService = Depends()):
    return service.create_quiz(user_id)

@router.put('/{user_id}/remove/', response_model=User, tags=["USERS"], description="Update a user after removing a quiz")
def remove_quiz(user_id: int, service: UsersService = Depends()):
    return service.remove_quiz(user_id)