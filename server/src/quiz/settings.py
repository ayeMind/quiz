from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    server_host: str = '127.0.0.1'
    server_port: int = 8000
    database_url: str = "postgresql://quizuser:secretpassword@localhost:5432/quizdb"

    jwt_secret: str
    jwt_algorithm: str = "HS256" 
    jwt_expiration: int = 60 * 60 * 24 * 7


settings = Settings(
    _env_file='.env',
    _env_file_encoding='utf-8'
)