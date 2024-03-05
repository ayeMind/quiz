from sqlalchemy import Column, Integer, String, JSON, ARRAY, func, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True) 
    password = Column(String, nullable=False)
    avatar = Column(String, server_default='default.png', nullable=False)

    created_quizzes_ids = Column(ARRAY(Integer), nullable=False)

    number_of_quizzes = Column(Integer, server_default='0', nullable=False)
    completed_quizzes = Column(Integer, server_default='0', nullable=False)


class Quiz(Base):
    __tablename__ = 'quiz'

    id = Column(Integer, primary_key=True, unique=True, autoincrement=True)
    settings = Column(JSON, nullable=False)

    title = Column(String, nullable=False)
    description = Column(String, nullable=False, server_default='')
    tags = Column(ARRAY(String), nullable=False)
    questions = Column(ARRAY(JSON), nullable=False)
    mode = Column(String, nullable=False)
    result = Column(ARRAY(JSON), nullable=False)
    author_id = Column(Integer, nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    number_of_completions = Column(Integer, server_default='0', nullable=False)
