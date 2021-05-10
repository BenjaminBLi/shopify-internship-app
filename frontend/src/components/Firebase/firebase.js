import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDCCBslu8L4xQUMtpizsVyOzKjwrUb5xEU",
    authDomain: "shopify-backend-demo.firebaseapp.com",
    databaseURL: "https://shopify-backend-demo-default-rtdb.firebaseio.com",
    projectId: "shopify-backend-demo",
    storageBucket: "shopify-backend-demo.appspot.com",
    messagingSenderId: "794133476606",
    appId: "1:794133476606:web:e0243655247b9e8caba1af",
    measurementId: "G-NJFFN0FZ2R"
};
class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.storage = app.storage();
    }

    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    doSigninWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = (email) => this.auth.doPasswordReset(email);

    doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);
}

export default Firebase;

