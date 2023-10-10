# Use a Node.js base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy your application code into the container
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the React app
CMD [ "npm", "start" ]
