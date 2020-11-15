FROM node:10

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./ ./

RUN yarn build

EXPOSE 3000

RUN yarn global add live-server

WORKDIR /usr/src/app/build

CMD [ "live-server", "--host=0.0.0.0" ]