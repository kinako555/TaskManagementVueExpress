// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:            "AIzaSyDytUSh1JdhfOX3BU9acWCMtZXbGd_QtXM",
  authDomain:        "vuefirebasefb.firebaseapp.com",
  projectId:         "vuefirebasefb",
  storageBucket:     "vuefirebasefb.appspot.com",
  messagingSenderId: "127784906731",
  appId:             "1:127784906731:web:04999b905e28fff498f3ae",
  measurementId:     "G-55TJKQ9QP9"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
/***
 * Firebase初期化
 * アプリ起動時にこの関数を実行する必要がある
 */
const initializeFirebase =()=> {
  initializeApp(firebaseConfig);
}

export {initializeFirebase}