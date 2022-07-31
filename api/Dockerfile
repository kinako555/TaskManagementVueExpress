FROM node:16
RUN mkdir /api
WORKDIR /api
RUN npm install --location=global express@4.18.1 \
                                  express-generator \
                                  nodemon
COPY package.json /api
COPY package-lock.json /api
RUN npm install