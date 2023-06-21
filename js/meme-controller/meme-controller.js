let gElCanvas;
let gCtx;
let currImage;
let gCurrText;
let images;
let gCurrTool;
const TOUCH_EVS = ["touchstart", "touchmove", "touchend"];

function onInit() {
  gElCanvas = document.querySelector(".meme-canvas");
  gCtx = gElCanvas.getContext("2d");

  currImage = new Image();
  currImage.src = `${gImgs[1].url}`;

  renderImages() 

  currImage.onload = () => {
    gElCanvas.height =
      (currImage.naturalHeight / currImage.naturalWidth) * gElCanvas.width;
    gCtx.drawImage(currImage, 0, 0, gElCanvas.width, gElCanvas.height);
  };
}
function onDrawText(text) {

    gCurrText = document.querySelector(".text");
    drawText(text);
  
  
}

