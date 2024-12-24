FROM node:lts

RUN useradd -ms /bin/bash test

WORKDIR /usr/src/app/frontend

COPY package*.json ./

RUN npm install

COPY --chown=test:test . ./

RUN chmod -R 701 /usr/src/app/frontend

USER test

EXPOSE 3000

HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1  

#RUN npm run build
#RUN npm install -g serve
#RUN npx update-browserslist-db@latest

#CMD ["serve", "-s", "build"]
CMD ["npm", "start"]
