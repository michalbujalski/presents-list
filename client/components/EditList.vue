<template>
  <div>
    <ul>
      <li v-for="item in exitingItems" :key="item.id">
        <edit-item
          :item="item"
          @save="saveItem"
          @delete="deleteItem"/>
      </li>
    </ul>
    <button class="button is-primary" @click="addNew">Dodaj</button>
  </div>
</template>
<script>
import EditItem from './EditItem'
export default {
  components: {EditItem},
  props:{
    exitingItems: {
      type: Array,
      required: true
    }
  },
  methods: {
    saveItem (e) {
      this.$emit('item-saved',e)
    },
    addNew () {
      this.$emit('item-added',
        {
          id: this.items.length+1,
          title: '',
          deescription: 'null',
          reservedUserId: ''
        }
      )
    },
    deleteItem (e) {
      this.$emit('item-deleted',e)
    }
  },
  data () {
    return {
      items: []
    }
  }
}
</script>
<style lang="scss">

</style>
