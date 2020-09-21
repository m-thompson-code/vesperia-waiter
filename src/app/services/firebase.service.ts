import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';

import 'firebase/analytics';
// import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/firestore';
// import 'firebase/storage';
// import 'firebase/messaging';
// import 'firebase/functions';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {

    constructor() {
        // Initialize Firebase web SDK
        firebase.initializeApp({
            apiKey: "AIzaSyAi5ctCjIikm5rpF3TML1y2Gx08YkGhzg8",
            authDomain: "vesperia-waiter.firebaseapp.com",
            databaseURL: "https://vesperia-waiter.firebaseio.com",
            projectId: "vesperia-waiter",
            storageBucket: "vesperia-waiter.appspot.com",
            messagingSenderId: "66476693140",
            appId: "1:66476693140:web:b5c758d16c79b0d26f8681",
            measurementId: "G-E0DSJYZXLC"
        });

        firebase.analytics();
    }
}
