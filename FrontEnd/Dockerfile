FROM node:8.9

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependecies
RUN npm i -g @angular/cli --no-optional  --no-shrinkwrap --no-package-lock
Run npm i --no-optional  --no-shrinkwrap --no-package-lock
# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ["npm","build"]
CMD ["npm", "start"]