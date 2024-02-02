from fastapi import FastAPI

from .api import router

# from .database import engine
# from .tables import Base
# Base.metadata.create_all(engine)

app = FastAPI()
app.include_router(router)