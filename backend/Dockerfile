FROM python:3

RUN mkdir /code
COPY ./requirement.txt /code/

WORKDIR /code
RUN pip install -r requirement.txt

COPY ./app/ /code/app/
COPY ./manage.py /code/
COPY ./setup.sh /code/

EXPOSE 49152

CMD ./setup.sh

