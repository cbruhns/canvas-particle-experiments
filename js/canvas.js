
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var colors = ['FFBC67','DA727E','AC6C82','685C79','455C7B'];
var maxRadius = 20;

var mouse = {
    x:undefined,
    y:undefined
}

function getMouse(e, c) {
    var element = c,
        offsetX = 0,
        offsetY = 0,
        mx, my;

    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    return {
        x: mx,
        y: my
    };
};



window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});


function Circle(x,y,dx,dy,rad){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.initRad = rad;
    this.color = "#" + colors[Math.floor(Math.random() * colors.length)];

    this.draw = function (){
        c.beginPath();
        c.arc(this.x, this.y, this.rad, 0, Math.PI*2, false);
        c.fill();
        c.fillStyle = this.color;
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


        // interactivity
        if(mouse.x - this.x < 50 && mouse.x -this.x > -50 && mouse.y - this.y < 50 && mouse.y -this.y > -50){
            if (this.rad < maxRadius) {
                this.rad += 1;
            }
        } else if(this.rad > this.initRad){
            this.rad -= 1;
        }

        this.draw();
    }

    function idGen() {
        var hash = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (hash()+hash()+"-"+hash()+"-"+hash()+"-"+hash()+"-"+hash()+hash()+hash());
    }
    this.id = idGen();

    this.hitTest = function (x, y) {
        var hx = x - this.x;
        var hy = y - this.y;
        return hx * hx + hy * hy <= this.rad * this.rad;
    };

}

// Delete Circle
canvas.addEventListener('click', function(event) {

   var pt = getMouse(event, canvas);
   var deleteCount = 0;
   for (var i = 0;i < circleArray.length; i++) {
       if (circleArray[i].hitTest(pt.x, pt.y)) {
           circleArray.splice(i,1);
           deleteCount++;
       }
   }
   if (deleteCount === 0) {
       var newCount = Math.floor(Math.random() * 5) + 1;
       for (var i = 0; i < newCount; i++) {
           var dx = (Math.random() - 0.5) * 2;
           var dy = (Math.random() - 0.5) * 2;
           var radius = Math.floor(Math.random() * 2)+3;
           circleArray.push(new Circle(pt.x,pt.y,dx,dy,radius));
       }
   }

}, false);




var circleArray = [];
for (var i = 0; i < 200; i++) {
    var x = Math.random() * (window.innerWidth - radius * 2) + radius;
    var y = Math.random() * (window.innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    var radius = Math.floor(Math.random() * 2)+3;
    circleArray.push(new Circle(x,y,dx,dy,radius));
}


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}
animate();


window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
