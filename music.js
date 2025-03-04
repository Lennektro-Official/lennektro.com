const main_body = document.getElementById("main-body");

const work_display = document.getElementById("work-display");
const wd_img = document.getElementById("wd-img");
const wd_title = document.getElementById("wd-title");
const wd_whyp_btn = document.getElementById("wd-whyp-btn");
const wd_yt_btn = document.getElementById("wd-yt-btn");
const wd_desc = document.getElementById("wd-desc");

fetch('./content/music.json')
  .then(res => res.json())
  .then(data => {
    for(let year in data) {
      main_body.insertAdjacentHTML('beforeend', `<div class="year-wrapper"><div class="year-title"><h1>${year}</h1></div><div id="${year}" class="year-container"></div></div>`);
      let year_container = document.getElementById(year);
      for(let i in data[year]) {
        let work = data[year][i];
        let work_id = work.title.replace(" ", "_");
        let trackSpec = "Single";
        if(work.tracks != -1) trackSpec = work.tracks + " Tracks";
        year_container.insertAdjacentHTML('beforeend', `<button id="${work_id}" class="work"><img src="${work.cover}" /><h2>${work.title}</h2><p>${trackSpec}</p></button>`);
        document.getElementById(work_id).addEventListener("click", function() {
          wd_img.setAttribute("src", work.cover);
          wd_title.innerHTML = work.title;
          wd_desc.innerHTML = work.desc;
          if(work.whyp != "") {
            wd_whyp_btn.classList.remove("wd-hidden");
            wd_whyp_btn.setAttribute("href", work.whyp);
          } else if(!wd_whyp_btn.classList.contains("wd-hidden"))
            wd_whyp_btn.classList.add("wd-hidden");
          if(work.yt != "") {
            wd_yt_btn.classList.remove("wd-hidden");
            wd_yt_btn.setAttribute("href", work.yt);
          } else if(!wd_yt_btn.classList.contains("wd-hidden"))
            wd_yt_btn.classList.add("wd-hidden");
          if(!work_display.classList.contains("wd-hidden")) return;
          work_display.classList.remove("wd-hidden");
          work_display.classList.add("wd-fade-in");
        }, false);
      }
    }
  });

function closeWorkDisplay() {
  if(work_display.classList.contains("wd-hidden")) return;
  work_display.classList.add("wd-hidden");
  work_display.classList.remove("wd-fade-in");
  wd_whyp_btn.classList.add("wd-hidden");
  wd_yt_btn.classList.add("wd-hidden");
}
