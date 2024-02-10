from typing import List
from fastapi import Depends
from sqlalchemy.orm import Session
from datetime import datetime

from .. import tables
from ..database import get_session
from ..models import quiz as quiz_model


class CreateQuizService:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def create_quiz(self, quiz: quiz_model.QuizCreate) -> quiz_model.ServerQuiz:
        new_quiz = tables.Quiz(
    
            path=f'quiz/{quiz.title.lower().replace(" ", "-")}/{quiz.author_id}/',
            settings={},
            author_id=quiz.author_id,
            title=quiz.title,
            description=quiz.description,
            preview=quiz.preview,
            tags=quiz.tags,
            questions=quiz.questions,

            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            number_of_completions = 0,
        )

        self.session.add(new_quiz)
        self.session.commit()
        self.session.refresh(new_quiz)

        return quiz_model.ServerQuiz.from_orm(new_quiz)