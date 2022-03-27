# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.10.3

# Copy local code to the container image.
ENV ML /ml
WORKDIR $ML

RUN pip install django
RUN pip install flask-mysqldb
COPY requirements.txt requirements.txt
RUN pip install -r ./requirements.txt
COPY . ./

ENV FLASK_APP=machine_learning_api.py

CMD ["python3","-m","flask","run"]