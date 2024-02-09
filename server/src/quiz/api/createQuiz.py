from fastapi import APIRouter, Depends

from ..models import quiz as quiz_model
from ..services import createQuiz

router = APIRouter(
    prefix='/quiz'
)

@router.post('/quiz/create/', response_model=quiz_model.Quiz)
def create_quiz(quiz: quiz_model.QuizCreate, service: createQuiz = Depends()):
    return service.create_quiz(quiz)
