
FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install -g live-server

EXPOSE 5500

CMD ["live-server", "--port=5500", "--host=0.0.0.0", "--entry-file=index.html"]
