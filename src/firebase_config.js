import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBsXpYLse6tNImqMomkPY7GcUQUHdUzQSs",
    authDomain: "todo-91668.firebaseapp.com",
    projectId: "todo-91668",
    storageBucket: "todo-91668.appspot.com",
    messagingSenderId: "30229899850",
    appId: "1:30229899850:web:2209dd1372ed4d459094b3"
  };

  firebase.initializeApp(firebaseConfig); 

  const db = firebase.firestore();
  export {db};