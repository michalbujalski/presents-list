import Firebase from 'firebase'
import firebaseui from 'firebaseui'

let i = null
const instance = () => {
  if (!i) {
    i = Firebase.initializeApp(process.env.FIREBASE_CONFIG)
  }
  return i
}
const auth = () => instance().auth()
const authUI = () => {
  return new firebaseui.auth.AuthUI(auth())
}
const db = () => instance().database()
export {
  instance, auth, authUI, db
}
