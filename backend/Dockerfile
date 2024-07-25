FROM node:18-alpine

WORKDIR /backend

COPY . .

RUN rm -rf dist; rm -rf node_modules; npm install; npm run build

EXPOSE 80

CMD ["npm", "run", "serve"]
