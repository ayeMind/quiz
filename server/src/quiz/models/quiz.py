from pydantic import BaseModel
from typing import Annotated
from fastapi import File

from datetime import datetime
class QuizCreate(BaseModel):
    author_id: int
    title: str
    description: str
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