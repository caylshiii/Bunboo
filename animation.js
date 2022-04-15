const frontBtn = document.getElementById('front');
const backBtn = document.getElementById('back');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const front = {width: 400, height: 700};
const back = {width: 400, height: 680};
const side = {width: 350, height: 650};

const scale = 0.2;
let width = front.width;
let height = front.height;
const scaledWidth = width * scale;
const scaledHeight = height * scale;

const cycleLoop = [0, 1, 2];
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = 100;
let facePosition = 0 // 0 = front, 1 = back, 2 = left, 3 = right

let img = new Image();

function loadImage() {
    img.src = 'images/bunboo.png';
    img.onload = function() {
        init();
      };
  }

loadImage();

frontBtn.addEventListener('click', () => {
    facePosition = 0;
    width = front.width;
    height = front.height;
});

backBtn.addEventListener('click', () => {

    facePosition = 1;
    width = back.width;
    height = back.height;  
});

leftBtn.addEventListener('click', () => {
    facePosition = 3;
    width = side.width;
    height = side.height;
})

rightBtn.addEventListener('click', () => {
    facePosition = 2;
    width = side.width;
    height = side.height;
});

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img,
                  frameX * width, frameY * height, width, height,
                  canvasX, canvasY, scaledWidth, scaledHeight);
  }


function step() {
  // positionX += 2  
  frameCount += 1;
  if (frameCount < 8) {
    window.requestAnimationFrame(step);
    return;
  }
  frameCount = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(cycleLoop[currentLoopIndex], facePosition, positionX, 0);
  currentLoopIndex++;
  if (currentLoopIndex >= cycleLoop.length) {
    currentLoopIndex = 0;
  }
  if (positionX > 500) {
    positionX = 0;
  }
  window.requestAnimationFrame(step);
}

function init() {
    window.requestAnimationFrame(step);
  }