fetch("./content/gallery.json")
  .then(res => res.json())
  .then(data => {
    let crow = 1;
    let imid = 0;
    for(let i in data.images) {
      let date = data.images[i].d;
      for(let j in data.images[i].i) {
        let imgEntry = data.images[i].i[j];
        let img = null;
        let thumb = null;
        if(typeof imgEntry === "string") {
          thumb = imgEntry;
          img = imgEntry;        
        } else {
          thumb = imgEntry[0];
          img = imgEntry[1];
        }

        let grow = document.getElementById("grow" + crow);

        crow++;
        if(crow > 3) crow = 1;

        grow.insertAdjacentHTML("beforeend", imid < 12 ? `<a title="${date}" class="pic" href="${img}"><img id="${imid}" src="${thumb}" /></a>` : `<a title="${date}" class="pic" href="${img}"><h1 id="loadtext${imid}">Loading Image...</h1><img class="lazy" id="${imid}" data-src="${thumb}" /></a>`);
        imid++;   
      }
    }
    
    const lazyImages = document.querySelectorAll("img.lazy");

    const lazyLoad = () => {
      lazyImages.forEach((image) => {
        if(image.getBoundingClientRect().top <= window.innerHeight && getComputedStyle(image).display !== "none") {
          let previmg = document.getElementById(image.id - 3);
          if(!previmg.classList.contains("lazy")) {
            image.addEventListener('load', function() {
              image.classList.remove("lazy");
              let loadtext = document.getElementById("loadtext" + image.id);
              if(loadtext != null) loadtext.remove();
            });
            image.src = image.dataset.src;
          }
        }
      });
    };

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);  
});
