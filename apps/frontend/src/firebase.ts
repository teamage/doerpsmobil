import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD5_ojna9joWcoLIGu8T_ZGio1XvRi9kcM',
  authDomain: 'doerpsmobil-65d16.firebaseapp.com',
  projectId: 'doerpsmobil-65d16',
  storageBucket: 'doerpsmobil-65d16.appspot.com',
  messagingSenderId: '8023518644',
  appId: '1:8023518644:web:fd1c617e6d3ab8cf9796e1',
};

console.log('run firebase.ts');

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

if (import.meta.env.MODE === 'development')
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
export { auth };
