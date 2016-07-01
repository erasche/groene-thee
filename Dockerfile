FROM node:4
ADD . /app
WORKDIR /app
EXPOSE 8080
RUN make install
RUN npm rebuild node-sass
CMD ["make", "run"]
