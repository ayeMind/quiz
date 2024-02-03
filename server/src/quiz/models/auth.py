from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'

class User_auth(BaseModel):
    id: int
    user_name: str
    email: str
    avatar: str

    class Config:
        from_attributes = True