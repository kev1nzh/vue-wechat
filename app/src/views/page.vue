<template>
  <div class="page">
    <user @getList ="getListThen" />
    <list :item = "listItem"  @getTalk="getTalkThen"/>
    <talk :item = "talkItem" :user="listItem" />
  </div>
</template>

<script>
import user from '../components/user'
import list from '../components/list'
import talk from '../components/talk'
export default {
  name: 'page',
  data () {
    return {
      listItem: {},
      talkItem: {},
    }
  },
  methods: {
    getListThen(item) {
      this.listItem = item
      console.log(item)
    },
    getTalkThen(item) {
      this.talkItem = item
      console.log(item)
    }
  },
  components: {
    user,
    list,
    talk
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
