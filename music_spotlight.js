function getRelease(year, title, data) {
  for(let i in data[year]) {
    let work = data[year][i];
    if(work.title === title) return work;
  }
}

let currentlySelectedSpotlightWork = 0;

function setCurrentWork(work, index) {
  currentlySelectedSpotlightWork = index;
  
  let spcw_img = document.getElementById("spcw-img");
  let spcw_title = document.getElementById("spcw-title");
  let spcw_desc = document.getElementById("spcw-desc");
  let spcw_whyp_btn = document.getElementById("spcw-whyp-btn");
  let spcw_yt_btn = document.getElementById("spcw-yt-btn");

  let workId = work.title.replaceAll(" ", "_") + "_spot";
  let selected_work_in_list = document.getElementById(workId);

  document.querySelectorAll("button.spotlight_work").forEach((elem) => {
    if(elem.classList.contains("spotlight_selected_work")) elem.classList.remove("spotlight_selected_work");
  });
  selected_work_in_list.classList.add("spotlight_selected_work");

  spcw_img.setAttribute("src", work.cover);
  spcw_title.innerHTML = work.title;
  spcw_desc.innerHTML = work.desc;
  if(work.whyp != null) {
    spcw_whyp_btn.classList.remove("spcw-hidden");
    spcw_whyp_btn.setAttribute("href", work.whyp);
  } else if(!spcw_whyp_btn.classList.contains("spcw-hidden"))
    spcw_whyp_btn.classList.add("spcw-hidden");
  if(work.yt != null) {
    spcw_yt_btn.classList.remove("spcw-hidden");
    spcw_yt_btn.setAttribute("href", work.yt);
  } else if(!spcw_yt_btn.classList.contains("spcw-hidden"))
    spcw_yt_btn.classList.add("spcw-hidden");
}

fetch('./content/music.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById("music-spotlight-script").parentElement.insertAdjacentHTML('beforeend', `
      <div id="music-spotlight-container">
        <div id="music-spotlight-title">
          <h1>Spotlight</h1>
          <p>--- These are some of my works that I want to highlight ---</p>
        </div>
        <div id="music-spotlight-current">
          <img id="spcw-img" />
          <div id="spcw-side-container">
            <h2 id="spcw-title"></h2>
            <a id="spcw-yt-btn" class="spcw-ebtn spcw-hidden"><img src="https://www.svgrepo.com/show/13671/youtube.svg"
              width="26px" />&nbsp;Youtube&nbsp;<img src="res/icons/external_link.svg" width="20px" /></a>
            <a id="spcw-whyp-btn" class="spcw-ebtn spcw-hidden"><img src="https://cdn.whyp.it/static/logo_dark.svg"
              width="26px" />&nbsp;Whyp&nbsp;<img src="res/icons/external_link.svg" width="20px" /></a>
          </div>          
          <p id="spcw-desc"></p>
        </div>
        <div id="music-spotlight-list"></div>
      </div>    
    `);

    let fetchedWorks = [];
    let listContainer = document.getElementById("music-spotlight-list");
    listContainer.insertAdjacentHTML('beforeend', `<button id="spotlight-left-arrow" class="spotlight-arrow"><img src="res/icons/nav_arrow.svg" width="25px" /></button>`);
    for(let i in data.spotlight.list) {
      let workA = data.spotlight.list[i];
      let work = getRelease(workA[0], workA[1], data);
      fetchedWorks.push(work);
      let workId = work.title.replaceAll(" ", "_") + "_spot";
      listContainer.insertAdjacentHTML('beforeend', `<button id="${workId}" class="spotlight_work"><img src="${work.cover}" /></button>`);
      document.getElementById(workId).addEventListener("click", function() {
        setCurrentWork(work, i);
      });
    }
    listContainer.insertAdjacentHTML('beforeend', `<button id="spotlight-right-arrow" class="spotlight-arrow"><img src="res/icons/nav_arrow.svg" width="25px" /></button>`);

    document.getElementById("spotlight-left-arrow").addEventListener("click", function() {
      if(currentlySelectedSpotlightWork <= 0) currentlySelectedSpotlightWork = fetchedWorks.length;
      currentlySelectedSpotlightWork--;
      setCurrentWork(fetchedWorks[currentlySelectedSpotlightWork], currentlySelectedSpotlightWork);
    });
    document.getElementById("spotlight-right-arrow").addEventListener("click", function() {
      if(currentlySelectedSpotlightWork >= fetchedWorks.length - 1) currentlySelectedSpotlightWork = -1;
      currentlySelectedSpotlightWork++;
      setCurrentWork(fetchedWorks[currentlySelectedSpotlightWork], currentlySelectedSpotlightWork);
    });
    
    setCurrentWork(fetchedWorks[0], 0);
  });
