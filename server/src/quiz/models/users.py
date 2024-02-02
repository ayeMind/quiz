from pydantic import BaseModel

class User(BaseModel):
    id: int
    user_name: str
    email: str
    password: str
