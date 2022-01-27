# base image
FROM node:12

# Create a directory where our app will be placed
RUN mkdir -p /app

# set working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json /app/

# Copy dependency definitions
COPY yarn.lock /app/

# Install dependencies
RUN yarn install

# Get all the code needed to run the app
COPY . /app/

RUN yarn build

# Expose the port the app runs in
EXPOSE 1337

# Serve the app
CMD ["yarn", "start"]
