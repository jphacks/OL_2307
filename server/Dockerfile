FROM python:3.9-buster

WORKDIR /src/server

RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--reload"]