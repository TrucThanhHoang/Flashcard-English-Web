# Sử dụng NodeJS base image
FROM node:18-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy toàn bộ mã nguồn vào container
COPY . .

# Cài đặt live-server
RUN npm install -g live-server

# Expose cổng mặc định của live-server
EXPOSE 5500

# Lệnh chạy khi container khởi động
CMD ["live-server", "--port=5500", "--host=0.0.0.0", "--entry-file=index.html"]
