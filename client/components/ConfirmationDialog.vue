<template>
  <div class="modal is-active">
    <div @click="close" class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <h2 class="title">Lista {{title}} zostanie usunięta</h2>
        <div class="content">
          Jesteś pewien?</div>
        <div class="actions">
          <button @click="remove" class="button is-danger">Usuń</button>
          <button @click="close" class="button is-primary">Anuluj</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    title:{
      type:String,
      default: ""
    },
    id:{
      type:String,
      default: ""
    }
  },
  methods: {
    close () {
      this.$emit('close',{id: this.id})
    },
    remove () {
      this.$emit('on-confirm',{id: this.id})
    }
  }
}
</script>
<style lang="scss" scoped>
.box{
  width:100%;
  max-width: 300px;
  margin: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  & > .actions{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  & > .title{
    font-style: bold;
    font-size: 20px;
  }
  & > .content{
    margin: 0 0 32px 0;
  }
}
</style>

