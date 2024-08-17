FROM node:18.3-alpine

WORKDIR /app

COPY . .

RUN npm install -g serve

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "build" ]