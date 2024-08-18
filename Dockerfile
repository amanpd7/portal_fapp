FROM node:18.3-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm start" ]