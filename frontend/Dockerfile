FROM node:lts

RUN useradd -ms /bin/bash test

WORKDIR /usr/src/app/frontend

COPY package*.json ./

RUN npm install

COPY . ./

RUN chown -R test:test /usr/src/app/frontend && \
 chmod -R 701 /usr/src/app/frontend

USER test

EXPOSE 3000

HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1  

CMD ["npm", "start"]
