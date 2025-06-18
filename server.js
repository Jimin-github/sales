const express = require('express');
const path = require('path');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// 启用CORS
app.use(cors());

// 设置静态文件目录
app.use(express.static(path.join(__dirname)));

// 主页路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'xianyu-promotion-generator.html'));
});

// 健康检查路由
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: '咸鱼宣传图片生成器运行正常',
        timestamp: new Date().toISOString()
    });
});

// 获取网络接口信息
function getNetworkInterfaces() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    
    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            // 跳过内部和非IPv4地址
            if (interface.family === 'IPv4' && !interface.internal) {
                addresses.push({
                    name: name,
                    address: interface.address
                });
            }
        }
    }
    
    return addresses;
}

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
    console.log('\n🚀 咸鱼宣传图片生成器服务已启动！');
    console.log('================================================');
    console.log(`📱 本地访问: http://localhost:${PORT}`);
    console.log(`🌐 局域网访问地址:`);
    
    const networkInterfaces = getNetworkInterfaces();
    if (networkInterfaces.length > 0) {
        networkInterfaces.forEach(interface => {
            console.log(`   - http://${interface.address}:${PORT} (${interface.name})`);
        });
    } else {
        console.log('   - 未检测到可用的网络接口');
    }
    
    console.log('================================================');
    console.log('💡 使用说明:');
    console.log('   - 在同一局域网内的任何设备都可以通过上述地址访问');
    console.log('   - 支持手机、平板、电脑等设备访问');
    console.log('   - 按 Ctrl+C 停止服务');
    console.log('================================================\n');
});

// 优雅关闭
process.on('SIGINT', () => {
    console.log('\n👋 正在关闭服务器...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n👋 正在关闭服务器...');
    process.exit(0);
}); 