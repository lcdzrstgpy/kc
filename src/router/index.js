import Vue from 'vue';
import Router from 'vue-router';
import LoginView from '@/components/LoginView.vue'; // 引入登录组件

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginView',
      component: LoginView
    },
  ]
});