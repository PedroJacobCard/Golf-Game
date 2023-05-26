const timer = document.getElementById('timer');
const canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d');
var x = window.innerWidth / 2;
var y = window.innerHeight / 2;
const size = 10;
let count = 30;
if(window.innerWidth > 425){
    count = 40;
}
let score = 0;

window.onload = function(){
alert('In this game you can use the keys "WASD" or move the mouse on the screen to give directions to the ball.');
}

const interval = setInterval(() => {
    timer.innerHTML = `${count--}`;
    if(count < 5){
        timer.style.color = 'red';
    }
    if(count <= -1){
        location.reload();
    }
}, 1000);
 
const field = {
    w: canvas.width = window.innerWidth,
    h: canvas.height = window.innerHeight,
    set: function(){
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, this.w, this.h);
    }
}

const ball = {
    x: x,
    y: y,
    size: size,
    setBall: function(){
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    },
}

document.addEventListener('mousemove', () => {
    if(event.clientX > field.w / 2){
        ball.x+= 2;
    } else {
        ball.x-= 2;
    } 

    if(event.clientY > field.h / 2) {
        ball.y += 2;
    } else {
        ball.y -= 2;
    }
});

document.addEventListener('keydown', (e) => {
    if(e.key === 'd'){
        x+=5 
        if(x > field.w){
            x = 1;
        }
    } else if(e.key === 'a'){
        x-=5
        if(x < 0){
            x = window.innerWidth;
        }
    } else if(e.key === 'w'){
        y-=5
        if(y < 0){
            y = window.innerHeight;
        }
    } else if(e.key === 's'){
        y+=5
        if(y > field.h){
            y = 1;
        }
    }
        ball.x = x;
        ball.y = y;
});


function random(num){
    return Math.floor(Math.random() * (num + 1))
}

const hole = {
    x: random(window.innerWidth),
    y: random(window.innerHeight),
    size: 15,
    set: function(){
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        this.newDir();
    },
    newDir: function(){
        if(ball.x >= this.x - this.size && ball.x <= this.x + this.size &&
        ball.y >= this.y - this.size && ball.y <= this.y + this.size){
            this.x = random(window.innerWidth);
            if(this.x + this.size > field.w){
            this.x -= 5;
        } else if(this.x - this.size < 0){
            this.x += 5;
        }
            this.y = random(window.innerHeight);
            if(this.y - this.size < 0){
            this.y += 5;
        } else if(y + ball.size > field.h){
            this.y -= 5;
        }
            score++;
        }
    }
}

const theScore = {
    set: function(){
        ctx.font = 'bold 72px Bruno Ace serif';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(score, field.w / 4 + field.w / 2, 50)
    }
}

function draw(){
    field.set();
    theScore.set();
    hole.set();
    ball.setBall();
}

window.animateFrame = (function(){
    return (
        window.requestAnimationFrame ||                   
        window.webkitRequestAnimationFrame ||
        window.mozResquestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        }
        )
    }) ()
    
    function main() {
        animateFrame(main)
        draw();
}
main();