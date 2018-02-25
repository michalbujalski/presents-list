<template>
  <div id="app">
    <content>
      <router-view></router-view>
    </content>
    <footer>© 2017 Michał Bujalski <a href="/privacy_policy.html">Privacy</a></footer>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Navigation from './Navigation'
export default {
  components: {Navigation},
}
</script>
<style>
footer{
  background: linear-gradient(to bottom, #CCCCCC 0%, #F4F4F4 8%);
  padding: 16px;
  font-size:  12px;
  text-align: center;

}
content{
  flex-grow: 1;
}
#app{
  display: flex;
  flex-direction: column;
  height:100vh;
}
.page {
  padding: 16px;
}
</style>
