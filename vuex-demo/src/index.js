/**
 * @file
 * @author shaw
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './pages/main.vue';

Vue.use(VueRouter);

// const routes = [
//   {
//     path: '/',
//     component: Login
//   },
//   {
//     path: '/page/',
//     component: Main
//   },
//   {
//     path: '/page/setting',
//     component: Setting
//   },
//   {
//     path: '/page/detail/:id',
//     component: Detail,
//     props: true,
//     children: [
//       {
//         path: 'video',
//         component: Video
//       },
//       {
//         path: 'text',
//         component: Text
//       }
//     ]
//   }
// ]

// const router = new VueRouter({
//   routes
// });

const vm = new Vue({
    el: '#app',
    // router,
    render: h => h(Main)
});