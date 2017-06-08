FROM node:alpine

RUN mkdir -p /code
WORKDIR /code
ADD . /code

RUN yarn
RUN yarn global add grunt-cli knex
CMD [ "yarn", "start" ]

EXPOSE 3000