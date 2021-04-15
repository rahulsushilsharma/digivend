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
firebase.analytics();
var db = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
  firebase
    .auth()

    .signInWithPopup(provider)
    .then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;

      console.log(token);
      console.log(user);

      //closing model on signup

      var modal = document.getElementById("id01");
      modal.style.display = "none";

      // adding profile pic
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(error.code);
      console.log(error.message);
    });
}

function googleSignout() {
  firebase
    .auth()
    .signOut()

    .then(
      function () {
        document.getElementById("user-img").src =
          "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png";
        console.log(
          "Signout Succesfull",
          document.getElementById("user-img").src
        );
      },
      function (error) {
        console.log("Signout Failed");
      }
    );
}

function callDbForMainPage() {
  db.collection("main_page")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        renderUI(doc.data());
      });
    });
}

// UI render

function renderUI(data) {
  let main = document.getElementById("main");
  let card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
  
    <a href="./product-type/product-type.html?">
      <img src="${data.img}">
        <div class="prod-disc">
          <p class="disc-line">Shirts & Trousers</p>
          <p class="offer-line">Upto 70% Off</p>
          <p class="prmo-line">Peter England, Arrow, Mufti...</p>
        </div>
    </a>

`;
  main.appendChild(card);
}

const searchInput = document.getElementById("search-input");

function search() {
  console.log(searchInput.value, window.location);
  window.location = "search/search.html?" + searchInput.value;
  let main = document.getElementById("main");
  main.innerHTML = `<h2>${searchInput.value}</h2>`;
}

searchInput.addEventListener("keyup", (ev) => {
  if (ev.key == "Enter") search();
});

callDbForMainPage();

// let email = "nuts@gmail.com";
// let password = "thisnuts#123";

// firebase
//   .auth()
//   .createUserWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in
//     var user = userCredential.user;
//     // ...
//     console.log(user);
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(errorCode, errorMessage);
//     // ..
//   });

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    document.getElementById("user-img").src = user.photoURL;
    document.getElementById("nav_login").style.display = "none";
    document.getElementById("nav_logout").style.display = "block";
  } else {
    document.getElementById("nav_login").style.display = "block";
    document.getElementById("nav_logout").style.display = "none";
    console.log("not signed in");
  }
});

document.getElementById("form_login").addEventListener(
  "click",

  () => {
    let email = "nuts@gmail.com";
    let password = "thisnuts#123";

    firebase
      .auth()
      .signInUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  }
);
