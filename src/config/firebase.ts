import admin from 'firebase-admin';
import path from 'path';

const servicePath = path.join(__dirname, '../../firebaseServiceKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(servicePath),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
