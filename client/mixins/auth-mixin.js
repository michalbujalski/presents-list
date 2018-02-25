export default{
  created () {
    this.$auth.onAuthStateChanged(user => {
      if (!user) {
        this.$router.replace('/signin')
      }
    })
  }
}
