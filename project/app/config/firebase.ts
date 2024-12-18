import { firebase } from '@nativescript/firebase-core';

export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyAzNFMx0l3x-1qSB7zYEHJwasBnkPOfpg0",
    authDomain: "ms-mv-71de8.firebaseapp.com",
    projectId: "ms-mv-71de8",
    storageBucket: "ms-mv-71de8.appspot.com",
    messagingSenderId: "11803494011",
    appId: "1:11803494011:web:313992c0215928cb3b44de",
    measurementId: "G-XKKEK82ZPD"
  });
};