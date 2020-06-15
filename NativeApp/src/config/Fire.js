import firebase from 'firebase';
import 'firebase/storage';

  var firebaseConfig = {
    apiKey: "AIzaSyCESkNhggTgk20LjludQnoDRNZavVYfrUE",
    authDomain: "summerproject-4b477.firebaseapp.com",
    databaseURL: "https://summerproject-4b477.firebaseio.com",
    projectId: "summerproject-4b477",
    storageBucket: "summerproject-4b477.appspot.com",
    messagingSenderId: "771256413490",
    appId: "1:771256413490:web:f85bdf8a36d38992e1fb2b",
    measurementId: "G-SELCG6772X"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  const db = firebase.database();

  export {db, storage, fire as default };