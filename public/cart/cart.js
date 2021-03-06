function renderUIForCart() {
  cartLS.list().forEach((data) => {
    let main = document.getElementById("cart-main");
    let card = document.createElement("div");
    card.innerHTML = `
    <div class="item">
    <a href="../product-details/product-details.html?${data.title}">
    <img src="${data.img}" alt="">
          </a>
        
        <p class="disc">${data.title}</p>
        <p class="discounted_price" style="margin-top:2rem;">₹  ${data.price}</p>
        <input class="quantity"  min="1" max="9999" oninput="updateQuantity(event)" type="number" name="quantity" value = ${data.quantity} id="quantity">
        <button class="remove" onclick="removeFromCart(event)">Remove</button>
        <span id= "cart_id">${data.id}<span>
    </div>  

  `;
    main.appendChild(card);
  });
}

// cartLS.add({ id: 1, name: "Product 1", price: 100 });
// cartLS.add({ id: 2, name: "Product 2", price: 100 }, 4);

function addToCart(event) {
  console.log(event);
}

function removeFromCart(event) {
  let id = event.path[1].children[5].innerText;

  cartLS.remove(parseInt(id));
  console.log(cartLS.list());

  event.path[1].remove();
  calculatetotal();
}

function calculatetotal() {
  document.getElementById("total").innerText = cartLS.total();
}
function updateQuantity(event) {
  let id = event.path[1].children[5].innerText;
  if (parseInt(event.target.value) >= 1) {
    cartLS.update(parseInt(id), "quantity", parseInt(event.target.value));
  } else {
    errorNotification({
      message: "Already minimum quantity in cart",
    });
  }
  // console.log(parseInt(id), parseInt(event.target.value));
  calculatetotal();
}

renderUIForCart();
calculatetotal();

function syncCart() {
  let cart_data_for_sync = [];
  let doc_id;
  db.collection("users")
    .where("email", "==", firebase.auth().currentUser.email)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        if (doc.data()?.cart_data)
          cart_data_for_sync.push(doc.data()?.cart_data);
        doc_id = doc.id;
      });

      cartLS.list().forEach((data) => {
        cart_data_for_sync.push(data);
      });
      db.collection("users").doc(doc_id).update({
        cart_data: cart_data_for_sync,
      });
    });
}
