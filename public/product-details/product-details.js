var queryString = decodeURIComponent(window.location.search);
let firebaseData;
let doc_id;
let comments = [];
queryString = queryString.substring(1).trim();
console.log(queryString);
let title = document.querySelector("title");
title.innerText = `Digivend | ${queryString}`;

function renderUI(data, rating__) {
  console.log(rating__);
  let main = document.getElementById("product-details-main");
  let card = document.createElement("div");
  let discounted_price = data.price - (data.price * data.discount) / 100;
  card.classList.add("product");
  card.innerHTML = `
    
      
  
  <div class="main-image">
      <img style="max-height: 40rem;max-width: 40rem;margin: 1rem auto;display: block;" src="${data.img}" alt="">
  </div>
  <div class="meta" >
  <button onclick="addToCart()" class="cart-button">Add to cart</button>

      <p id= "title" class="title">${data.title}</p>
      <div id="main_rating">
      <p>${rating__}</p>
      <span class="fa fa-star checked"></span>
      </div>
      <p class="discount"> <span>${data.discount}</span>% off</p>
      <p class="discounted_price">₹<span>${discounted_price}</span></p>
      <p class="price">₹${data.price}</p>
      <p id= "disc" class="disc">${data.disc}</p>
      
  </div>

  
  `;
  main.appendChild(card);
}

function renderComments(data) {
  let main = document.getElementById("comment_area");
  let card = document.createElement("div");
  card.classList.add("comment_box");
  card.innerHTML = `
  <div class="comment_data">
  <div id="rating">
      <p>${data.rating}</p>
      <span class="fa fa-star checked"></span>
      </div>
      <p>${data.cumment}</p>
  </div>
      <p class="commenter_name">By : <span>${data.name}</span></p> 
  `;
  main.appendChild(card);
}


function renderCommentInput() {
  let main = document.getElementById("comment");
  let card = document.createElement("div");
  card.classList.add("comment_input");
  card.innerHTML = `


      <div class="comment_input_box">
      <div style="padding: 3rem 0 0;">
      <label style="font-weight: bold; margin-left: 3rem;" for="rate">Rate:</label>

      <select id="rate" name="rate">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      
      </div>
      <div>
      <p>Comment:</p>
      <textarea id="user_cumment"></textarea>
      </div>
      </div>

      <button onclick="submitCummnet()">Submit</button>
  
  `;
  main.appendChild(card);
}



function callDbForMainPage() {
  db.collection("search")
    .where("title", "==", queryString)
    .get()
    .then((querySnapshot) => {
      document.getElementById("loading_spinner").style.display = "none";

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        firebaseData = doc.data();
        doc_id = doc.id;

        

        if (firebaseData.comments) {
          let rating = 0;
          firebaseData.comments.forEach((data) => {
            rating = rating + data.rating;
          });
          rating = rating / firebaseData.comments.length;

          comments = firebaseData.comments;
          firebaseData.comments.forEach((data) => renderComments(data));
          renderUI(firebaseData, rating);
          renderCommentInput();
        } else {
          renderUI(firebaseData, '0');
          renderCommentInput();
        }
      });
    });
}

callDbForMainPage();

function addToCart() {
  let id = firebaseData.id;
  if (!cartLS.exists(id)) {
    cartLS.add(firebaseData);
    successNotification({
      message: "Sucessfully added to the cart ",
    });
  } else {
    errorNotification({
      message: "Already added to the cart",
    });
  }
}

function submitCummnet() {
  let cum = document.getElementById("user_cumment").value.trim();
  if (firebase.auth().currentUser == null) {
    warningNotification({
      message: "Please Login to comment",
    });
  } else if (firebase.auth().currentUser.displayName == null) {
    warningNotification({
      message: "Please set your display name in user dashbord",
    });
  } else if (alreadyCummented(firebase.auth().currentUser.displayName)) {
    warningNotification({
      message: "Already commented ",
    });
  } else if (cum == "" || cum == "rate the product.") {
    warningNotification({
      message: "please write a comment",
    });
  } else {
    data = {
      name: firebase.auth().currentUser.displayName,
      cumment:cum,
      rating: parseInt(document.getElementById("rate").value),
    };
    comments.push(data);
    console.log(comments);
    renderComments(data);
    db.collection("search").doc(doc_id).update({
      comments: comments,
    });
    let rating = 0;
    comments.forEach((data) => {
      rating = rating + data.rating;
    });
    rating = rating / comments.length;
    document.querySelector("#main_rating p").innerHTML = rating;
    successNotification({
      message: "Sucessfully commented ",
    });
  }
}

function alreadyCummented(user) {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].name == user) return true;
  }
  return false;
}
