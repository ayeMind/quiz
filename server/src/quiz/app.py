from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api import router

# from .database import engine
# from .tables import Base
# Base.metadata.create_all(engine)

tags_metadata = [
    {
        "name": "AUTH",
        "description": "Authentication operations, including getting a token of a new user",
    },
    {
        "name": "USERS",
        "description": "Operations with users. Nothing else.",
    },
    {
        "name": "QUIZ",
        "description": "Operations with quizzes. Nothing else.",
    },
]

app = FastAPI(
    title="Quiz API",
    openapi_tags=tags_metadata,
)

origins = [
    "http://localhost",
    "http://localhost:5173",  
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router)