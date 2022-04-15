let img = new Image();
img.src = '/../images/link.png';
img.onload = function() {
  init();
};

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const scale = 1.5;
const width = 57.5;
const height = 64;
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

const cycleLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = -10;

function step() {
  positionX += 3
  frameCount += 3;
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
  if (positionX > 500) {
    positionX = -10;
  }
  window.requestAnimationFrame(step);
}

function init() {
    window.requestAnimationFrame(step);
  }