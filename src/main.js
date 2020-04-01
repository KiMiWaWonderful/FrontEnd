import Vue from 'vue'
import App from './App.vue'
import BaiduMap from 'vue-baidu-map'
import {BmlLushu} from 'vue-baidu-map'
import router from './router'
import store from "./store";
import './plugins/element.js'
import axios from 'axios'

import {postRequest} from "./js/api";
import {postKeyValueRequest} from "./js/api";
import {putRequest} from "./js/api";
import {deleteRequest} from "./js/api";
import {getRequest} from "./js/api";

Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;

Vue.use(BaiduMap, {
  ak: 'qVixkQ96uQ7eQ2WpRYzGeaV4LfOqByaw'
})
// Vue.component('bml-lushu',BmlLushu)
Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3001/api'
})

Vue.prototype.$msg = function msg(type, message, onClose) {
  this.$message({
    type,
    message,
    duration: 1000,
    onClose
  })
}
Vue.prototype.$success = function (message="操作成功！", onClose) {
  this.$msg("success", message, onClose)
}

Vue.prototype.$failed = function (message="操作失败！", onClose) {
  this.$msg("error", message, onClose)
}

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
