import uvicorn

from .settings import settings

uvicorn.run(
    'quiz.app:app',
    reload=True,
    host=settings.server_host,
    port=settings.server_port,
)