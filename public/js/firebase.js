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
      document.getElementById("user-img").src = user.providerData[0].photoURL;

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
        document.getElementById("user-img").src = "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png";
        console.log("Signout Succesfull",  document.getElementById("user-img").src);
      },
      function (error) {
        console.log("Signout Failed");
      }
    );
}
