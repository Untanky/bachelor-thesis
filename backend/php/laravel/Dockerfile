FROM php:7.4-cli-alpine3.12

RUN set -ex \	
  && apk --no-cache add \	
    postgresql-dev	      
RUN docker-php-ext-install pgsql pdo_pgsql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer

COPY ./dao /usr/src/dao
WORKDIR /usr/src/dao
RUN composer install

COPY ./laravel /usr/src/laravel
WORKDIR /usr/src/laravel
RUN composer install

EXPOSE 8000
ENTRYPOINT [ "php", "artisan", "serve", "--host", "0.0.0.0" ]