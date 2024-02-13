FROM node:18.17-alpine

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "local" ]