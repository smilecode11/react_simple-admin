const path = require('path');
const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [{
        plugin: CracoLessPlugin,
        options: {
            lessLoaderOptions: {
                lessOptions: {
                    modifyVars: {
                        '@primary-color': '#1DA57A'
                    },
                    javascriptEnabled: true,
                },
            },
        },
    }, ],
    //配置代理解决跨域
    devServer: {
        proxy: {
            '/api': {
                //  遇见 /api1 前缀的请求，会触发该代理配置
                target: 'http://localhost:5000',
                //  控制服务器收到的响应头中Host字段的值
                changeOrigin: true,
                //  重写请求路径 /api1 前缀及之前的路径重写为 ''
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    webpack: {
        // 别名
        alias: {
            "@": path.resolve("src"),
            "@utils": path.resolve("src/utils"),
        }
    }
};