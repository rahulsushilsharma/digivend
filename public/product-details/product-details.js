function renderUI(data) {
  let main = document.getElementById("product-details-main");
  let card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    
      
  
  <div class="main-image">
      <img src="${dummyData.img}" alt="">
  </div>
  <div class="meta">
      <p class="title">${dummyData.title}</p>
      <p class="disc">${dummyData.disc}</p>
      <p class="price">₹${dummyData.price}</p>
     <button class="cart-button" onclick="addToCart()">Add to cart</button>


  </div>

  
  `;
  main.appendChild(card);
}

let firebaseData;

function callDbForMainPage() {
  db.collection("main_page")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        renderUI(doc.data());
        firebaseData = doc.data();
        addToCart();
      });
    });
}

callDbForMainPage();

function addToCart() {
  Lockr.set("cart", firebaseData);

  console.log(Lockr.get("cart"));
}

let dummyData = {
  img:
    "https://rukminim1.flixcart.com/image/416/416/kidgnm80-0/headphone/q/a/e/volt-with-15-hours-play-time-hoppup-original-imafy6mnu3f7pccz.jpeg?q=70",
  title:
    "HOPPUP Volt With 15 Hours Play Time Neckband Bluetooth Headset  (Black, In the Ear)",
  disc: `
    This HOPPUP Bluetooth headset is here to make an impression with its stylish design and innovative features. The magnetic earbuds ensure tangle-free usage, saving you a lot of trouble. The dynamic drivers provide natural, clear, and high-definition sound so that you can enjoy listening to all your favourite tunes.`,
  price: 599,
};
