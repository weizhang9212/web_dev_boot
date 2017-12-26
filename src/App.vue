<template>
  <div id="app">
    <head-bar></head-bar>
    <router-view/>
  </div>
</template>

<script>
import Head from './components/headBar'
export default {
  name: 'app',
  components: {
    headBar : Head
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
