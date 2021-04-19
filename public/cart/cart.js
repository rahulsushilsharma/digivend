
let dummyData = {
    img:
      "https://rukminim1.flixcart.com/image/416/416/kidgnm80-0/headphone/q/a/e/volt-with-15-hours-play-time-hoppup-original-imafy6mnu3f7pccz.jpeg?q=70",
    title:
      "HOPPUP Volt With 15 Hours Play Time Neckband Bluetooth Headset  (Black, In the Ear)",
    disc: `
      This HOPPUP Bluetooth headset is here to make an impression with its stylish design and innovative features. The magnetic earbuds ensure tangle-free usage, saving you a lot of trouble. The dynamic drivers provide natural, clear, and high-definition sound so that you can enjoy listening to all your favourite tunes.`,
    price: 599,
    discount: 10,
    tags : ["earphone", "boat", "jbl"]
  };
  


Lockr.set("cart", dummyData);


let cart = []
cart.push(Lockr.get("cart"));
console.log(Lockr.getAll());

function renderUIForCart(data) {
  let main = document.getElementById("cart-main");
  let card = document.createElement("div");
  card.innerHTML = `
    <div class="item">
        <img src="${data.img}" alt="">
        <p class="disc">${data.title}</p>
        <input class="quantity" type="number" name="quantity" id="quantity">
        <button class="remove">Remove</button>
    </div>  
      

  `;
  main.appendChild(card);
}

cart.forEach((element) => {
  renderUIForCart(element);
});


function removeFromCart(title){
    let arr = Lockr.getAll(true)

    arr.forEach(ele=>{
        if(ele.title == title)console.log(true);
    })
}

function updateQuantity(){
    document.getElementById('quantity')
}