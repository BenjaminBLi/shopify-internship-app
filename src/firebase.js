import firebase from 'firebase/app';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyDCCBslu8L4xQUMtpizsVyOzKjwrUb5xEU",
    authDomain: "shopify-backend-demo.firebaseapp.com",
    projectId: "shopify-backend-demo",
    storageBucket: "shopify-backend-demo.appspot.com",
    messagingSenderId: "794133476606",
    appId: "1:794133476606:web:e0243655247b9e8caba1af",
    measurementId: "G-NJFFN0FZ2R"

};
export default firebase.initializeApp(firebaseConfig);
