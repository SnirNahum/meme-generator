
var gImgs=[]
var gMeme;
function renderMames() {
  var strHtml = "";
  for (var i = 1; i <= images.length; i++) {
    strHtml += `<img class="image image${i}" onclick="renderMame(this)"  src="js/src/${i}.jpg">`;
  }
  var gridContainer = document.querySelector(".gallery-container");
  gridContainer.innerHTML = strHtml;
}

function renderMame(image) {
  currImage.src = image.src;
}

function drawText(text) {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = "brown";
  gCtx.fillStyle = "black";
  gCtx.font = "40px Arial";
  gCtx.textAlign = "center";
  gCtx.textBaseline = "middle";
  x = gElCanvas.width / 2;
  y = gElCanvas.height / 6;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}
