let gElCanvas;
let gCtx;
let currImage;
let gCurrText;
let images;
let gCurrColor;
let gCurrTextSize;
let gCurrLine;
// let textColor;
var as = 4;
const TOUCH_EVS = ["touchstart", "touchmove", "touchend"];

function onInit() {
  gCurrColor = "#ffffff";
  gCurrTextSize = 30;
  gCurrLine = 0;

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

function onDrawText(text) {
  drawText(text);
}

function onChangeTextColor(textColor) {
  gCurrColor = textColor + "";

  gCtx.strokeStyle = gCurrColor;
  gCtx.fillStyle = gCurrColor;

  if (!gCurrText) return;
  drawText(gCurrText);
}

function onChangeTextSize(textSize) {
  console.log(gCurrTextSize);
  if (!gCurrText) return;

  var adjustFontSize = 10;
  if (gCurrTextSize > 100) {
    gCurrTextSize = 100;
  }
  if (textSize === "A+") {
    gCurrTextSize += adjustFontSize;
    gCtx.fontSize = gCurrTextSize;
  } else if (textSize === "A-") {
    if (gCurrTextSize <= 40) {
      gCurrTextSize = 40;
    }
    gCurrTextSize -= adjustFontSize;
  }
  drawText(gCurrText);
}

function onAddLine() {
  addLine();
}

function onSwitchLines() {
  gCurrLine += 1;
  if (gCurrLine > gMeme.lines.length - 1) gCurrLine = 0;
  gMeme.selectedLineIdx = gCurrLine;
  drawText(gMeme.lines[gCurrLine].txt);
}
