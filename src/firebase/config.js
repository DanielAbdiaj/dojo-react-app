import firebase from 'firebase/app';

import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAoit5IwAgGRYFfwdXxNeewDBxeqmYrbjQ",
    authDomain: "the-dojo-site-8c8fa.firebaseapp.com",
    projectId: "the-dojo-site-8c8fa",
    storageBucket: "the-dojo-site-8c8fa.appspot.com",
    messagingSenderId: "3280678464",
    appId: "1:3280678464:web:ba7fe121e73a2d84fcf9a5"
  };

  //init firebase

  firebase.initializeApp(firebaseConfig);

  //init services
  const projectFirestore=firebase.firestore();
  const projectAuth=firebase.auth();

  //timestamp
  const timestamp=firebase.firestore.Timestamp;

  export { projectFirestore, projectAuth ,timestamp}