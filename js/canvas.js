
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');


var mouse = {
    x: undefined,
    y: undefined
};

function Circle(x,y,dx,dy,rad){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.a = 1;

    this.draw = function (){
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI*2, false);
        c.stroke();
        c.strokeStyle = 'rgba(255,0,0,'+this.a+')';
    }

    this.update = function(){
        if (this.x + this.rad > window.innerWidth || this.x - this.rad < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.rad > window.innerHeight || this.y - this.rad < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.a = this.a-0.05;

        this.draw();
    }

}

var circleArray = [];
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    circleArray.push(new Circle(mouse.x, mouse.y,dx,dy,40));
});


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}
animate();


window.addEventListener('resize', function(){

});
