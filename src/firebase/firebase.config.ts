import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAcCaHCw9SVbW3-bKN-sp40FfkQMIp7qKU',
  authDomain: 'react-cursos-5b53a.firebaseapp.com',
  projectId: 'react-cursos-5b53a',
  storageBucket: 'react-cursos-5b53a.appspot.com',
  messagingSenderId: '618166213291',
  appId: '1:618166213291:web:918486baedc4cf2dd4f5ee',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(app);

export const FirebaseDB = getFirestore(app);
