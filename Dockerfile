# source: https://hub.docker.com/_/node?tab=tags&page=1&ordering=last_updated&name=slim
FROM node:14.17.4-slim

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available
COPY package*.json /app/

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# Bundle app source
COPY . /app/

# for later use in operation
RUN date +"%Y-%m-%d %T" > BUILD_TIME
ARG BUILD_TAG
RUN echo $BUILD_TAG > BUILD_TAG

EXPOSE 3000
CMD [ "node", "server.js" ]
