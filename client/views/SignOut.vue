<template>
  <div></div>
</template>
<script>
export default {
  mounted () {
    this.$myAuth.onAuthStateChanged(user => {
      if(!user){
        this.$router.replace({name:'sign-in'})
      }
    })
    this.$myAuth.signOut()
  }
}
</script>
