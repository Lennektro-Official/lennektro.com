// create navbar
const navbar_index = "https://lennektro.com/";
const navbar_music = "https://lennektro.com/music";
const navbar_gallery = "https://lennektro.com/analog-photography";
const navbar_whyp = "https://whyp.it/users/25331/lennektro/collections";
const navbar_youtube = "https://www.youtube.com/@Lennektro-Music";

const icon_size = 26;

document.getElementById("navbar-script").parentElement.insertAdjacentHTML('beforeend', `
  <div class="navbar-container">
    <div class="navbar">
      <a class="navbar-logo-link" href="${navbar_index}"><img class="navbar-logo" src="res/LennektroLogoHalo.svg" /></a>
      <a id="navbar-music" class="navbar-btn navbar-music" href="${navbar_music}"><img src="res/navbar_icons/music_logo.svg" width="${icon_size}px" />&nbsp;Music</a>
      <a id="navbar-gallery" class="navbar-btn navbar-gallery" href="${navbar_gallery}"><img src="res/navbar_icons/gallery_logo.svg" width="${icon_size}px" />&nbsp;Analog Photography</a>
      <div id="navbar-socials" class="navbar-socials">
        <div id="navbar-socials-content" class="navbar-socials-content">
          <a class="navbar-btn navbar-whyp" href="${navbar_whyp}"><img
              src="https://cdn.whyp.it/static/logo_dark.svg" width="${icon_size}px" />&nbsp;Whyp&nbsp;<img src="res/icons/external_link.svg" width="20px" /></a>
          <a class="navbar-btn navbar-yt" href="${navbar_youtube}"><img
              src="https://www.svgrepo.com/show/13671/youtube.svg" width="${icon_size}px" />&nbsp;Youtube&nbsp;<img src="res/icons/external_link.svg" width="20px" /></a>
        </div>
        <button onclick="navbarSocialsToggle()" id="navbar-socials-arrow" class="navbar-btn navbar-socials-arrow"><img
            src="res/icons/nav_arrow.svg" width="25px" /></button>
      </div>
    </div>
  </div>
`);

/*
  <button id="rotate-device-message" onclick="removeRotateMessage()">
    <h2>Please note that this site is best experienced on a desktop or tablet in landscape mode (tap this message to close it)</h2>
  </button>
*/

// mark active element
var navbar_active = "navbar-" + document.getElementById("navbar-script").getAttribute("navbar-active");
var navbar_active_element = document.getElementById(navbar_active);

if(!!navbar_active_element) {
  navbar_active_element.classList.add(navbar_active + "-active");  
}

// handle socials expandable
var navbar_socials = document.getElementById("navbar-socials");
var navbar_socials_content = document.getElementById("navbar-socials-content");
var navbar_socials_arrow = document.getElementById("navbar-socials-arrow");

var socialsToggled = false;

function navbarSocialsToggle() {
  if(socialsToggled) {
    navbar_socials.classList.remove("navbar-socials-active");
    navbar_socials_content.classList.remove("navbar-socials-content-active");
    navbar_socials_arrow.classList.remove("navbar-socials-arrow-active");
  } else {
    navbar_socials.classList.add("navbar-socials-active");
    navbar_socials_content.classList.add("navbar-socials-content-active");
    navbar_socials_arrow.classList.add("navbar-socials-arrow-active");
  }

  socialsToggled = !socialsToggled;
}

/*
// rotate notice
function removeRotateMessage() {
  document.getElementById("rotate-device-message").remove();
}
*/

// cheesy fix to prevent navbar spacing issues on mobile devices when device orientation changes
screen.orientation.addEventListener("change", () => {
  window.location.reload(true);
});
