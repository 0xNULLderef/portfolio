FROM php:8.2-fpm-alpine

ADD ./www.conf /usr/local/etc/php-fpm.d/www.conf

ADD ./php.ini-development /usr/local/etc/php/php.ini

RUN apk add --no-cache freetds \
	freetds-dev \
	&& docker-php-ext-install bcmath \
	pdo_mysql \
	pdo_dblib \
	mysqli \
	&& docker-php-ext-enable mysqli

RUN mkdir -p /var/www/html && chown www-data:www-data /var/www/html

