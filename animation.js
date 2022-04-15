let img = new Image();

function loadImage() {
    img.src = 'images/bunboo-right.png';
    img.onload = function() {
        init();
      };
  }

loadImage();

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const scale = 0.2;
const width = 350;
const height = 790;
const scaledWidth = width * scale;
const scaledHeight = height * scale;

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img,
                  frameX * width, frameY * height, width, height,
                  canvasX, canvasY, scaledWidth, scaledHeight);
  }

function init() {
    drawFrame(0, 0, 0, 0);
    drawFrame(1, 0, scaledWidth, 0);
    drawFrame(0, 0, scaledWidth * 2, 0);
    drawFrame(2, 0, scaledWidth * 3, 0);
}

const cycleLoop = [0, 1, 2];
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = canvas.width / 2.5;

function step() {
  // positionX += 3
  frameCount += 1;
  if (frameCount < 10) {
    window.requestAnimationFrame(step);
    return;
  }
  frameCount = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(cycleLoop[currentLoopIndex], 0, positionX, 0);
  currentLoopIndex++;
  if (currentLoopIndex >= cycleLoop.length) {
    currentLoopIndex = 0;
  }
  // if (positionX > 500) {
  //   positionX = -10;
  // }
  window.requestAnimationFrame(step);
}

function init() {
    window.requestAnimationFrame(step);
  }