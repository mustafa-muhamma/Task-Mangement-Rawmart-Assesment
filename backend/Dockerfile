# Use official Node.js image (Lightweight Alpine version)
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (CACHE OPTIMIZATION)
# This prevents re-installing dependencies if only code changes
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the API port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
