module.exports = {
    baseUrl: './',
    productionSourceMap: false,
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'element-ui': 'ElementUI',
            'echarts': 'Echarts'
        },
    },
    devServer: {
        proxy: {
            '/ks': {
                target: 'https://suggest.taobao.com',
                changeOrigin: true,
                pathRewrite: {
                    '/ks': ''
                }
            },
            '/ms': {
                target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
                changeOrigin: true
            }
        }
    }
}