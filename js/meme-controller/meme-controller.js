let gElCanvas;
let gCtx;
let currImage;
let images;
let gCurrTool;
const TOUCH_EVS = ["touchstart", "touchmove", "touchend"];

function onInit() {
  gElCanvas = document.querySelector(".meme-canvas");
  gCtx = gElCanvas.getContext("2d");

  images = insertImages();
  renderMames();
  currImage = new Image();
  currImage.src = `${images[0]}`;

  currImage.onload = () => {
    gElCanvas.height = (currImage.naturalHeight / currImage.naturalWidth) * gElCanvas.width;
    gCtx.drawImage(currImage, 0, 0, gElCanvas.width, gElCanvas.height);
  };
}
function onDrawText(value) {
  var text = document.querySelector(".text");
  drawText(value);
}
