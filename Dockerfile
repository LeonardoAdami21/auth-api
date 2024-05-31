# Use a base image with Node.js
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install or yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the Nest.js application will run on
EXPOSE ${APP_PORT}

# Set environment variables for the PostgreSQL connection
ENV POSTGRES_HOST=${POSTGRES_HOST}
ENV POSTGRES_PORT=${POSTGRES_PORT}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}

# Start the Nest.js application
CMD ["yarn", "start", "start:dev"]