function renderImages() {
  var strHtml = "";
  for (var i = 1; i < gImgs.length; i++) {
    strHtml += `<img class="image image${i}" data-selectedImgId=${i} onclick="getCurrMeme(this)" src="js/src/${i}.jpg">`;
  }
  var gridContainer = document.querySelector(".gallery-container");
  gridContainer.innerHTML = strHtml;
}

