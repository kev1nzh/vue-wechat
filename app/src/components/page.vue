<template>
  <div class="page">
    <user></user>
  </div>
</template>

<script>
import user from './user'
export default {
  name: 'Page',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    user
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

html, body, #app, .page {
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left:0;
  padding: 0;
  margin: 0;
}
</style>
