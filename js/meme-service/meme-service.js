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

function getCurrMeme(image) {
  gMeme = {
    selectedImgId: image.dataset.selectedimgid,
    selectedLineIdx: 0,
    lines: [
      {
        txt: "",
        size: 20,
        color: "red",
        x: 225,
        y: 50,
      },
    ],
  };
  currImage.src = gImgs[gMeme.selectedImgId].url
}

function drawText(text) {
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = "brown";
  gCtx.fillStyle = "black";
  gCtx.font = "40px Arial";
  gCtx.textAlign = "center";
  gCtx.textBaseline = "middle";
  x = gElCanvas.width / 2;
  y = gElCanvas.height / 4;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
  
}
