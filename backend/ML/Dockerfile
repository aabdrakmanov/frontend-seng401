# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.10.3

# Copy local code to the container image.
ENV ML /ml
WORKDIR $ML
COPY . ./

# Install production dependencies.
RUN pip install -r ./requirements.txt

CMD ["set","FLASK_APPmachine_learning_api.py"]
CMD ["flask","run"]