let gElCanvas;
let gCtx;
let currImage;
let gCurrText;
let images;
let gCurrLine;

var isDragging = false;
var startX, startY;

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

    addEvenetlisteners();
  };
}

function addEvenetlisteners() {
  gElCanvas.addEventListener("mousedown", handleMouseDown);
  gElCanvas.addEventListener("mousemove", handleMouseMove);
  gElCanvas.addEventListener("mouseup", handleMouseUp);
  gElCanvas.addEventListener("click", handleMouseClick);
}

function handleMouseClick(ev) {
  var offsetX = ev.offsetX;
  var offsetY = ev.offsetY;

  for (var i = 0; i < gMeme.lines.length; i++) {
    var line = gMeme.lines[i];
    var { x, y } = line;

    gCtx.font = `${line.size}px Arial`;
    var textWidth = gCtx.measureText(line.txt).width;
    var textHeight = line.size;

    var padding = 10;
    var rectWidth = textWidth + padding * 2;
    var rectHeight = textHeight + padding * 2;
    var rectX = x - rectWidth / 2;
    var rectY = y - rectHeight / 2;

    if (
      offsetX >= rectX &&
      offsetX <= rectX + rectWidth &&
      offsetY >= rectY &&
      offsetY <= rectY + rectHeight
    ) {
      gCurrLine = i;
      gMeme.selectedLineIdx = gCurrLine;
      drawText();
      break;
    } else {
      removeCanvasBorder();
    }
  }
}

function handleMouseDown(e) {
  var { x, y } = gMeme.lines[gCurrLine];
  startX = e.clientX - gElCanvas.offsetLeft - x;
  startY = e.clientY - gElCanvas.offsetTop - y;
  isDragging = true;
}

function handleMouseMove(e) {
  if (!isDragging) return;

  var offsetX = e.offsetX;
  var offsetY = e.offsetY;

  gMeme.lines[gCurrLine].x = offsetX;
  gMeme.lines[gCurrLine].y = offsetY;

  drawText();
}

function handleMouseUp() {
  isDragging = false;
}

function onDrawText(text) {
  gMeme.lines[gCurrLine].txt = text;
  drawText();
}

function onChangeTextColor(textColor) {
  changeTextColor(textColor);
}

function onChangeTextSize(textSign) {
  changeTextSize(textSign);
}

function onAddLine() {
  var input = document.querySelector(".text");
  gCurrText = gMeme.lines[gCurrLine].txt;
  input.value = gCurrText;
  console.log(gCurrText);
  gCurrLine += 1;
  addLine();
}

function onSwitchLines() {
  gCurrLine += 1;
  if (gCurrLine > gMeme.lines.length - 1) gCurrLine = 0;
  gMeme.selectedLineIdx = gCurrLine;

  drawText(gMeme.lines[gCurrLine].txt);
}

function getFirstMeme() {
  gMeme = {
    selectedImgId: `js/src/1.jpg`,
    selectedLineIdx: 0,
    lines: [
      {
        txt: "",
        size: 30,
        color: "white",
        x: 225,
        y: 50,
      },
    ],
  };
}
