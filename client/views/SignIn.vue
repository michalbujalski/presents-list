<template>
  <div>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>
<script>
import Firebase from 'firebase'
import firebaseui from 'firebaseui'
export default {
  computed: {
    nextRoute () {
      return this.$route.query.redirect || '/'
    }
  },
  methods: {
    redirect () {
      this.$router.replace(this.nextRoute);
    }
  },
  async mounted () {
    const self = this
    const uiConfig = {
      callbacks: {
        signInSuccess: function(currentUser, credential, redirectUrl) {
            return false;
          }
      },
      signInFlow: 'popup',
      signInOptions: [
        Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        Firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        Firebase.auth.EmailAuthProvider.PROVIDER_ID,
        {
          provider: Firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          defaultCountry: 'PL'
        }
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>'
    }
    
    // Initialize the FirebaseUI Widget using Firebase.
    // The start method will wait until the DOM is loaded.
    this.$authUI.start('#firebaseui-auth-container', uiConfig);
    this.$auth.onAuthStateChanged(user=>{
      if(user)
        this.redirect()
    })
  }
}
</script>
<style lang="scss">
</style>
