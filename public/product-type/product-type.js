var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);


queryString = queryString.toString();
queryString = queryString.toLocaleLowerCase();
console.log(queryString);

let title = document.querySelector("title");
title.innerText = `Digivend | ${queryString}`;

function renderComments(data) {
  let main = document.getElementById("comment_area");
  let card = document.createElement("div");
  card.innerHTML = `
  
  `;
  main.appendChild(card);
}

function renderUI(data, id, rating) {
  let main = document.getElementById("product-type-main");
  let card = document.createElement("div");
  let discounted_price = Math.round(
    data.price - (data.price * data.discount) / 100
  );
  rating = Math.round(rating * 10) / 10
  card.classList.add("card");
  card.innerHTML = `
  <div>
        <img src="${data.img}" >
        </div>
        <div class="prod-disc">
          
          <a href="../product-details/product-details.html?${data.title}">
              <p class="disc-line">${data.title}</p>
          </a>
    <div id = "product-type-main"><div id="rating">
    <p>${rating}</p>
    <span class="fa fa-star checked"></span>
</div></div>
              <p class="discount"> <span>${data.discount}</span>% off</p>
              <p class="discounted_price">₹<span>${discounted_price}</span></p>
              <p class="price">₹${data.price}</p>
            <button onclick="addToCart(event)" class="cart_div">
              <svg  height="40pt" viewBox="0 -30 511.99961 511" width="40pt" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m195.03125 450.570312c-24.820312 0-45.007812-20.191406-45.007812-45.007812 0-24.820312 20.1875-45.007812 45.007812-45.007812 24.816406 0 45.003906 20.1875 45.003906 45.007812 0 24.816406-20.1875 45.007812-45.003906 45.007812zm0 0"
                        fill="#697c86" />
                    <path
                        d="m195.03125 420.5625c-8.277344 0-15.003906-6.722656-15.003906-15s6.726562-15.003906 15.003906-15.003906 15 6.726562 15 15.003906-6.722656 15-15 15zm0 0"
                        fill="#465a61" />
                    <path
                        d="m407.0625 450.570312c-24.816406 0-45.007812-20.191406-45.007812-45.007812 0-24.820312 20.191406-45.007812 45.007812-45.007812s45.007812 20.1875 45.007812 45.007812c0 24.816406-20.191406 45.007812-45.007812 45.007812zm0 0"
                        fill="#596c76" />
                    <path
                        d="m407.0625 420.5625c-8.277344 0-15.003906-6.722656-15.003906-15s6.726562-15.003906 15.003906-15.003906 15 6.726562 15 15.003906-6.722656 15-15 15zm0 0"
                        fill="#3b4a51" />
                    <path
                        d="m454.46875 345.550781c0 8.402344-6.601562 15.003907-15 15.003907h-287.042969c-24.90625 0-45.007812-20.105469-45.007812-45.007813 0-22.800781 16.800781-41.707031 39.003906-44.40625 1.800781-.601563 3.902344-.601563 6.003906-.601563 3.597657 0 7.199219 1.503907 9.601563 3.902344l-9.003906 26.105469c-.296876 0-.296876 0-.597657 0-8.402343 0-15.003906 6.597656-15.003906 15s6.601563 15.003906 15.003906 15.003906h287.042969c8.398438 0 15 6.597657 15 15zm0 0"
                        fill="#465a61" />
                    <path
                        d="m99.5625 60.542969c.953125 1.199219 17.109375 8.496093 33.375 15.640625.058594-1.292969.222656-2.574219-.070312-3.894532l-13.199219-60.011718c-1.511719-6.886719-7.605469-11.777344-14.652344-11.777344h-90.011719c-8.292968 0-15.003906 6.710938-15.003906 15.003906 0 8.289063 6.710938 15 15.003906 15h77.953125zm0 0"
                        fill="#465a61" />
                    <path
                        d="m454.46875 345.550781c0 8.402344-6.601562 15.003907-15 15.003907h-141.125v-30.003907h141.125c8.398438 0 15 6.597657 15 15zm0 0"
                        fill="#3b4a51" />
                    <path
                        d="m509.078125 66.511719c-3-3.902344-7.203125-6.003907-12.003906-6.003907h-397.460938l46.808594 210.632813 6.601563 29.40625h284.042968c6.601563 0 12.601563-4.503906 14.402344-10.804687l60.007812-210.03125c1.203126-4.5.300782-9.601563-2.398437-13.199219zm0 0"
                        fill="#fdbf00" />
                    <path
                        d="m511.476562 79.710938-60.007812 210.03125c-1.800781 6.300781-7.800781 10.804687-14.402344 10.804687h-138.722656v-240.039063h198.730469c4.800781 0 9.003906 2.101563 12.003906 6.003907 2.699219 3.597656 3.601563 8.699219 2.398437 13.199219zm0 0"
                        fill="#ff9f00" />
                </svg>
                </button>
        </div>
        <span style="position: absolute; top: -9999px; left: -9999px;">${id}</span>

    
    `;
  main.appendChild(card);
}

let firebaseData;

function callDbForProductType() {
  db.collection("search")
    .where("tags", "array-contains", queryString)
    .get()
    .then((querySnapshot) => {
      document.getElementById("loading_spinner").style.display = "none";
      querySnapshot.forEach((doc) => {
        firebaseData = doc.data();
        doc_id = doc.id;
        console.log(firebaseData);

        if (firebaseData.comments) {
          let rating = 0;
          firebaseData.comments.forEach((data) => {
            rating = rating + data.rating;
          });
          rating = rating / firebaseData.comments.length;
          // console.log(firebaseData, firebaseData.id, rating);

          renderUI(firebaseData, firebaseData.id, rating);
        } else {
          renderUI(firebaseData, firebaseData.id, "0");
        }
      });
    });
}
callDbForProductType();

function addToCart(event) {
  let card = event.target.closest(".card");
  let id = parseInt(card.children[2].innerText);
  console.log(card?.children[1]?.children);
  if (!cartLS.exists(id)) {
    let data = {
      id: id,
      title: card.children[1]?.children[0]?.children[0]?.innerText,
      price: parseInt(card?.children[1]?.children[3]?.children[0]?.innerText),
      img: card?.children[0].children[0].src,
      link: card?.children[1]?.children[0].href,
    };
    console.log(card?.children[1]?.children[2]);
    successNotification({
      message: "Sucessfully added to the cart ",
    });
    cartLS.add(data);
  } else {
    errorNotification({
      message: "Already added to the cart",
    });
  }
}
