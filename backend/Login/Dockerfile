# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.10.3

# Copy local code to the container image.
ENV LOGIN /login
WORKDIR $LOGIN

RUN pip install django
RUN pip install flask-mysqldb
COPY requirements.txt requirements.txt
RUN pip install -r ./requirements.txt
COPY . ./

CMD ["python3","login_api.py"]
