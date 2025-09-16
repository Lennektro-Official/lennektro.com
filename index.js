// get elements
const tb_a_title_container = document.getElementById("tb-a-title-container");
const tb_title = document.getElementById("tb-title-h1");
const tb_title_img = document.getElementById("tb-title-img");
const tb_a_text_container = document.getElementById("tb-a-text-container");
const switch_button = document.getElementById("switch-button");
const text_box = document.getElementById("text-box");

// fade in title of text box after text box startup animation
setTimeout(function() {
  text_box.classList.remove("text-box-in");
  tb_a_title_container.classList.add("title-in");
  tb_a_title_container.classList.remove("hidden");
}, 1600);

// all typing animation speed
const typingSpeed = 10;

// texts
const aboutTextBg = "bg-about-this-place";
const aboutTextTitle = "About This Place";
const aboutTextImg = "res/LennektroLogoHalo.svg";
const aboutText = [
  "Hi,",
  "I'm Lennektro and this site is dedicated to two hobbies I'm very passionate about: Making (mostly) electronic music and analog photography. Just to clarify: I don't do any of these things with any commercial interest or gain.",
  "I always strive to create honest art. For me music has become a way to express and process a lot of my emotions. And analog photography is just something that I picked up and that I also just enjoy a lot."
];

const musicTextBg = "bg-music";
const musicTextTitle = "Why I Make Music&nbsp;";
const musicTextImg = "res/index_icons/music.svg";
const musicText = [
  "Test sentence one with a lot of nonsense garbage",
  "Test sentenece two with some lorem ipsum stuff for testing",
  "Blablub"
];

const photographyTextBg = "bg-photography";
const photographyTextTile = "The Beauty of Analog Photography";
const photographyTextImg = "res/index_icons/photography.svg";
const photographyText = [
  "Test sentence one with a lot of nonsense garbage",
  "Test sentenece two with some lorem ipsum stuff for testing",
  "Blablub"
];

// fill about text in text box with typing animation
tb_title.innerHTML = aboutTextTitle;
tb_title_img.src = aboutTextImg;

var aboutTextCount = Array(aboutText.length).fill(0);

function writeAboutText(n) {
  if(aboutTextCount[n] >= aboutText[n].length) {
    if(n < aboutText.length - 1) writeAboutText(n + 1);
    /*
    else {
      switch_button.classList.remove("nvis");
      switch_button.classList.add("switch-button-in");
    }
    */
    return;
  }
  if(aboutTextCount[n] === 0) tb_a_text_container.insertAdjacentHTML('beforeend', `<p id="tb-a-text${n}" class="tb-text"></p>`);
  document.getElementById("tb-a-text" + n).innerHTML += aboutText[n].charAt(aboutTextCount[n]);
  aboutTextCount[n]++;
  setTimeout(writeAboutText, typingSpeed, n);
}

setTimeout(function() {
  tb_a_text_container.classList.remove("hidden");
  writeAboutText(0);
}, 3200);

// handle text and background switching
var switching = false;
var currentTextInd = 0;

function changeText(title, img, text, bg) {
  switching = true;

  document.body.classList.add("bg-fade-out");
  setTimeout(function() {
    document.body.className = bg;
    document.classList.add("bg-black");
  }, 250);
  setTimeout(function() {
    document.classList.add("bg-fade-in");
    document.classList.remove("bg-black");
  }, 500);

  text_box.classList.add("textSwitchAnim");

  setTimeout(function() {
    tb_title.innerHTML = title;
    tb_title_img.src = img;
    tb_a_text_container.innerHTML = "";
    for(let i = 0; i < text.length; i++) {
      tb_a_text_container.insertAdjacentHTML('beforeend', `<p id="tb-a-text${i}" class="tb-text"></p>`);
      document.getElementById("tb-a-text" + i).innerHTML = text[i];
    }
  }, 250);

  setTimeout(function() {
    text_box.classList.remove("textSwitchAnim");
    switching = false;
  }, 500);
}

function onSwitchClick() {
  if(switching) return;
  currentTextInd++;
  switch(currentTextInd) {
    case 1:
      changeText(musicTextTitle, musicTextImg, musicText, musicTextBg);
      break;
    case 2:
      changeText(photographyTextTile, photographyTextImg, photographyText, photographyTextBg);
      switch_button.classList.remove("switch-button-down");
      switch_button.classList.add("switch-button-up");
      break;
    default:
      currentTextInd = 0;
      switch_button.classList.remove("switch-button-up");
      switch_button.classList.add("switch-button-down");
      changeText(aboutTextTitle, aboutTextImg, aboutText, aboutTextBg);
      break;
  }
}
