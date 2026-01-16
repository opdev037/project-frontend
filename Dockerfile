# 多階段構建 - Stage 1: Node.js 構建階段
FROM node:20-alpine AS builder

WORKDIR /app

# 複製 package 文件
COPY package*.json ./

# 安裝依賴（包含 devDependencies，因為構建需要 vite）
RUN npm ci

# 複製源代碼
COPY . .

# 設定生產環境變數並構建
ENV VITE_API_URL=/api
RUN npm run build

# Stage 2: Nginx 服務階段
FROM nginx:alpine

# 複製構建產物到 Nginx 目錄
COPY --from=builder /app/dist /usr/share/nginx/html

# 複製 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 健康檢查
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
