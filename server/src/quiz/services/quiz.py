import io
from typing import Annotated, List
from fastapi import Depends, File, UploadFile
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from datetime import datetime

from .. import tables
from ..database import get_session
from ..models import quiz as quiz_model


class QuizService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def create_quiz(self, quiz: quiz_model.QuizCreate):

        new_quiz = tables.Quiz(
    
            settings={},
            author_id=quiz.author_id,
            title=quiz.title,
            description=quiz.description,
            tags=quiz.tags,
            questions=quiz.questions,
            number_of_completions = 0,
            mode = quiz.mode,
            result = quiz.result,
        )

        self.session.add(new_quiz)
        self.session.commit()
        self.session.refresh(new_quiz)

        return {'message': {'Quiz created success'}}



    def get_quiz(self, quiz_id: int) -> quiz_model.ServerQuiz:
        quiz = self.session.query(tables.Quiz).filter_by(id=quiz_id).first()
        return quiz_model.ServerQuiz.from_orm(quiz)
    
    def get_last_quiz_id(self):
        last_quiz = self.session.query(tables.Quiz).order_by(tables.Quiz.id.desc()).first()
        if last_quiz:
            return last_quiz.id
        else:
            return None
    

    def get_quizzes(self, skip: int = 0, limit: int = 10) -> List[quiz_model.ServerQuiz]:
        quizzes = self.session.query(tables.Quiz).offset(skip).limit(limit).all()
        return [quiz_model.ServerQuiz.from_orm(quiz) for quiz in quizzes]
    
    def get_all_quizzes(self) -> List[quiz_model.ServerQuiz]:
        quizzes = self.session.query(tables.Quiz).all()
        return [quiz_model.ServerQuiz.from_orm(quiz) for quiz in quizzes]
    
    def get_quizzes_by_tags(self, tags: str) -> List[quiz_model.ServerQuiz]:
        tag_list = tags.split(',')
        quizzes = self.session.query(tables.Quiz).filter(tables.Quiz.tags.contains(tag_list)).all()
        return [quiz_model.ServerQuiz.from_orm(quiz) for quiz in quizzes]
    
    def get_user_quizzes(self, user_id: int, skip: int, limit: int) -> List[quiz_model.ServerQuiz]:
        quizzes = self.session.query(tables.Quiz).filter_by(author_id=user_id).offset(skip).limit(limit).all()
        return [quiz_model.ServerQuiz.from_orm(quiz) for quiz in quizzes]


    def update_quiz(self, quiz_id: int, quiz: quiz_model.QuizCreate) -> quiz_model.ServerQuiz:
        self.session.query(tables.Quiz).filter_by(id=quiz_id).update({
            "title": quiz.title,
            "description": quiz.description,
            "tags": quiz.tags,
            "questions": quiz.questions,
            "updated_at": datetime.now(),
            "mode": quiz.mode,
            "result": quiz.result,
        })
        self.session.commit()
        return self.get_quiz(quiz_id)
    
        
    async def create_file(self, file: Annotated[bytes | None, File()] = None):
        if not file:
            return {"message": "No file sent"}
        else:
            return {"file_size": len(file)}


    async def save_preview(self, file: UploadFile | None = None):
        if not file:
            return {"message": "No upload file sent"}
        else:
            file_name = self.get_last_quiz_id()
            with open(f'../files/previews/{file_name}.png', 'wb') as preview_file:
                try:
                    preview_file.write(file.file.read())
                    return {"message": "File uploaded successfully"}
                except Exception as e:
                    return {"message": str(e)}
        
 

    def get_preview(self, quiz_id: int):
        
        with open(f'../files/previews/{quiz_id}.png', 'rb') as preview_file:
            preview_bytes = preview_file.read()
            return StreamingResponse(io.BytesIO(preview_bytes), media_type="image/png")
        
    def get_all_preview(self):
        previews = []
        for quiz in self.get_all_quizzes():
            with open(f'../files/previews/{quiz.id}.png', 'rb') as preview_file:
                preview_bytes = preview_file.read()
                png = io.BytesIO(preview_bytes)
                previews.append({
                    "id": quiz.id,
                    "preview": png
                })
        return previews
    
    def delete_quiz(self, quiz_id: int):
        self.session.query(tables.Quiz).filter_by(id=quiz_id).delete()
        self.session.commit()
        return {"message": "Quiz deleted successfully"}
    
    def get_quizzes_amount(self):
        return self.session.query(tables.Quiz).count()
    
    def get_user_quizzes_amount(self, user_id: int):
        return self.session.query(tables.Quiz).filter_by(author_id=user_id).count()