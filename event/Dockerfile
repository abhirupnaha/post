FROM node:alpine

WORKDIR /home/app

COPY package.json ./

run npm install

COPY ./ ./

EXPOSE 3005

CMD ["npm", "run", "start"]