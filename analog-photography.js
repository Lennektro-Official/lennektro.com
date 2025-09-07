function waitForImage(imgElem) {
    return new Promise(res => {
        if (imgElem.complete) {
            return res();
        }
        imgElem.onload = () => res();
        imgElem.onerror = () => res();
    });
}

async function placeImage(grow, imid, date, img, thumb) {
  grow.insertAdjacentHTML("beforeend", `<a title="${date}" class="pic" href="${img}"><h1>Loading Image...</h1><img id="apgimg${imid}" loading="lazy" src="${thumb}" /></a>`);
  waitForImage(document.getElementById("apgimg" + imid));
  imid++;
}

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

        placeImage(grow, imid, date, img, thumb);
      }
    }
  });
