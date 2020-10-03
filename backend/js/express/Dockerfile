FROM node:10

# Create dao directory
WORKDIR /usr/src/dao
# Install dao dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./dao/package.json ./
COPY ./dao/yarn.lock ./

RUN yarn install

COPY ./dao ./

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./express/package.json ./
COPY ./express/yarn.lock ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./express ./

EXPOSE 8080

ENTRYPOINT [ "yarn", "start" ]