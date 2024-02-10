from fastapi import APIRouter, Depends

from ..models import quiz as quiz_model
from ..services.quiz import QuizService;

router = APIRouter(
    prefix='/quiz'
)

@router.post('/create/', response_model=quiz_model.ServerQuiz)
def create_quiz(quiz: quiz_model.QuizCreate, service: QuizService = Depends()):
    return service.create_quiz(quiz)


@router.get('/{quiz_id}', response_model=quiz_model.ServerQuiz)
def get_quiz(quiz_id: int, service: QuizService = Depends()):
    return service.get_quiz(quiz_id)

@router.get('/', response_model=list[quiz_model.ServerQuiz])
def get_quizzes(skip: int = 0, limit: int = 10, service: QuizService = Depends()):
    return service.get_quizzes(skip, limit)

@router.get('/user/{user_id}', response_model=list[quiz_model.ServerQuiz])
def get_user_quizzes(user_id: int, service: QuizService = Depends()):
    return service.get_user_quizzes(user_id)

@router.put('/{quiz_id}', response_model=quiz_model.ServerQuiz)
def update_quiz(quiz_id: int, quiz: quiz_model.QuizCreate, service: QuizService = Depends()):
    return service.update_quiz(quiz_id, quiz)