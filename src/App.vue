<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <welcome/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import welcome from './components/welcome'

export default {
  name: 'App',
  components: {
    welcome
  } 
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
