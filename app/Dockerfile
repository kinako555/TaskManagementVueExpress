FROM node:16
RUN mkdir /app
WORKDIR /app
RUN npm install -g @vue/cli@5.0.6
COPY package.json /app
COPY package-lock.json /app
RUN npm install