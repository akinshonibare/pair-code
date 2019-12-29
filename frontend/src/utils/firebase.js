// imports
import firebase from "firebase/app";
import "firebase/auth";
import config from "../config";

// firebase config initialization

const FIREBASE_CONFIG = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId
};
firebase.initializeApp(FIREBASE_CONFIG);

//exports
export const firebaseAuth = firebase.auth();
export const GITHUB_AUTH_PROVIDER = new firebase.auth.GithubAuthProvider();
