from pydantic import BaseModel

class User(BaseModel):
    id: int
    user_name: str
    email: str
    avatar: str

    number_of_quizzes: int
    completed_quizzes: int



class UserCreate(BaseModel):
    user_name: str
    email: str
    password: str
