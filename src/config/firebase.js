import firebase from "firebase";
import "firebase/messaging";

// const firebaseConfig = {
//     apiKey: "AIzaSyANrj-XVI_mlUXspQjYNisEqj-80K2f5OA",
//     authDomain: "finalyearproject-6f6a1.firebaseapp.com",
//     databaseURL: "https://finalyearproject-6f6a1-default-rtdb.firebaseio.com",
//     projectId: "finalyearproject-6f6a1",
//     storageBucket: "finalyearproject-6f6a1.appspot.com",
//     messagingSenderId: "702133252150",
//     appId: "1:702133252150:web:e69595679ca5ab1460a897"
//   };


const firebaseConfig = {
    apiKey: "AIzaSyCq6ZU_xRYU8WVKSDzpp_W1j-Ib1k6Yvi0",
    authDomain: "ecommerce-site-fyp.firebaseapp.com",
    databaseURL: "https://ecommerce-site-fyp-default-rtdb.firebaseio.com",
    projectId: "ecommerce-site-fyp",
    storageBucket: "ecommerce-site-fyp.appspot.com",
    messagingSenderId: "238778429576",
    appId: "1:238778429576:web:fc58d9cab2f07f5bddaf3d",
    measurementId: "G-JGXDFHFXGF"
  };
  

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebaseApp.firestore();
  const storage = firebase.storage();
  const messaging = firebase.messaging();
  export {
      auth,
      db,
      storage,
      messaging
  }