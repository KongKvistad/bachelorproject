import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MSG_ID,
  appId: process.env.VUE_APP_APP_ID
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}
