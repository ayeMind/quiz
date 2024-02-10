import json
from typing import List
from fastapi import Depends
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

        return new_quiz

    

    def get_quiz(self, quiz_id: int) -> quiz_model.ServerQuiz:
        quiz = self.session.query(tables.Quiz).filter_by(id=quiz_id).first()
        return quiz_model.ServerQuiz.from_orm(quiz)
    

    def get_quizzes(self, skip: int = 0, limit: int = 10) -> List[quiz_model.ServerQuiz]:
        quizzes = self.session.query(tables.Quiz).offset(skip).limit(limit).all()
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