from pydantic import BaseModel

class QuizCreate(BaseModel):
    author_id: int
    title: str
    description: str
    preview: str
    tags: list
    questions: list


    class Config:
        from_attributes = True