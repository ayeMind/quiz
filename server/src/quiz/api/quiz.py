from fastapi import APIRouter, Depends

from ..models import quiz as quiz_model
from ..services.quiz import QuizService;

router = APIRouter(
    prefix='/quiz'
)

@router.post('/create/', response_model=quiz_model.ServerQuiz, tags=["quiz"], description="Create a new quiz")
def create_quiz(quiz: quiz_model.QuizCreate, service: QuizService = Depends()):
    return service.create_quiz(quiz)


@router.get('/{quiz_id}', response_model=quiz_model.ServerQuiz, tags=["quiz"], description="Get a quiz by id")
def get_quiz(quiz_id: int, service: QuizService = Depends()):
    return service.get_quiz(quiz_id)

@router.get('/', response_model=list[quiz_model.ServerQuiz], tags=["quiz"], description="Get a list of quizzes by skip and limit")
def get_quizzes(skip: int = 0, limit: int = 10, service: QuizService = Depends()):
    return service.get_quizzes(skip, limit)

@router.get('/user/{user_id}', response_model=list[quiz_model.ServerQuiz], tags=["quiz"], description="Get a list of quizzes by user id")
def get_user_quizzes(user_id: int, service: QuizService = Depends()):
    return service.get_user_quizzes(user_id)

@router.put('/{quiz_id}', response_model=quiz_model.ServerQuiz, tags=["quiz"], description="Update a quiz by id")
def update_quiz(quiz_id: int, quiz: quiz_model.QuizCreate, service: QuizService = Depends()):
    return service.update_quiz(quiz_id, quiz)

@router.get('/all', response_model=list[quiz_model.ServerQuiz], tags=["quiz"], description="Get a list of all quizzes")
def get_all_quizzes(service: QuizService = Depends()):
    return service.get_all_quizzes()



@router.get('/tags/{tags}', response_model=list[quiz_model.ServerQuiz], tags=["quiz"], description="Get a list of quizzes by tags")
def get_quizzes_by_tags(tags: str, service: QuizService = Depends()):
    return service.get_quizzes_by_tags(tags)