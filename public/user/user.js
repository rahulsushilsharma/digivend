var _user;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    _user = user;
    if (user.photoURL != null)
      document.getElementById("user-img-page").src = user.photoURL;
    document.getElementById("name").value = user.displayName;
    document.getElementById("email").innerText = user.email;
    document.getElementById("joined").innerText = user.metadata.creationTime;
    document.getElementById("last").innerText = user.metadata.lastSignInTime;
  } else {
    console.log("not signed in");
    document.getElementById("id01").style.display = "block";
  }
});

function updateName() {
  _user
    .updateProfile({
      displayName: document.getElementById("name").value,
    })
    .then(function () {
      successNotification({
        message: "Name changed to " + document.getElementById("name").value,
      });
    })
    .catch(function (error) {
      errorNotification({
        message: "Error " + error,
      });
    });
}

