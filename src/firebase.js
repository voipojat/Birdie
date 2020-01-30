import firebase from 'firebase'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBROLG5XDhVfxC3ASLkI5brJw72hEFqWTQ",
    authDomain: "birdie-9d564.firebaseapp.com",
    databaseURL: "https://birdie-9d564.firebaseio.com",
    projectId: "birdie-9d564",
    storageBucket: "birdie-9d564.appspot.com",
    messagingSenderId: "103103632120",
    appId: "1:103103632120:web:b8c85d957f4756baeea10d",
    measurementId: "G-WK0PG3SF7J"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}