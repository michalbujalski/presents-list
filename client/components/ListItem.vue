<template>
  <div class="list-item__wrapper">
    <router-link class="list-item__title" :to="link">{{title}}</router-link>
    <button @click="deleteItem" class="button is-info">Delete</button>
  </div>
</template>
<script>
export default {
  props: {
    id:{
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  methods: {
    deleteItem (){
      this.$emit('list-delete',{id:this.id})
    }
  },
  computed: {
    link () {
      return {
        name: 'list-details',
        params: {
          userId:this.userId,
          listId:this.id
        }
      }
    }
  }
}
</script>
<style lang="scss">
.list-item{
  &__wrapper{
    display: flex;
    flex-direction: row;
    padding: 8px 16px;
  }
  &__title{
    flex-grow: 1;
    text-align: left;
  }
}
</style>
