<template>
  <div class="present-item--wrapper">
    <span v-show="!isEditing" class="present-item--title">{{item.title}}</span>
    <div
      class="field present-item--edit-title"
      v-show="isEditing">
      <input
        class="input"
        type="text"
        placeholder="Nazwa prezentu"
        v-model="title">
    </div>
    <button v-show="isEditing" class="present-item--edit button is-success" @click="saveItem">{{ $t("listEdit.save") }}</button>
    <button v-show="!isEditing" class="present-item--edit button is-info" @click="editItem">{{ $t("listEdit.edit") }}</button>
    <button class="present-item--delete button is-danger" @click="deleteItem">{{ $t("listEdit.delete") }}</button>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  methods:{
    deleteItem () {
      this.$emit('delete',{id: this.item.id})
    },
    saveItem () {
      if(!this.isItemValid){
        return;
      }
      this.isEditing = false
      this.$emit('save',{
        id: this.item.id,
        title: this.title,
        description: '',
        reservedUserId: this.reservedUserId
        })
    },
    editItem () {
      this.isEditing = true
    }
  },
  data () {
    return {
      isEditing: false,
      title: this.item.title,
      reservedUserId: this.item.reservedUserId
    }
  },
  computed: {
    titleType () {
      return this.isItemValid ? 'is-success' : 'is-danger'
    },
    isItemValid () {
      return this.title && this.title.length > 3
    }
  },
  mounted () {
    if(!this.item.title){
      this.isEditing = true
    }
  }
}
</script>
<style lang="scss">
.present-item{
  &--wrapper{
    display: flex;
    flex-direction: row;
    padding-top: 8px;
    padding-bottom: 8px;
    & > *{
      margin-left: 8px;
      margin-right: 8px;
    }
  }
  &--edit-title{
    flex-grow: 1;
  }
  &--title{
    margin: auto 8px;
    flex-grow: 1;
  }
}
</style>
