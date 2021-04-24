var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);

console.log(queryString);

let title = document.querySelector('title');
title.innerText = `Digivend | ${queryString}`

function renderUI(data) {
  let main = document.getElementById("product-details-main");
  let card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    
      
  
  <div class="main-image">
      <img src="${dummyData.img}" alt="">
  </div>
  <div class="meta">
      <p id= "title" class="title">${dummyData.title}</p>
      <p class="disc">${dummyData.disc}</p>
      <p class="price">₹${dummyData.price}</p>
     <button onclick="addToCart()" class="cart-button">Add to cart</button>


  </div>

  
  `;
  main.appendChild(card);
}

let firebaseData;

function callDbForMainPage() {
  db.collection("main_page")
    .get()
    .then((querySnapshot) => {
      document.getElementById("loading_spinner").style.display = "none";

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        firebaseData = doc.data();
        // document
        //   .getElementById("add_to_cart_btn")
        //   .addEventListener("click", () => {
        //     addToCart();
        //   });
      });
    });
}

// callDbForMainPage();



renderUI(dummyData);
