# Japanese Learning - Frontend

Vue 3 前端應用，提供日語學習的用戶界面。

## 技術棧

- **框架**: Vue 3 (Composition API)
- **構建工具**: Vite
- **路由**: Vue Router 4
- **狀態管理**: Pinia
- **HTTP 客戶端**: Axios
- **UI**: 自定義 CSS (漸變設計)

## 功能

- ✅ 用戶註冊 / 登入界面
- ✅ Google OAuth 2.0 登入
- ✅ 響應式設計
- ✅ 用戶儀表板
- 🚧 詞彙學習界面 (計劃中)
- 🚧 學習進度可視化 (計劃中)

## 本地開發

### 安裝依賴

```bash
npm install
```

### 開發服務器

```bash
npm run dev
```

訪問: http://localhost:5173

### 環境變量

創建 `.env` 文件：

```env
# API 基礎 URL (開發環境通過 Vite proxy)
VITE_API_URL=/api

# Google OAuth Client ID
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### 構建生產版本

```bash
npm run build
```

構建產物在 `dist/` 目錄。

## 項目結構

```
frontend/
├── src/
│   ├── api/
│   │   └── auth.js          # API 調用封裝
│   ├── components/          # 可重用組件
│   ├── router/
│   │   └── index.js         # 路由配置
│   ├── stores/
│   │   └── auth.js          # Pinia 認證 store
│   ├── views/
│   │   ├── Dashboard.vue    # 儀表板
│   │   ├── Home.vue         # 首頁
│   │   ├── Login.vue        # 登入頁
│   │   └── Register.vue     # 註冊頁
│   ├── App.vue
│   └── main.js
├── public/
├── nginx.conf               # 生產環境 Nginx 配置
├── Dockerfile
├── .dockerignore
├── vite.config.js
└── package.json
```

## 路由

- `/` - 首頁
- `/login` - 登入頁面
- `/register` - 註冊頁面
- `/dashboard` - 用戶儀表板 (需要認證)

## API 集成

Frontend 通過 Vite proxy 與 Backend API 通信：

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost',  // 或 http://host.docker.internal
        changeOrigin: true,
      }
    }
  }
})
```

生產環境使用 Nginx 反向代理：

```nginx
location /api {
  proxy_pass http://backend-service;
}
```

## 生產部署

### Docker 映像

映像名稱: `docker.io/<username>/project-frontend`

標籤:
- `latest` - 最新穩定版本
- `main-<commit-sha>` - 特定提交版本
- `v1.0.0` - 語義化版本

### 構建映像

```bash
docker build -t project-frontend:local .
```

### 運行容器

```bash
docker run -d -p 80:80 project-frontend:local
```

## CI/CD

GitHub Actions 自動化流程：

- ✅ 代碼推送到 `main` 分支自動構建
- ✅ 自動推送到 Docker Hub
- ✅ 自動標籤管理
- ✅ 構建緩存優化

### 必要的 GitHub Secrets

- `DOCKER_USERNAME` - Docker Hub 用戶名
- `DOCKER_PASSWORD` - Docker Hub 訪問令牌

## 開發指南

### 添加新頁面

1. 在 `src/views/` 創建新組件
2. 在 `src/router/index.js` 添加路由
3. 根據需要在導航中添加鏈接

### 調用 API

```javascript
import { authAPI } from '@/api/auth'

// 使用 API
const login = async (credentials) => {
  try {
    const response = await authAPI.login(credentials)
    // 處理響應
  } catch (error) {
    // 處理錯誤
  }
}
```

### 狀態管理

```javascript
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// 使用 store
authStore.login(token, user)
authStore.logout()
```

## 相關倉庫

- [Backend API (Laravel)](https://github.com/<username>/project-api)
- [Infrastructure (Helm Charts)](https://github.com/<username>/project-infra)

## 開發計劃

### Phase 1: 基礎功能 ✅
- [x] 認證界面 (登入/註冊)
- [x] Google OAuth 登入
- [x] 用戶儀表板
- [x] Docker 容器化
- [x] CI/CD 流程

### Phase 2: 核心功能 🚧
- [ ] 詞彙列表界面
- [ ] 學習模式界面
- [ ] 測驗界面
- [ ] 進度追蹤可視化

### Phase 3: 進階功能 📋
- [ ] 離線支援 (PWA)
- [ ] 多語言界面
- [ ] 深色模式
- [ ] 數據導出功能

## License

MIT
