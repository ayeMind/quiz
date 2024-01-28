from fastapi import FastAPI

# from .database import engine
# from .tables import Base
# Base.metadata.create_all(engine)

app = FastAPI()

@app.get('/')
def root():
    return {'message': 'aboba'},