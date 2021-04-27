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

const successNotification = window.createNotification({
  theme: "success",
  showDuration: 3000,
  positionClass: "nfc-bottom-right",
});
const warningNotification = window.createNotification({
  theme: "warning",
  showDuration: 3000,
  positionClass: "nfc-bottom-right",
});
const errorNotification = window.createNotification({
  theme: "error",
  showDuration: 3000,
  positionClass: "nfc-bottom-right",
});

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
      errorNotification({
        message: error.message,
      });
    });
}

function googleSignout() {
  firebase
    .auth()
    .signOut()

    .then(
      function () {
        successNotification({
          message: "logged out sucessfull ",
        });
        document.getElementById("user-img").src =
          "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png";
      },
      function (error) {
        console.log("Signout Failed");
        errorNotification({
          message: "logged out failed ",
        });
      }
    );
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.photoURL != null)
      document.getElementById("user-img").src = user.photoURL;
    document.getElementById("nav_login").style.display = "none";
    document.getElementById("nav_logout").style.display = "block";
    successNotification({
      message: "logged from " + user.email,
    });
  } else {
    document.getElementById("nav_login").style.display = "block";
    document.getElementById("nav_logout").style.display = "none";
    console.log("not signed in");
  }
});

document.getElementById("form_login").addEventListener(
  "click",

  () => {
    let email = document.getElementById("login_email").value;
    let password = document.getElementById("login_pass").value;
    // console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;

        var modal = document.getElementById("id01");
        modal.style.display = "none";
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        errorNotification({
          message: error.message,
        });
      });
  }
);

document.getElementById("form_signup").addEventListener(
  "click",

  () => {
    let email = document.getElementById("signup_email").value;
    let password = document.getElementById("signup_pass").value;
    let retypePassword = document.getElementById("signup_retype_pass").value;
    // console.log(email, password);
    if (password != retypePassword) {
      warningNotification({
        message: "password does not match",
      });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          var modal = document.getElementById("id01");
          modal.style.display = "none";
          console.log(user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          errorNotification({
            message: error.message,
          });
        });
    }
  }
);

const searchInput = document.getElementById("search-input");

function search() {
  let search_value = searchInput.value.trim();
  search_value = search_value.toString();
  search_value = search_value.toLocaleLowerCase()
  let newUrl  = window.location.protocol + "//" + window.location.host + "/search" + "?" + search_value;
  window.location.assign(newUrl)
}

searchInput.addEventListener("keyup", (ev) => {
  if (ev.key == "Enter") search();
});
