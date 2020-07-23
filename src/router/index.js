    
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/'


Vue.use(Router);
 
const Main = () => import("@views/main.vue")

let routes = [
    {
        path: '*',
        redirect: '/pc-demo'
    }, {
        path: '/',
        redirect: '/pc-demo'
    }, {
        path: '/pc-demo',
        name: 'Pc-demo',
        component: Main,
        meta: {
            "title": "pc端脚手架"
        }
    }
]
const router = new Router({
    mode:'history',// or hash
    routes:routes,
})
router.beforeEach((to,from,next)=>{
    store.commit('clearToken')//取消上一个页面未完成的请求
    next()
})
export default router
