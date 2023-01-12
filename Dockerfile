FROM node:16.15.1-alpine

COPY package*.json ./
RUN npm install

RUN env

COPY . .
#RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "serve" ]