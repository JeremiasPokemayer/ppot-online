import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://ppot-online-default-rtdb.firebaseio.com",
});

const firestore = admin.firestore();
const db = admin.database();

export { firestore, db };
