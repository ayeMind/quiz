from typing import List
from fastapi import Depends
from sqlalchemy.orm import Session
from datetime import datetime

from .. import tables
from ..database import get_session
from ..models import quiz as quiz_model


def create_quiz(
    quiz: quiz_model.QuizCreate,
    session: Session = Depends(get_session),
) -> quiz_model.Quiz:
    new_quiz = tables.Quiz(
        author_id=quiz.author_id,
        title=quiz.title,
        description=quiz.description,
        preview=quiz.preview,
        tags=quiz.tags,
        questions=[tables.Question(**q.dict()) for q in quiz.questions],
        created_at = datetime.utcnow(),
        updated_at = datetime.utcnow()
    )
    session.add(new_quiz)
    session.commit()
    session.refresh(new_quiz)
    return quiz_model.Quiz.from_orm(new_quiz)