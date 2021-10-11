import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import 'firebase/firestore';

let db;
try {
    const config = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.FIREBASE_DATABASE_URL,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID
        };
        db = getFirestore(initializeApp(config));

    } catch (error) {
        console.log(error);
    }

module.exports = {
    db
};