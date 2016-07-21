FROM node:4

RUN apt-get update -qq && \
    apt-get install -y nginx
EXPOSE 80

ADD . /app
WORKDIR /app
RUN make install && \
    npm rebuild node-sass && \
    make build && \
    cp *.html /var/www/html && \
    cp -Rv css /var/www/html/ && \
    cp -Rv build/ /var/www/html/

CMD ["nginx", "-g", "daemon off;"]
