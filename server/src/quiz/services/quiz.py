import io
from typing import List
from fastapi import Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from datetime import datetime

from .. import tables
from ..database import get_session
from ..models import quiz as quiz_model


class QuizService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def create_quiz(self, quiz: quiz_model.QuizCreate) -> quiz_model.ServerQuiz:

        new_quiz = tables.Quiz(
    
            settings={},
            author_id=quiz.author_id,
            title=quiz.title,
            description=quiz.description,
            tags=quiz.tags,
            questions=quiz.questions,
            number_of_completions = 0,
        )

        self.session.add(new_quiz)
        self.session.commit()
        self.session.refresh(new_quiz)

        # Download preview image to the server
        previewPath = f'../files/previews/{new_quiz.id}.png'
        with open(previewPath, 'wb') as f:  
            f.write(quiz.preview)

        return new_quiz


    def get_quiz(self, quiz_id: int) -> quiz_model.ServerQuiz:
        quiz = self.session.query(tables.Quiz).filter_by(id=quiz_id).first()
        return quiz_model.ServerQuiz.from_orm(quiz)
    

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
    
    def get_user_quizzes(self, user_id: int) -> List[quiz_model.ServerQuiz]:
        quizzes = self.session.query(tables.Quiz).filter_by(author_id=user_id).all()
        return [quiz_model.ServerQuiz.from_orm(quiz) for quiz in quizzes]


    def update_quiz(self, quiz_id: int, quiz: quiz_model.QuizCreate) -> quiz_model.ServerQuiz:
        self.session.query(tables.Quiz).filter_by(id=quiz_id).update({
            "title": quiz.title,
            "description": quiz.description,
            "tags": quiz.tags,
            "questions": quiz.questions,
            "updated_at": datetime.now()
        })
        self.session.commit()
        return self.get_quiz(quiz_id)
    

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