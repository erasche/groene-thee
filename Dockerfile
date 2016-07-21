FROM node:4
ADD . /app
WORKDIR /app
EXPOSE 80
RUN make install && \
    npm rebuild node-sass && \
    apt-get update -qq && \
    apt-get install -y nginx && \
    make build && \
    cp *.html /var/www/html && \
    cp -Rv css /var/www/html/ && \
    cp -Rv build/ /var/www/html/

CMD ["nginx", "-g", "daemon off;"]
