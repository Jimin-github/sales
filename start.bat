@echo off
chcp 65001 >nul
echo.
echo ==========================================
echo    咸鱼宣传图片生成器 - 一键启动脚本
echo ==========================================
echo.

echo 🔍 检查Node.js环境...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 未检测到Node.js，请先安装Node.js
    echo 📥 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js环境正常
echo.

echo 📦 检查依赖包...
if not exist "node_modules" (
    echo 🔄 正在安装依赖包...
    npm install
    if errorlevel 1 (
        echo ❌ 依赖包安装失败
        pause
        exit /b 1
    )
    echo ✅ 依赖包安装完成
) else (
    echo ✅ 依赖包已存在
)

echo.
echo 🚀 启动服务中...
echo.
npm start

pause 