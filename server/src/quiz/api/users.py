from fastapi import APIRouter
from typing import List

from ..database import Session
from .. import tables
from ..models.users import User

router = APIRouter(
    prefix='/users'
)

@router.get('/', response_model=List[User])
def get_users():
    session = Session() 
    users = session.query(tables.User).all()

    return users

