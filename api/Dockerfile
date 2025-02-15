FROM python:3.10

ENV PYTHONBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

RUN useradd -ms /bin/bash test

WORKDIR /usr/src/app/backend

COPY requirements.txt ./

RUN  apt-get update && \
 apt-get install -y postgresql postgresql-contrib && \
 python -m pip install --upgrade pip && \
 python -m pip install -r requirements.txt --no-cache-dir

COPY . ./

RUN chown -R test:test /usr/src/app/backend && \
 chmod -R 777 /usr/src/app/backend && \
 chmod +x /usr/src/app/backend/docker-entrypoint.sh

USER test

EXPOSE 8000

#HEALTHCHECK CMD curl --fail http://localhost:8000/admin || exit 1  

ENTRYPOINT [ "/usr/src/app/backend/docker-entrypoint.sh" ]







