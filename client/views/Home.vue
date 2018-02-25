<template>
  <div class="page present-list__wrapper">
    <confirmation-dialog
      v-show="showDialog"
      @close="onCloseDialog"
      @on-confirm="onConfirmDelete"
      :title="listToDeletName"
      :id="listToDeleteId"/>
    <navigation/>
    <h2>Listy prezentów</h2>
    <ul>
      <li v-for="list in lists" :key="list.id">
        <list-item
          :id="list.id"
          :title="list.title"
          :userId="userId"
          @list-delete="deleteList"/>
      </li>
    </ul>
    <div class="present-list__footer">
      <router-link class="button is-primary present-list__add-new" :to="{ name: 'list-new'}">Nowa lista</router-link>
    </div>
  </div>
</template>

<script>

import Navigation from 'components/Navigation'
import ListItem from 'components/ListItem'
import firebase from 'firebase'
import ConfirmationDialog from 'components/ConfirmationDialog'
import AuthMixin from '../mixins/auth-mixin'
import {mapGetters} from 'vuex'
export default {
  components: {
    ListItem, ConfirmationDialog, Navigation
  },
  mixins: [AuthMixin],
  data () {
    return {
      lists: [],
      showDialog: false,
      listToDeletName: '',
      listToDeleteId: ''
    }
  },
  computed: {
    ...mapGetters(['user']),
    userId () {
      return this.user ? this.user.uid : null
    },
    name () {
      return this.user ? this.user.displayName : 'none'
    }
  },
  methods: {
    onCloseDialog () {
      this.showDialog = false
    },
    onConfirmDelete (item) {
      this.showDialog = false
      this.$db.ref(`/lists/${this.userId}/${item.id}`).remove()
    },
    deleteList (item) {
      const listToDelete = this.lists.find(i=>i.id===item.id)
      if(listToDelete){
        this.showDialog = true
        this.listToDeletName = listToDelete.title
        this.listToDeleteId = listToDelete.id
      }
    },
    logout () {
      this.$auth.signOut()
    }
  },
  mounted() {
    this.$db.ref(`/lists/${this.userId}`).on('value',s => {
      const data = s.val()
      this.lists = Object.keys(data).map( key => {
        return {...data[key], id: key}
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.present-list{
  &__wrapper{
    & > h2 {
      font-weight: 600;
      font-size: 24px;
      margin-top: 16px;
      margin-bottom: 16px;
    }
  }
  &__footer{
    width: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  &__add-new{
    right: 16px;
  }
}
</style>
