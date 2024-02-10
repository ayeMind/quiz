from pydantic import BaseModel

from datetime import datetime
class QuizCreate(BaseModel):
    author_id: int
    title: str
    description: str
    preview: str
    tags: list
    questions: list


    class Config:
        from_attributes = True

class ServerQuiz(BaseModel):
    id: int
    author_id: int
    title: str
    description: str
    tags: list
    questions: list


    class Config:
        from_attributes = True