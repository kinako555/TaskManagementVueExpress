// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:            process.env.VUE_APP_API_KEY,
  authDomain:        process.env.VUE_APP_AUTH_DOMAIN,
  projectId:         process.env.VUE_APP_PROJECT_ID,
  storageBucket:     process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SEND_ID,
  appId:             process.env.VUE_APP_APP_ID,
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