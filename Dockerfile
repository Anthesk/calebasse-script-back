# syntax=docker/dockerfile:1
FROM node

WORKDIR /usr/src/app

COPY . .
RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]