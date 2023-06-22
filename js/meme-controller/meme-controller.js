let gElCanvas;
let gCtx;
let currImage;
let gCurrText;
let images;
let gCurrColor;
let gCurrTextSize;
var as = 4
const TOUCH_EVS = ["touchstart", "touchmove", "touchend"];

function onInit() {
  gCurrColor = "#ffffff";
  gCurrTextSize = 30;
  gElCanvas = document.querySelector(".meme-canvas");
  gCtx = gElCanvas.getContext("2d");

  currImage = new Image();
  currImage.src = `${gImgs[1].url}`;

  renderImages();

  currImage.onload = () => {
    gElCanvas.height =
      (currImage.naturalHeight / currImage.naturalWidth) * gElCanvas.width;
    gCtx.drawImage(currImage, 0, 0, gElCanvas.width, gElCanvas.height);
  };
}

// function addEventListeners() {
//   gElCanvas.addEventListener("mousedown",onmousedown)
//   gElCanvas.addEventListener("mousemove",onmousemove)
//   gElCanvas.addEventListener("mousedown",onmousedown)
// }

function onDrawText(text, lineNum = 0) {
  // getSelectedLine(lineNum)
  gCurrText = document.querySelector(`.text-${lineNum}`);
  console.log(lineNum);
  drawText(text);
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

function onChangeTextColor(textColor) {
  gCurrColor = textColor + "";

  gCtx.strokeStyle = gCurrColor;
  gCtx.fillStyle = gCurrColor;

  drawText(gCurrText);
}

function onChangeTextSize(textSize) {
  if (!gCurrText) return;
  var adjustFontSize = 15;
  if (textSize === "A+") {
    gCurrTextSize += adjustFontSize;
    gCtx.fontSize = gCurrTextSize;
  } else if (textSize === "A-") {
    gCurrTextSize -= adjustFontSize;
  }
  drawText(gCurrText);
}

function onAddLine(a, b) {

  var aa = document.querySelector(".input-container");
  var str = `<input type="text" class="text" placeholder="Enter text" oninput="onDrawText(this.value)" /><span>X</span>`;
  aa.innerHTML += str;
}

// function renderImages() {
//   var strHtml = "";
//   for (var i = 1; i < gImgs.length; i++) {
//     strHtml += `<img class="image image${i}" data-selectedImgId=${i} onclick="getCurrMeme(this)" src="js/src/${i}.jpg">`;
//   }
//   var gridContainer = document.querySelector(".gallery-container");
//   gridContainer.innerHTML = strHtml;
// }
