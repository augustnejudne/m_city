import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: 'AIzaSyABVX9udoza1dHYmXpTd0TWULj9LNTfFw4',
  authDomain: 'm-city-fcafb.firebaseapp.com',
  databaseURL: 'https://m-city-fcafb.firebaseio.com',
  projectId: 'm-city-fcafb',
  storageBucket: 'm-city-fcafb.appspot.com',
  messagingSenderId: '482031274682',
});

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');

export {
  firebase,
  firebaseDB,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebasePlayers,
};
