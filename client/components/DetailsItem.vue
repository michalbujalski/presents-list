<template>
  <div class="details-item--wrapper">
    <span class="details-item--title">{{title}}</span>
    <button :disabled="isAvailable" class="details-item--reserve button is-info" @click="reserve">
      Zarezerwuj
    </button>
    <button v-show="canCancel" class="details-item--reserve button is-danger" @click="cancelReservation">
      Anuluj
    </button>
  </div>  
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  props:{
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    reservedUserId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['user']),
    isAvailable () {
      return this.reservedUserId.length > 0
    },
    canCancel () {
      return this.user && this.reservedUserId === this.user.uid
    }
  },
  methods: {
    cancelReservation () {
      this.$emit('cancel-reservation',{id: this.id})
    },
    reserve () {
      this.$emit('reserve',{id: this.id})
    }
  }
}
</script>
<style lang="scss">
.details-item{
  &--wrapper{
    display: flex;
    flex-direction: row;
    padding: 8px 0;
    & > *{
      margin-left: 8px;
      margin-right: 8px;
    }
  }
  &--title{
    flex-grow:1;
  }
}
</style>
