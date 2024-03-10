@echo off

cd /d "%~dp0\server"
docker-compose up -d

cd /d "%~dp0\server\src"
call ..\.venv\Scripts\activate
..\.venv\Scripts\python.exe -m quiz
call deactivate
