import * as firebase from 'firebase';
import * as dotenv from "dotenv";

dotenv.config();

let config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: "",
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,

};


firebase.initializeApp(config);

export default firebase