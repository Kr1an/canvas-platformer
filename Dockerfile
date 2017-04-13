FROM node:latest
EXPOSE 8080
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g live-server
CMD ["cd /usr/src/app"]
CMD ["npm","start"]
