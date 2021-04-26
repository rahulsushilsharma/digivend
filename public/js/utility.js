
const themeMap = {
  light: "solar",
  dark: "light",
  solar: "dark",
};

const theme =
  localStorage.getItem("theme") ||
  ((tmp = Object.keys(themeMap)[0]), localStorage.setItem("theme", tmp), tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);

function toggleTheme() {
  const current = localStorage.getItem("theme");
  const next = themeMap[current];

  bodyClass.replace(current, next);
  localStorage.setItem("theme", next);
}



//login popup
var modal = document.getElementById("id01");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";

    if(window.location.pathname === "/user/")window.location = "/";
  }
};


document.getElementById('login_tab_btn').addEventListener('click',()=>{
  document.getElementById('login_tab').style.display = 'block'
  document.getElementById('signin_tab').style.display = 'none'
})
document.getElementById('signin_tab_btn').addEventListener('click',()=>{
  document.getElementById('login_tab').style.display = 'none'
  document.getElementById('signin_tab').style.display = 'block'
})



