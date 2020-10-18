import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const fbase = firebase.initializeApp({
  apiKey: 'AIzaSyDs2aYAYUaEPumG5YdShtvi9LUU3RTPKSc',
  authDomain: 'to-do-list-test-153fd.firebaseapp.com',
  databaseURL: 'https://to-do-list-test-153fd.firebaseio.com',
  projectId: 'to-do-list-test-153fd',
  storageBucket: 'to-do-list-test-153fd.appspot.com',
  messagingSenderId: '423011375754',
  appId: '1:423011375754:web:3b1cca83bfe602cc3feb73',
  measurementId: 'G-6BRG6CM9KG',
})

export default fbase
