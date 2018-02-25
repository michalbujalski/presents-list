<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <button class="button navbar-burger">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="navbar-menu">
      <router-link to="/" class="navbar-profile navbar-item">
        <img class="navbar-profile-avatar" v-show="isAuth" v-bind:src="avatar">
        <span class="navbar-profile-name">{{displayName}}</span>
      </router-link>
      <router-link to="/" class="navbar-item" v-show="isAuth">Listy</router-link>
      <router-link to="/signin" class="navbar-item" v-show="!isAuth">Zaloguj</router-link>
      <router-link to="/logout" class="navbar-item" v-show="isAuth">Wyloguj</router-link>
    </div>
  </nav>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['user']),
    displayName () {
      return this.user ? this.user.displayName : ''
    },
    avatar () {
      return this.user ? this.user.photoURL : ''
    },
    isAuth () {
      return this.user
    }
  },
  mounted() {
    this.$el.querySelectorAll('.navbar-item')
      .forEach(element => {
        element.onclick = (e =>{
          this.$el.querySelector('.navbar-menu').classList.toggle('is-active')
        })
      })
    this.$el.querySelector('.navbar-burger').onclick = (() => {
      this.$el.querySelector('.navbar-menu').classList.toggle('is-active')
    })
  }
}
</script>
<style lang="scss" scoped>
.navbar-brand {
  padding: 16px;
}
.navbar{
  &-profile{
    display: flex;
    flex-direction: row;
    align-items: center;
    &-avatar{
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    &-name{
      margin-left: 16px;
    }
  }
}
</style>
