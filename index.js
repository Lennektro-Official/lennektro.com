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
const musicTextTitle = "Why I Make Music&nbsp;&nbsp;";
const musicTextImg = "res/index_icons/music.svg";
const musicText = [
  "I view music as an extension of my language as it allows me to express feelings and emotions in a way that is just not possible to replicate with any other medium.",
  "Although I view art as a form of communication and a medium to get into touch with other people, that's only partially why I make music. I primarily make music for myself and to process certain experiences and feelings. I like to say that music is my emotional outlet, as I tend to struggle to process and express a lot of my emotions with other mediums. And if someone ends up liking the stuff I create, that's great, but it doesn't matter to me how many people I reach with my music. I think I probably would also make music if nobody would listen to my music, but it is nice when you know that you moved something in someone, even when it's only one person.",
  "I personally believe that no matter what kind of art you create or what medium you use to express yourself, it's always important to stay true to yourself and to strive to make honest art, and not try to create what you think will appeal to other people. Because eventually the right people will find you. How many? Doesn't matter."
];

const photographyTextBg = "bg-photography";
const photographyTextTile = "The Beauty of Analog Photography";
const photographyTextImg = "res/index_icons/photography.svg";
const photographyText = [
  "There is just something about the feel and vibe of analog photography that digital photography just can't capture. It just feels in a way more authentic and more real and that is why I developed a passion for it.",
  "My main camera is an old Practica FX that I inherited from my grandpa that I never met, as he died before I was born. In a way using that camera is one of the few things that make me feel connected to him in some sense. I never met that person and I hardly know anything about him, only a few things I was told by my family, but I like that odd connection to him knowing he was also interested in photography.",
  "And there is just a certain magic to capturing moments with a completely mechanic camera and the whole feel and haptics of it. It also just makes you consider a lot more what things you really want to photograph and therefore you end up with a lot more meaningful photos."
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
