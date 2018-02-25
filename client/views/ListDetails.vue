<template>
  <section class="page">
    <navigation/>
    <h1>{{this.title}}</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
          <details-item
            :id = "item.id"
            :title = "item.title"
            :reservedUserId = "item.reservedUserId"
            @reserve = "onReserve"
            @cancel-reservation = "onReservationCancel">
          </details-item>
      </li>
    </ul>
    <div class="list-details__controls">
      <router-link 
        v-show="isUserOwner"
        class="button is-primary present-list__edit"
        :to="editLink">
          Edytuj listę
      </router-link>
    </div>
  </section>
</template>
<script>
import Navigation from 'components/Navigation'
import DetailsItem from '../components/DetailsItem'
import {mapGetters, mapActions} from 'vuex'
export default {
  components:{DetailsItem, Navigation},
  computed: {
    ...mapGetters(['user', 'listDetails']),
    list () {
      return this.listDetails(this.listId)
    },
    isUserOwner () {
      const isUserOwner = this.currentUser
        && this.currentUser.uid === this.userId
      return isUserOwner
    },
    currentUser () {
      return this.user
    },
    url () {
      return `/lists/${this.userId}/${this.listId}`
    },
    editLink () {
      return {
          params: {
            userId: this.userId,
            listId: this.listId
          },
          name: 'list-edit'
        }
    },
    title () {
      return this.list.title
    },
    items () {
      return this.list.items
    }
  },
  data () {
    return {
      listId: this.$route.params.listId,
      userId: this.$route.params.userId
    }
  },
  methods: {
    onReservationCancel (e) {
      this.saveReservation(e.id, '')
    },
    setReservationId (data, id, uid) {
        data.items[id] = {...data.items[id],reservedUserId: uid}
        return data
    },
    saveReservation (id, reservedUserId) {
      if(!this.user){
        this.$router.replace({
          path: '/signin',
          query: { redirect: this.$route.path }
        })
      }else{
          this.$reservations.save({ list: this.list, listId: this.listId, userId: this.userId, itemId: id, reservedUserId })
      }
    },
    onReserve (e) {
      if(this.user!==null){
        this.saveReservation(e.id, this.user.uid)
      }else{
        this.$router.replace({
          name: 'sign-in',
          query: { redirect: this.$route.path }
        })
      }
    }
  },
  mounted () {
    this.$listDetails.startObservingListDetails({listId: this.listId, userId:this.userId })
  },
  beforeDestroy () {
    this.$listDetails.stopObservingListDetails({listId: this.listId, userId:this.userId })
  }
}
</script>
<style lang="scss" scoped>
.list-details__controls{
  display:inherit;
}
button{
  display: none;
}
.is-user-owner{
  display: inline;
}
</style>
