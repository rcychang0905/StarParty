# take default image of node boron i.e  node 6.x
FROM node:9.3.0

MAINTAINER Ronnie Chang <rcychang0905@gmail.com>

# create app directory in container
RUN mkdir -p /app

# set /app directory as default working directory
WORKDIR /app

# only copy package.json initially so that `RUN yarn` layer is recreated only
# if there are changes in package.json
ADD package.json yarn.lock /app/

# --pure-lockfile: Don’t generate a yarn.lock lockfile
RUN yarn --pure-lockfile

# copy all file from current dir to /app in container
COPY . /app/

# expose port 3000
EXPOSE 3000

ENV NODE_ENV production

# cmd to start service
CMD [ "yarn", "start" ]
