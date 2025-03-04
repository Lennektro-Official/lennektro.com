fetch("./content/gallery.json")
  .then(res => res.json())
  .then(data => {
    let crow = 1;
    for(let i in data.images) {
      //let date = data.images[i].d;
      for(let j in data.images[i].i) {
        let img = data.images[i].i[j];
        let grow = document.getElementById("grow" + crow);

        crow++;
        if(crow > 3) crow = 1;

        grow.insertAdjacentHTML("beforeend", `<a class="pic" href="${img}"><img loading="lazy" src="${img}" /></a>`);
      }
    }
  });
