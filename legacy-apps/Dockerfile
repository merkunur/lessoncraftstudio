FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server and public files
COPY server.js ./
COPY public ./public

# Expose port
EXPOSE 3002

# Start the server
CMD ["npm", "start"]