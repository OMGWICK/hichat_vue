<template>
  <div id="app">
    <router-view v-if="isRouterAlive" :key="this.$route.fullPath" />
  </div>
</template>
<script>
export default {
  provide() {
    return {
      routerReload: this.reload
    };
  },
  data(){
    return{
      isRouterAlive: true,
    }
  },
  methods:{
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
  }
};
</script>
<style lang="less">
body {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: #8e9091;
}
</style>
