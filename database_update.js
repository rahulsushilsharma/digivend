const firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyBucEoNVsF9DMVY5WjH7xHuJK29TPJkdNM",
  authDomain: "digivend-beta.firebaseapp.com",
  databaseURL:
    "https://digivend-beta-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "digivend-beta",
  storageBucket: "digivend-beta.appspot.com",
  messagingSenderId: "841346946498",
  appId: "1:841346946498:web:6290b958c487701711b25b",
  measurementId: "G-D52LPKXD3Q",
};

firebase.initializeApp(firebaseConfig);
const db = app.firestore();

function writeInDb(doc, data) {
  db.collection("search")
    .doc(doc)
    .set(data)
    .then(() => {
      console.log(`Document successfully written!`, doc);
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}
