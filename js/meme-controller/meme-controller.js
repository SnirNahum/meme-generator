let gElCanvas;
let gCtx;
let currImage;
let gCurrText;
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
    document.getElementById('image-upload').addEventListener('change', handleImageUpload);

    addEvenetlisteners();
  };
}

function addEvenetlisteners() {
  gElCanvas.addEventListener("mousedown", handleMouseDown);
  gElCanvas.addEventListener("mousemove", handleMouseMove);
  gElCanvas.addEventListener("mouseup", handleMouseUp);
  gElCanvas.addEventListener("click", handleMouseClick);
  // inputElement.addEventListener('change', handleImageUpload);

}
function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = function(e) {
    currImage.onload = function() {
      gElCanvas.height =
        (currImage.naturalHeight / currImage.naturalWidth) * gElCanvas.width;
      gCtx.drawImage(currImage, 0, 0, gElCanvas.width, gElCanvas.height);

      // Call the drawText function to draw the existing text on the canvas
      drawText();
    };
    currImage.src = e.target.result;
  };

  reader.readAsDataURL(file);
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

function handleMouseDown(ev) {
  var { x, y } = gMeme.lines[gCurrLine];
  startX = ev.clientX - gElCanvas.offsetLeft - x;
  startY = ev.clientY - gElCanvas.offsetTop - y;

  isDragging = true;
  gElCanvas.style.cursor = "grabbing";
}

function handleMouseMove(ev) {
  if (!isDragging) return;
  var offsetX = ev.offsetX;
  var offsetY = ev.offsetY;
  gMeme.lines[gCurrLine].x = offsetX;
  gMeme.lines[gCurrLine].y = offsetY;
  drawText();
}

function handleMouseUp() {
  isDragging = false;
  gElCanvas.style.cursor = "default";
}

function onDrawText(text) {
  gMeme.lines[gCurrLine].txt = text;
  drawText();
}


function onChangeTextColor(textColor) {
  changeTextColor(textColor);
}

function onChangeTextSize(elTextSize) {
  var textSign = elTextSize.dataset.val;
  changeTextSize(textSign);
}

function onAddLine() {
  var input = document.querySelector(".add-line");
  gCurrText = gMeme.lines[gCurrLine].txt;
  input.value = gCurrText;
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
