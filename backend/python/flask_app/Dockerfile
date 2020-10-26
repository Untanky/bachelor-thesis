# set base image (host OS)
FROM python:3.8

# set the working directory in the container
WORKDIR /code/flask_app

# copy the dependencies file to the working directory
COPY ./flask_app/requirements.txt .

# install dependencies
RUN pip install -r requirements.txt

# copy the content of the local src directory to the working directory
COPY ./flask_app .

COPY ./dao ../dao

# command to run on container start
CMD [ "python", "app.py" ]