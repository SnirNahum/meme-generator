// var gImgs = [{ id: 1, url: "img/1.jpg", keywords: ["funny", "cat"] }];
// var gMeme = {
//   selectedImgId: 5,
//   selectedLineIdx: 0,
//   lines: [{ txt: "I sometimes eat Falafel", size: 20, color: "red" }],
// };
var globalId = 0;
var gImgs = [];
function insertImages() {
  var images = [];
  for (var i = 1; i <= 20; i++) {
    images.push(`js/src/${i}.jpg`);
    // gImgs.push = createImages(i);
  }
  console.log(gImgs);
  return images;
}

// function createImages(imgIdx) {
//   gImgs = {
//     id: globalId + 1,
//     url: `js/src/${imgIdx}.jpg`,
//   };
//   return gImgs
// }
