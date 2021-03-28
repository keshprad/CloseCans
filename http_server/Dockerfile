FROM python:3.8-slim-buster
ENV SERVER_HOME /http_server
WORKDIR $SERVER_HOME
COPY . ./
RUN pip install pipenv
RUN pipenv install --deploy --system
CMD exec gunicorn --bind :$PORT --workers 1 --worker-class uvicorn.workers.UvicornWorker  --threads 8 src.main:app