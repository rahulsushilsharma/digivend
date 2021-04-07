var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);

console.log(queryString);

let heading = document.getElementsByClassName('product-head')[0];

let heading_data = document.createElement("h2");

heading_data.innerText = queryString;

heading.appendChild(heading_data);