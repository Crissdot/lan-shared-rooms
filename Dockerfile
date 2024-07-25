FROM node:18-alpine

WORKDIR /frontend

COPY . .

RUN rm -rf node_modules; npm install; npm run build

EXPOSE 80

CMD ["npm", "run", "serve"]
