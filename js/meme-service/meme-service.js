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
        color: gCurrColor,
        x: 225,
        y: 50,
      },
    ],
  };

  currImage.src = gImgs[gMeme.selectedImgId].url;
  managePageDisplay("Memes");
}

function drawText(text) {
  console.log(gMeme);
  console.log(gCurrLine);
  var { x, y } = gMeme.lines[gCurrLine];
  // var currLine = gMeme.selectedLineIdx;
  // gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  gCtx.drawImage(currImage, 0, 0, gElCanvas.width, gElCanvas.height);

  gCtx.lineWidth = 2;
  gCtx.strokeStyle = gCurrColor;
  gCtx.fillStyle = gCurrColor;
  gCtx.font = `${gCurrTextSize}px Arial`;
  gCtx.textAlign = "center";
  gCtx.textBaseline = "middle";

  gMeme.lines[gMeme.selectedLineIdx].txt = text;

  getText(x, y);
}

function downloadCanvas(elLink) {
  const data = gElCanvas.toDataURL();
  elLink.href = data;
}

function addLine() {
  
  var { y } = gMeme.lines[gMeme.lines.length - 1];
  if (y > 350) {
    y = 350;
  }

  gMeme.selectedLineIdx = gMeme.selectedLineIdx + 1;
  gMeme.lines.push({
    txt: "",
    size: 20,
    color: gCurrColor,
    x: 225,
    y: y + 50,
  });
  console.log(gMeme);
  drawText("Text");
}

function getText(x, y) {
  return gMeme.lines.forEach((meme) => {
    gCtx.fillText(meme.txt, meme.x, meme.y);
    gCtx.strokeText(meme.txt, meme.x, meme.y);
  });
}
