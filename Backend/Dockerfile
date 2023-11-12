FROM node:14 AS builder

# Setting Home Directory for containers
WORKDIR /usr/src/app

COPY package*.json ./

## Installing dependencies
RUN npm ci

# Copying source code to the container
COPY . .
RUN npm run build

CMD ["node","dist/main.js"]
