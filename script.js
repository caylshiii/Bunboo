const timer = document.getElementById("timer");
const bunboo = document.getElementById("bunboo")
const btn = document.getElementById("btn");

let time = parseInt(timer.innerHTML);

const countDown = () => {
    btn.innerHTML = "Counting down";
    
    const count = setInterval(() => {
        if (time > 0) {
            time--;
            timer.innerHTML = time;
        }
        
        if (time === 0) {
            clearInterval(count);
        console.log("Time is over");
        bunboo.style.color = "red";
        btn.innerHTML = "Restart?";
        
    }
    
}, 1000);
}
btn.addEventListener("click", (e) => {
    if (time === 0) {
        timer.innerHTML = "3";
        time = parseInt(timer.innerHTML);
        bunboo.style.color = "black";
        btn.innerHTML = "Start";
    }else{
        countDown();
    }
});