FROM node:8.9
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
# RUN npm cache clean
RUN npm install --no-optional  --no-shrinkwrap --no-package-lock
COPY . /usr/src/app
EXPOSE 3000
CMD ["npm","start"]