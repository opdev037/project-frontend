#!/bin/sh

echo "🚀 啟動 Vue 前端開發伺服器..."
echo "================================"

cd /workspaces/frontend

echo "📦 安裝依賴（如果需要）..."
npm install

echo "🔥 啟動 Vite..."
npm run dev -- --host 0.0.0.0

echo "✅ 開發伺服器應該在 http://localhost:5173 運行"
