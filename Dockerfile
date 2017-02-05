FROM node:wheezy

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm i -g typings
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8081

CMD [ "npm", "start" ]
