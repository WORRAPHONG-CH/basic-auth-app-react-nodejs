# Select base image (run time)
FROM node:18

# Define root dir on container 
WORKDIR /usr/src/app

# Copy file package.json to container [local | root container]
COPY ./package*.json ./ 

# Run command to install package.json
RUN npm install 

# Copy all file to container [. => all file exclude files in .dockerignore | ./ => /usr/src/app]
COPY . ./ 

# Expose port for allow external can access
EXPOSE 8002

# RUN command intial application (npm run dev) ["nodemon --exec ts-node index.ts"]
CMD ["npm","run","dev"]

