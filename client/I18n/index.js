import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)

const messages = {
  en: {
    home: {
      title: 'Presents list',
      newList: 'New list'
    },
    listsItem: {
      delete: 'Delete'
    },
    nav: {
      lists: 'Lists',
      login: 'Login',
      logout: 'Logout'
    },
    listEdit: {
      listName: 'List name',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      save: 'Save'
    },
    listDetails: {
      editList: 'Edit list',
      reserve: 'Reserve',
      cancel: 'Cancel'
    }
  },
  pl: {
    home: {
      title: 'Lista prezentów',
      newList: 'Nowa lista'
    },
    listsItem: {
      delete: 'Usuń'
    },
    nav: {
      lists: 'Listy',
      login: 'Zaloguj',
      logout: 'Wylogu'
    },
    listEdit: {
      listName: 'Nazwa listy',
      edit: 'Edytuj',
      delete: 'Usuń',
      add: 'Dodaj',
      save: 'Zapisz'
    },
    listDetails: {
      editList: 'Edytuj listę',
      reserve: 'Zarezerwuj',
      cancel: 'Anuluj'
    }
  }
}

export default new VueI18n({
  locale: navigator.language === 'pl' ? 'pl' : 'en',
  messages
})
