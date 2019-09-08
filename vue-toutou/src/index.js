/**
 * @file
 * @author shaw
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './pages/main.vue';
import {reachBottomNotify, functionalTool} from './utils';

Vue.use(VueRouter);
Vue.use(reachBottomNotify);
Vue.use(functionalTool);

const vm = new Vue({
    el: '#app',
    render: h => h(Main)
});