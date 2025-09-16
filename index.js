// get elements
const tb_a_title_container = document.getElementById("tb-a-title-container");
const tb_a_text_container = document.getElementById("tb-a-text-container");
const switch_button = document.getElementById("switch-button");

const about_box = document.getElementById("about-box");

// fade in title of about box after about box startup animation
setTimeout(function() {
  tb_a_title_container.classList.add("title-in");
  tb_a_title_container.classList.remove("hidden");
}, 1600);

// all typing animation speed
const typingSpeed = 10;

// fill text in about box with typing animation
const aboutText = [
  "Hi,",
  "I'm Lennektro and this site is dedicated to two hobbies I'm very passionate about: Making (mostly) electronic music and analog photography. Just to clarify: I don't do any of these things with any commercial interest or gain.",
  "I always strive to create honest art. For me music has become a way to express and process a lot of my emotions. And analog photography is just something that I picked up and that I also just enjoy a lot."
];

var aboutTextCount = Array(3).fill(0);

function writeAboutText(n) {
  if(aboutTextCount[n] >= aboutText[n].length) {
    if(n < 2) writeAboutText(n + 1);
    /*
    else {
      switch_button.classList.remove("nvis");
      switch_button.classList.add("switch-button-in");
    }
    */
    return;
  }
  document.getElementById("tb-a-text" + n).innerHTML += aboutText[n].charAt(aboutTextCount[n]);
  aboutTextCount[n]++;
  setTimeout(writeAboutText, typingSpeed, n);
}

setTimeout(function() {
  tb_a_text_container.classList.remove("hidden");
  writeAboutText(0);
}, 3200);
