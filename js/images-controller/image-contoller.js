function renderImages() {
  var strHtml = "";
  for (var i = 1; i < gImgs.length; i++) {
    strHtml += `<img class="image image${i}" data-selectedImgId=${i} onclick="getCurrMeme(this)" src="js/src/${i}.jpg" >`;
  }
  var gridContainer = document.querySelector(".gallery-container");
  gridContainer.innerHTML = strHtml;
}



function managePageDisplay(page) {
  var memes = document.querySelector(".main-content");
  var gallery = document.querySelector(".gallery-page");

  if (page.innerText === "Gallery") {
    memes.style.display = "none";
    gallery.style.display = "block";
  }

  if (
    page.innerText === "Memes" ||
    page === "Memes" ||
    page.innerText === "Logo"
  ) {
    memes.style.display = "block";
    gallery.style.display = "none";
  }
}