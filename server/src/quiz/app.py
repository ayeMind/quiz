from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api import router

# from .database import engine
# from .tables import Base
# Base.metadata.create_all(engine)

app = FastAPI()

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