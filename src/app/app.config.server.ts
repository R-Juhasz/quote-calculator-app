import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // ✅ Corrected 'appRoutes' to 'routes'

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore, Firestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth'; // ✅ Added Auth import

import { InjectionToken } from '@angular/core';

// Provide Firestore2 alias
export const Firestore2 = new InjectionToken<Firestore>('Firestore2');

export const config: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
     apiKey: "AIzaSyCFd70JFJGTimymIIxWJkT9hIPmVZDhRMw",
    authDomain: "quote-calculator-app.firebaseapp.com",
    projectId: "quote-calculator-app",
    storageBucket: "quote-calculator-app.firebasestorage.app",
    messagingSenderId: "712601520926",
    appId: "1:712601520926:web:1961c01afe2d469a27d70f"
    })),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()), // ✅ Provide Auth
    {
      provide: Firestore2,
      useFactory: () => getFirestore()
    }
  ]
};
