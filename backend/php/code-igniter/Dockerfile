FROM php:7.4-cli-alpine3.12

RUN set -ex \
  && apk --no-cache add \
    postgresql-dev 
RUN docker-php-ext-install pgsql pdo_pgsql intl

COPY ./dao /usr/src/dao
COPY ./code-igniter /usr/src/code-igniter

WORKDIR /usr/src/code-igniter
EXPOSE 8080
ENTRYPOINT [ "php", "spark", "serve", "--host", "0.0.0.0" ]