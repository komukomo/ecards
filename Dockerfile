FROM python:3.5

RUN mkdir -p /usr/src/app
RUN mkdir -p /var/ecards
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app
RUN pip3 install --no-cache-dir -r requirements.txt

COPY ./server.py /usr/src/app/
COPY ./serverconf.prod.json /usr/src/app/
COPY dist /usr/src/app/dist

CMD ["python", "./server.py", "prod"]
