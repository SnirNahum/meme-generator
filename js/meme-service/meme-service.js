var globalId = 0;
var gImgs = createImages();
var gMeme;


function createImages() {
  var imgs = [];
  for (var i = 0; i <= 20; i++) {
    imgs.push(createImage(i));
  }

  return imgs;
}

function createImage(Idx) {
  return {
    id: globalId + 1,
    url: `js/src/${Idx}.jpg`,
  };
}

function getCurrMeme(image, gMeme) {
  gMeme = {
    selectedImgId: image.dataset.selectedimgid,
    selectedLineIdx: 0,
    lines: [
      {
        txt: "",
        size: 20,
        color: gCurrColor,
        x: 225,
        y: 50,
      },
    ],
  };

  currImage.src = gImgs[gMeme.selectedImgId].url;
  managePageDisplay("Memes");
  var { x, y } = gMeme.lines[0];
  // console.log(x);
  // console.log(y);
  // console.log(gMeme);
  // var a = {gMeme}
}

function drawText(text) {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  gCtx.drawImage(currImage, 0, 0, gElCanvas.width, gElCanvas.height);

  gCtx.lineWidth = 2;
  gCtx.strokeStyle = gCurrColor;
  gCtx.fillStyle = gCurrColor;
  gCtx.font = `${gCurrTextSize}px Arial`;
  gCtx.textAlign = "center";
  gCtx.textBaseline = "middle";

  x = gElCanvas.width / 2;
  y = gElCanvas.height / 10;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);

  gCurrText = text;
}

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL();
  elLink.href = data;
}


// function getSelectedLine(){

// }