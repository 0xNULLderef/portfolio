FROM httpd:alpine

ADD ./httpd.conf /usr/local/apache2/conf/httpd.conf

RUN mkdir -p /var/www/html && chown www-data:www-data /var/www/html
