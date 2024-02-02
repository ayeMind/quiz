from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'

class User_auth(BaseModel):
    id: int

    class Config:
        from_attributes = True