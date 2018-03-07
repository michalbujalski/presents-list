<template>
  <section class="page new-list--wrapper">
    <navigation/>
    <div class="field">
      <label class="label">{{ $t("listEdit.listName") }}</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input" v-model="name">
      </div>
    </div>
    <edit-list
      :exitingItems="existingItems"
      @item-added="addItem"
      @item-deleted="deleteItem"
      @item-saved="saveItem"/>
    <button
      class="button is-success new-list--submit"
      @click="endEditing">{{ $t("listEdit.save") }}</button>
  </section>
</template>
<script>
import EditList from '../components/EditList'
import Navigation from 'components/Navigation'
import AuthMixin from '../mixins/auth-mixin'
import {mapGetters} from 'vuex'
export default {
  components: {EditList, Navigation},
  mixins: [AuthMixin],
  watch:{
    async name(newName){
      const ref = this.$db.ref(this.url)
      await ref.update({title: newName})
    }
  },
  computed: {
    ...mapGetters(['user']),
    userId () {
      return this.user.uid
    },
    listId () {
      return this.$route.params.listId
    },
    url () {
      return `/lists/${this.userId}/${this.listId}`
    },
    isEditing () {
      return this.listId !== undefined
    }
  },
  data () {
    return {
      name: '',
      newItems: [],
      existingItems: []
    }
  },
  methods: {
    deleteItem (item) {
      this.$listEdit.deleteItem({item, listId: this.listId, userId: this.userId})
    },
    addItem (item) {
      this.$listEdit.addItem({item, listId: this.listId, userId: this.userId})
    },
    saveItem (item) {
      this.$listEdit.saveItem({item, listId: this.listId, userId: this.userId})
    },
    initObserving () {
      const onChange = s => {
        const data = s.val()
        if(!data) return;
        this.name = data.title
        if(data.items){
          this.existingItems = Object.keys(data.items)
            .map(key=>{
              return {...data.items[key],id:key}
            })
        }else{
          this.existingItems = []
        }
      }
      this.$db.ref(this.url).on('value', onChange)
    },
    endEditing (){
      this.$router.replace(
        {
          name: 'list-details',
          params: {
            listId:this.listId,
            userId:this.userId
          }
        }
      )

    }
  },
  async mounted () {
    if( this.isEditing ){
      this.initObserving()
    }else{
      const ref = await this.$listEdit.createNew({ userId: this.userId })
      this.$router.replace({
        params: {
          userId: this.userId,
          listId: ref.key
        },
        name: 'list-edit'
      })
      this.initObserving()
    }
  }
}
</script>
<style lang="scss">
.new-list--submit{
  width: 100%;
  margin-top: 64px;
}
</style>
