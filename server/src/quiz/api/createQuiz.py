from fastapi import APIRouter, Depends

from ..models import quiz as quiz_model
from ..services.createQuiz import CreateQuizService;

router = APIRouter(
    prefix='/quiz'
)

@router.post('/create/', response_model=quiz_model.ServerQuiz)
def create_quiz(quiz: quiz_model.QuizCreate, service: CreateQuizService = Depends()):
    return service.create_quiz(quiz)
