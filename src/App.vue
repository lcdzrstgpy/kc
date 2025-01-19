<template>
  <div id="app">
    <LoginView/>
  </div>
</template>

<script>
import LoginView from './components/LoginView.vue'; // 引入登录组件

export default {
  name: 'App',
  components: {
    LoginView
  }
}
</script>

<style>
/* 可以在这里添加一些全局样式 */
</style>