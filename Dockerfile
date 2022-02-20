# Tell docker to clone from image
FROM node:16

# Set root folder for image
WORKDIR /app

COPY package.json .

# Install dependencies
RUN npm install

# Copy src to image root folder
COPY . .

# open port for accessing
EXPOSE 3000

# After build IMAGE -> need to start server in CONTAINER
CMD [ "node", "app.js" ]