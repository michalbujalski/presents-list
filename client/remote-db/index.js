import { db } from '../presents-firebase'
import store from '../store'

const listUrl = ({ userId, listId }) => {
  return `/lists/${userId}/${listId}`
}

const userUrl = ({ userId }) => `/lists/${userId}`

const parseItems = (items) => {
  return Object
    .keys(items)
    .map(key => {
      return { ...items[key], id: key }
    })
    .map(item => item.reservedUserId ? item : { ...item, reservedUserId: '' })
}

const parseList = (data, listId) => {
  return {
    id: listId,
    title: data.title,
    items: data.items ? parseItems(data.items) : []
  }
}

const setReservationId = (data, id, uid) => {
  data.items[id] = {...data.items[id], reservedUserId: uid }
  console.log(data)
  return data
}

const database = db()

export default {
  install (Vue, options) {
    Vue.prototype.$db = database
    Vue.prototype.$reservations = {
      save (args) {
        database.ref(listUrl(args)).set(
          setReservationId({...args.list }, args.itemId, args.reservedUserId)
        )
      }
    }
    Vue.prototype.$listEdit = {
      createNew: async ({ userId }) => {
        const ref = database.ref(userUrl(userId)).push()
        await ref.set({ title: '', items: [] })
        return ref
      },
      deleteItem ({ item, userId, listId }) {
        database.ref(listUrl({ userId, listId })).child('items').child(item.id).remove()
      },
      addItem (args) {
        const ref = database.ref(listUrl(args)).child('items')
        const newRef = ref.push()
        delete args.item.id
        newRef.set(args.item)
      },
      saveItem (args) {
        const ref = database.ref(listUrl(args)).child('items').child(args.item.id)
        delete args.item.id
        ref.set(args.item)
      },
    }
    Vue.prototype.$listDetails = {
      listener (snapshot) {
        const data = snapshot.val()
        if (data) {
          const list = parseList(data, this.listId, this.parseItems)
          store.dispatch('saveListDetails', { list })
        }
      },
      startObservingListDetails (args) {
        database.ref(listUrl(args)).on('value', this.listener
          .bind({ listId: args.listId }))
      },
      stopObservingListDetails ({ listId, userId }) {
        database.ref(listUrl(userId, listId)).off('value')
      }
    }
  }
}
