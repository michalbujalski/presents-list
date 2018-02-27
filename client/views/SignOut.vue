<template>
  <div></div>
</template>
<script>
export default {
  mounted () {
    this.$auth.onAuthStateChanged(user => {
      if(!user){
        this.$router.replace({name:'sign-in'})
      }
    })
    this.$auth.signOut()
  }
}
</script>
