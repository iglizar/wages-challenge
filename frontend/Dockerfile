# Base image
FROM node:20.2.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Expose the port serve runs on
EXPOSE 3000

# Run serve
CMD npm run build && npm install -g serve && serve -s build
