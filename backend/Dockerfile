FROM python:3

RUN useradd -ms /bin/bash django 

RUN mkdir /code 

WORKDIR /code 
COPY ./requirement.txt /code/ 
RUN pip install -r requirement.txt 

COPY ./app/ /code/app/ 
COPY ./manage.py /code/ 
COPY ./setup.sh /code/

RUN chown -R django: /code

USER django 

EXPOSE 49152 

CMD ./setup.sh

