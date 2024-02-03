from fastapi import APIRouter, Depends
from typing import List

from ..services.users import UsersService
from ..models.users import User

router = APIRouter(
    prefix='/users'
)

@router.get('/', response_model=List[User])
def get_users(service:  UsersService = Depends()):
    return service.get_list()

@router.get('/{user_id}', response_model=User)
def get_user(user_id: int, service: UsersService = Depends()):
    return service.get_user(user_id)
