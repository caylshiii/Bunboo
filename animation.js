const frontBtn = document.getElementById('down');
const backBtn = document.getElementById('up');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const container = document.querySelector('.container');


let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const scaleX = 0.7125;
const scaleY = 0.25;
let width = 400;
let height = 660;
const scaledWidth = width * scaleX;
const scaledHeight = height * scaleY;

let cycleLoop = [0, 1, 2];
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = canvas.width / 30;
let positionY = -8;
let facePosition = 0 // 0 = front, 1 = back, 2 = left, 3 = right

let img = new Image();

function loadImage() {
    img.src = 'images/bunboo.png';
    img.onload = function() {
        drawFrame(0, facePosition, positionX, positionY);
      };
  }

loadImage();

container.addEventListener('click', (e) => {
  e.stopPropagation();
  stopAnimation();
  backBtn.classList.remove('active-up');
  leftBtn.classList.remove('active-left');
  rightBtn.classList.remove('active-right');
  frontBtn.classList.remove('active-down');

})

frontBtn.addEventListener('click', (e) => {
  startAnimation();
  e.stopPropagation();
  e.currentTarget.classList.toggle('active-down');
  backBtn.classList.remove('active-up');
  leftBtn.classList.remove('active-left');
  rightBtn.classList.remove('active-right');

  facePosition = 0;

});

backBtn.addEventListener('click', (e) => {
  startAnimation();
  e.stopPropagation();
  e.currentTarget.classList.toggle('active-up');
  frontBtn.classList.remove('active-down');
  leftBtn.classList.remove('active-left');
  rightBtn.classList.remove('active-right');
  
  facePosition = 1;
});

rightBtn.addEventListener('click', (e) => {
  startAnimation();
  e.stopPropagation();
  e.currentTarget.classList.toggle('active-right');
  leftBtn.classList.remove('active-left');
  frontBtn.classList.remove('active-down');
  backBtn.classList.remove('active-up');
  facePosition = 2;
});

leftBtn.addEventListener('click', (e) => {
  startAnimation();
  e.stopPropagation();
  e.currentTarget.classList.toggle('active-left');
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

let animation;
let animating = false;

function animationLoop() {
  if(animating) {
    frameCount += 4;
    if (frameCount < 24) {
      window.requestAnimationFrame(animationLoop);
      return;
    }
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(cycleLoop[currentLoopIndex], facePosition, positionX, positionY);
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
      currentLoopIndex = 0;
    }
   animation = window.requestAnimationFrame(animationLoop);
  }
}

function stopAnimation() {
  if(animating){
    animating = false;
    window.cancelAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFrame(0, 0, positionX, positionY);
    console.log("stopped");
  }
}

function startAnimation() {
  if(!animating) {
    animating = true;
    animationLoop();
    console.log("started");
  }
}