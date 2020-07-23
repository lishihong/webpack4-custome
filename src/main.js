import Vue from 'vue'
import App from './app.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import './assets/less/theme.less'
import './directives/directive'
import './filters/filter' 
import requestUtil from './services/request'
import urls from './constants/url'
import {i18n} from './common/i18n'
//图表echarts
import 'echarts'
import VueECharts from 'vue-echarts'
Vue.component('v-chart', VueECharts)


Vue.config.productionTip = false
Vue.prototype.router = router
Vue.prototype.requestUtil = requestUtil
Vue.prototype.urls = urls

Vue.use(ElementUI)

new Vue({
    i18n,
    router,
    store,
    render: h => h(App),
}).$mount('#app')
