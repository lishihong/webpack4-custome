import axios from 'axios'
import urls from '../constants/url'
axios.defaults.timeout = 60 * 1000 * 5 //响应超时时间         
import {Loading} from 'element-ui' 
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'; //配置请求头
const isDev = process.env.NODE_ENV === 'development'
import store from '../store/'
if(isDev) {
    axios.defaults.baseURL = urls.testBaseUrl.url  //配置接口地址
} else {
    axios.defaults.baseURL = urls.baseUrl.url   //配置接口地址
} 
// 存储请求的数组
const subscribesArr = []
// 请求push到数组中
function subscribesArrRefresh(cb) {
    subscribesArr.push(cb)
}
// 用新token发起请求
function reloadSubscribesArr(newToken) {
    subscribesArr.forEach(cb => cb(newToken))
}
  
//请求拦截器
axios.interceptors.request.use(
    config => {
        config.cancelToken = new axios.CancelToken(function(cancel) {
            store.commit('pushToken', {
                cancelToken: cancel,
            });
        });
        const token = "Bearer " + localStorage.getItem('token')
        config.headers.Authorization = token
        if (token && config.url !== '/api/auth/refreshToken') {
            // token失效，刷新token
            freshToken().then((res) => {
                reloadSubscribesArr(res.data.token)
            })
            const retry = new Promise((resolve,) => {
                subscribesArrRefresh((newToken) => {
                    config.headers.Authorization = 'Bearer ' + newToken
                    resolve(config)
                })
            })
            return retry
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
);
 
 
//添加响应拦截器
axios.interceptors.response.use((res) =>{
    return Promise.resolve(res)
}, (error) => {
    
    return Promise.reject(error)
})
function dealRequest(url,params,funName,isLoading = true) {
    return new Promise((resolve, reject) => {
        let loading
        if(isLoading) {
            loading = Loading.service({
                lock: true,
                text: '努力加载中，请稍等...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
        }
        axios[funName](url, params)
            .then(response => {
                if(isLoading) {
                    loading.close()
                }
                resolve(response.data)
            },(err)=>{
                reject(err)
            })
            .catch((err) => {
                console.log(err)
                if(isLoading) {
                    loading.close()
                }
            })
    })
}

//返回一个Promise(发送post请求)
function post(url, params,isLoading = true) {
    return dealRequest(url,params,"post",isLoading);
}
//返回一个Promise(发送get请求)
function get(url,params,isLoading = true) {
    return dealRequest(url, {params},"get",isLoading);
}
//返回一个Promise(发送put请求)
function put(url, params, isLoading = true) {
    return dealRequest(url, params, "put", isLoading);
}
//返回一个Promise(发送delete请求)
function Delete(url, params, isLoading = true) {
    return dealRequest(url, {params}, "delete", isLoading);
}
function freshToken() {
    return get('/refresh/token',{})
}
export default {
    post,
    get,
    put,
    delete: Delete
}