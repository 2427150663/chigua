// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import qs from 'qs'
import axios from 'axios'
import VueCookies from 'vue-cookies'
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
import {
    routes
} from './routes'
axios.defaults.withCredentials = true//让ajax携带cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.prototype.$axios = axios
Vue.use(VueCookies)
Vue.use(VueRouter)
// Vue.prototype.$echarts = echarts
const router = new VueRouter({
    routes,
    mode: "hash",
    linkActiveClass: "bg"
})
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

Vue.prototype.openLoading = function () {
    const loading = this.$loading({           // 声明一个loading对象
        lock: true,                             // 是否锁屏
        text: '加载中',                     // 加载动画的文字
        spinner: 'el-icon-loading',             // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.3)',       // 背景颜色
        target: '.sub-main',                    // 需要遮罩的区域
        body: true,
        customClass: 'mask'                     // 遮罩层新增类名
    })
    // setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    //   loading.close();                        // 关闭遮罩层
    // }, 10000)
    return loading;
}