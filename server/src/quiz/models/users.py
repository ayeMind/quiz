from pydantic import BaseModel

class User(BaseModel):
    id: int
    user_name: str
    email: str
    avatar: str


class UserCreate(BaseModel):
    id: int
    user_name: str
    email: str
    password: str
