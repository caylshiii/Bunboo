const frontBtn = document.getElementById('down');
const backBtn = document.getElementById('up');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const scaleX = 0.7125;
const scaleY = 0.25;
let width = 400;
let height = 660;
const scaledWidth = width * scaleX;
const scaledHeight = height * scaleY;

const cycleLoop = [0, 1, 2];
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = canvas.width / 30;
let positionY = -10;
let facePosition = 0 // 0 = front, 1 = back, 2 = left, 3 = right

let img = new Image();

function loadImage() {
    img.src = 'images/bunboo.png';
    img.onload = function() {
        init();
      };
  }

loadImage();

frontBtn.addEventListener('click', (e) => {
  e.currentTarget.classList.add('active-down');
  backBtn.classList.remove('active-up');
  leftBtn.classList.remove('active-left');
  rightBtn.classList.remove('active-right');

  facePosition = 0;

});

backBtn.addEventListener('click', (e) => {
  e.currentTarget.classList.add('active-up');
  frontBtn.classList.remove('active-down');
  leftBtn.classList.remove('active-left');
  rightBtn.classList.remove('active-right');
  
  facePosition = 1;
});

rightBtn.addEventListener('click', (e) => {
  e.currentTarget.classList.add('active-right');
  leftBtn.classList.remove('active-left');
  frontBtn.classList.remove('active-down');
  backBtn.classList.remove('active-up');
  facePosition = 2;
});

leftBtn.addEventListener('click', (e) => {
  e.currentTarget.classList.add('active-left');
  rightBtn.classList.remove('active-right');
  frontBtn.classList.remove('active-down');
  backBtn.classList.remove('active-up');
  facePosition = 3;
})

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
  drawFrame(cycleLoop[currentLoopIndex], facePosition, positionX, positionY);
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