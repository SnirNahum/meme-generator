var globalId = 0;
var gImgs = createImages();
var gMeme;

var isDragging = false;
var startX, startY;

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
        txt: "Text",
        size: 30,
        color: "white",
        x: 225,
        y: 50,
      },
    ],
  };

  currImage.src = gImgs[gMeme.selectedImgId].url;
  managePageDisplay("Memes");
}

function drawText() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);

  gCtx.drawImage(currImage, 0, 0, gElCanvas.width, gElCanvas.height);

  for (let i = 0; i < gMeme.lines.length; i++) {
    const line = gMeme.lines[i];
    const { x, y, size, txt } = line;

    gCtx.font = `${size}px Arial`;
    gCtx.fillStyle = line.color;
    gCtx.textAlign = 'center';
    gCtx.textBaseline = 'middle';

    gCtx.fillText(txt, x, y);

    if (i === gCurrLine) {
      canvasBorder(txt, size, x, y);
    }
  }
}


function renderMeme() {
  return gMeme.lines.forEach((meme) => {
    gCtx.strokeStyle = meme.color;
    gCtx.fillStyle = meme.color;
    gCtx.font = `${meme.size}px Arial`;
    gCtx.fillText(meme.txt, meme.x, meme.y);
    gCtx.strokeText(meme.txt, meme.x, meme.y);
  });
}

function addLine() {
  var { y } = gMeme.lines[gMeme.lines.length - 1];
  if (y > 350) {
    y = 350;
  }

  gMeme.selectedLineIdx = gMeme.selectedLineIdx + 1;
  gMeme.lines.push({
    txt: "Text",
    size: 20,
    color: "white",
    x: 225,
    y: y + 50,
  });
  drawText("");
}

function changeTextSize(textSign) {
  var { size } = gMeme.lines[gCurrLine];
  var adjustFontSize = 10;

  if (textSign === "A+") {
    size += adjustFontSize;
    if (size > 100) {
      size = 100;
    }
  } else if (textSign === "A-") {
    size -= adjustFontSize;
    if (size < 20) {
      size = 20;
    }
  }
  gMeme.lines[gCurrLine].size = size;
  drawText();
}

function changeTextColor(textColor) {
  gMeme.lines[gCurrLine].color = textColor;
  drawText();
}

function downloadCanvas(elLink) {
  gCtx.clearRect(0, 0, 0, 0);
  removeCanvasBorder();
  const data = gElCanvas.toDataURL();
  elLink.href = data;
}

function canvasBorder(txt, size, x, y) {
  var textWidth = gCtx.measureText(txt).width;

  var padding = 10;
  var rectWidth = textWidth + padding * 2;
  var rectHeight = size + padding * 2;

  var rectX = x - rectWidth / 2;
  var rectY = y - rectHeight / 2;

  gCtx.strokeStyle = "black";
  gCtx.strokeRect(rectX, rectY, rectWidth, rectHeight);
}

function removeCanvasBorder() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
  gCtx.drawImage(currImage, 0, 0, gElCanvas.width, gElCanvas.height);
  renderMeme();
}