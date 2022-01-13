# base image
FROM node:16.3

# Create a directory where our app will be placed
RUN mkdir -p /app

# set working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json /app/

# Install dependencies
RUN npm install

# Get all the code needed to run the app
COPY . /app/

# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ["npm", "start"]