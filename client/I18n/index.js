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
      save: 'Save',
      itemTitle: 'present title'
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
      save: 'Zapisz',
      itemTitle: 'nazwa prezentu'
    },
    listDetails: {
      editList: 'Edytuj listę',
      reserve: 'Zarezerwuj',
      cancel: 'Anuluj'
    }
  }
}

const language = () => navigator.language === 'pl' ? PL : EN
const PL = 'pl'
const EN = 'en'
const i18n = new VueI18n({
  locale: language(),
  messages
})

export { i18n, language, PL, EN }
