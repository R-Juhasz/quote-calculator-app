// config.ts or wherever your ApplicationConfig is defined

import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: import.meta.env['NG_APP_FIREBASE_API_KEY'],
  authDomain: import.meta.env['NG_APP_FIREBASE_AUTH_DOMAIN'],
  projectId: import.meta.env['NG_APP_FIREBASE_PROJECT_ID'],
  storageBucket: import.meta.env['NG_APP_FIREBASE_STORAGE_BUCKET'],
  messagingSenderId: import.meta.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'],
  appId: import.meta.env['NG_APP_FIREBASE_APP_ID']
};

export const config: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    {
      provide: getFirestore,
      useFactory: () => getFirestore()
    }
  ]
};
