FROM node:6.10.3-alpine

RUN mkdir -p /code
WORKDIR /code
ADD . /code

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.3/main' >> /etc/apk/repositories

RUN apk update && \
    apk add ffmpeg-dev=2.8.11-r0 && \
    apk add ffmpeg=2.8.11-r0 && \
    apk add libc6-compat

ENV YARN_VERSION=0.24.6
ENV PATH="$PATH:/opt/yarn-0.24.6/bin"

RUN rm -rf /usr/local/bin/yarn && apk add --no-cache git
ADD https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v${YARN_VERSION}.tar.gz /opt/yarn.tar.gz
RUN yarnDirectory=/opt/yarn && \
    mkdir -p "$yarnDirectory" && \
    tar -xzf /opt/yarn.tar.gz -C "$yarnDirectory" && \
    ln -s "$yarnDirectory/dist/bin/yarn" /usr/local/bin/ && \
    rm /opt/yarn.tar.gz

RUN yarn
RUN yarn global add grunt-cli knex
CMD [ "yarn", "start" ]

EXPOSE 8000 3000