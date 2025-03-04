const logo = document.getElementById("logo");
const font1 = document.getElementById("font1");
const font2 = document.getElementById("font2");

setTimeout(function() {
  logo.classList.add("fadeIn");
  logo.classList.remove("hidden");
}, 200);
setTimeout(function() {
  font1.classList.add("fadeIn");
  font1.classList.remove("hidden");
}, 1200);
setTimeout(function() {
  font2.classList.add("fadeIn");
  font2.classList.remove("hidden");
}, 1700);
