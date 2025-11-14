<<<<<<< HEAD
FROM node:18-alpine
=======
FROM node:24-alpine
>>>>>>> f179b184766000fd9d4f08cc2bfdd97dcd510adf

WORKDIR /app

COPY . .

RUN npm install -g live-server

EXPOSE 5500

CMD ["live-server", "--port=5500", "--host=0.0.0.0", "--entry-file=index.html"]
