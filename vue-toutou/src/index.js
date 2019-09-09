/**
 * @file
 * @author shaw
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
// import VueRouter from './vue-fake-router';
import Main from './pages/main.vue';
import Detail from './pages/detail.vue';
import Setting from './pages/setting.vue';
import Login from './pages/login.vue';
import Video from './components/detail-contents/video.vue';
import Text from './components/detail-contents/text.vue';
import {reachBottomNotify, functionalTool} from './utils';

Vue.use(VueRouter);
Vue.use(reachBottomNotify);
Vue.use(functionalTool);

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/page/',
    component: Main
  },
  {
    path: '/page/setting',
    component: Setting
  },
  {
    path: '/page/detail/:id',
    component: Detail,
    props: true,
    children: [
      {
        path: 'video',
        component: Video
      },
      {
        path: 'text',
        component: Text
      }
    ]
  }
]

const router = new VueRouter({
  routes
});

const vm = new Vue({
    el: '#app',
    router,
    render(createElement) {
      return createElement('router-view');
    }
});