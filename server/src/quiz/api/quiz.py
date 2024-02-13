from typing import Annotated
from fastapi import APIRouter, Depends, File, UploadFile

from ..models import quiz as quiz_model
from ..services.quiz import QuizService;

router = APIRouter(
    prefix='/quiz'
)

@router.post('/create/', tags=["QUIZ"], description="Create a new quiz")
def create_quiz(quiz: quiz_model.QuizCreate, service: QuizService = Depends()):
    return service.create_quiz(quiz)


@router.get('/{quiz_id}', response_model=quiz_model.ServerQuiz, tags=["QUIZ"], description="Get a quiz by id")
def get_quiz(quiz_id: int, service: QuizService = Depends()):
    return service.get_quiz(quiz_id)

@router.get('/', response_model=list[quiz_model.ServerQuiz], tags=["QUIZ"], description="Get a list of quizzes by skip and limit")
def get_quizzes(skip: int = 0, limit: int = 10, service: QuizService = Depends()):
    return service.get_quizzes(skip, limit)

@router.get('/user/{user_id}', response_model=list[quiz_model.ServerQuiz], tags=["QUIZ"], description="Get a list of quizzes by user id")
def get_user_quizzes(user_id: int, skip: int = 0, limit: int = 10, service: QuizService = Depends()):
    return service.get_user_quizzes(user_id, skip, limit)

@router.put('/{quiz_id}', response_model=quiz_model.ServerQuiz, tags=["QUIZ"], description="Update a quiz by id")
def update_quiz(quiz_id: int, quiz: quiz_model.QuizCreate, service: QuizService = Depends()):
    return service.update_quiz(quiz_id, quiz)

@router.get('/all', response_model=list[quiz_model.ServerQuiz], tags=["QUIZ"], description="Get a list of all quizzes")
def get_all_quizzes(service: QuizService = Depends()):
    return service.get_all_quizzes()

@router.get('/tags/{tags}', response_model=list[quiz_model.ServerQuiz], tags=["QUIZ"], description="Get a list of quizzes by tags")
def get_quizzes_by_tags(tags: str, service: QuizService = Depends()):
    return service.get_quizzes_by_tags(tags)

@router.get('/preview/{quiz_id}', tags=["QUIZ"], description="Get a preview image by quiz id")
def get_preview(quiz_id: int, service: QuizService = Depends()):
    return service.get_preview(quiz_id)

@router.get('/preview/', tags=["QUIZ"], description="Get a preview image by quiz id")
def get_all_preview(service: QuizService = Depends()):
    return service.get_all_preview()


@router.delete('/{quiz_id}', tags=["QUIZ"], description="Delete a quiz by id")
def delete_quiz(quiz_id: int, service: QuizService = Depends()):
    return service.delete_quiz(quiz_id)

@router.post("/files/", tags=["QUIZ"])
async def create_file(file: Annotated[bytes, File()], service: QuizService = Depends()):
    return service.create_file(file)

@router.post("/uploadfile/", tags=["QUIZ"])
async def create_upload_file(file: UploadFile, service: QuizService = Depends()):
    return service.create_upload_file(file)

@router.post("/preview/", tags=["QUIZ"])
async def save_preview(file: UploadFile = File(...), service: QuizService = Depends()):
    return await service.save_preview(file)

@router.get("/amount/", tags=["QUIZ"], description="Get amount of quizzes")
def get_amount(service: QuizService = Depends()):
    return service.get_quizzes_amount()

@router.get("/amount/{user_id}", tags=["QUIZ"], description="Get amount of quizzes by user id")
def get_user_amount(user_id: int, service: QuizService = Depends()):
    return service.get_user_quizzes_amount()