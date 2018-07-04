import firebase from "firebase";

var config = {
  apiKey: "AIzaSyDMLIlOAS9pB8A6U-yH0S00oR6G9kgVZXY",
  authDomain: "devmtn-personal-project-df2d2.firebaseapp.com",
  databaseURL: "https://devmtn-personal-project-df2d2.firebaseio.com",
  projectId: "devmtn-personal-project-df2d2",
  storageBucket: "devmtn-personal-project-df2d2.appspot.com",
  messagingSenderId: "714928728636"
};
firebase.initializeApp(config);

export default firebase;
