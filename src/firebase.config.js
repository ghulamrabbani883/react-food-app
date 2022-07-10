import {getApp, getApps,initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCZ3Sts87gnG-cqrMNGJ_OoR3CQ37SGVKQ",
    authDomain: "foodreact-6f75b.firebaseapp.com",
    databaseURL: "https://foodreact-6f75b-default-rtdb.firebaseio.com",
    projectId: "foodreact-6f75b",
    storageBucket: "foodreact-6f75b.appspot.com",
    messagingSenderId: "306144781065",
    appId: "1:306144781065:web:8f8884da32c996294d69d8",
    measurementId: "G-CBD1J491DG"
  };

  const  app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export {app, firestore, storage}