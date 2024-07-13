# Use the official Node.js image.
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/index

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install --production

# Copy local code to the container image.
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the web service on container startup.
CMD [ "node", "src/index.js" ]
