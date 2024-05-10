# Use an official Node runtime as a parent image
FROM node:20.2.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build your TypeScript files
RUN npm run build

# Bundle app source
COPY . .

# Bind your application to port 3000
EXPOSE 3001

# Define command to run the app
CMD npm run build && npx prisma generate && node dist/app.js