import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get, set } from "firebase/database";

let API_BASE_URL: string;

// @ts-ignore
if (process.env.NODE_ENV == "production") {
  API_BASE_URL = "";
} else {
  API_BASE_URL = "http://localhost:3002";
}

const firebaseConfig = {
  apiKey: "AIzaSyDQLtoB3B575aWasHlMyxWOXq9I4K71By8",
  databaseURL: "https://ppot-online-default-rtdb.firebaseio.com/",
  projectId: "ppot-online",
  authDomain: "ppot-online.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);

export { API_BASE_URL, getDatabase, ref, onValue, app, get, set };
