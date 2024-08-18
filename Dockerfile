FROM node:18.19.1-alpine

WORKDIR /app

COPY . .

ARG REACT_APP_BACKEND_URL

ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

RUN npm install -g serve

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "build" ]