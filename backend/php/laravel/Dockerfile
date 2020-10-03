FROM php:7.4-cli-alpine3.12

RUN set -ex \
  && apk --no-cache add \
    postgresql-dev
RUN docker-php-ext-install pgsql pdo_pgsql

COPY ./dao /usr/src/dao
COPY ./laravel /usr/src/laravel

WORKDIR /usr/src/laravel
EXPOSE 8000
ENTRYPOINT [ "php", "artisan", "serve", "--host", "0.0.0.0" ]