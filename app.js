const c=document.getElementById("canvas");
var ctx=c.getContext("2d");
var floorPlan=new Image(100, 200);
window.onload = function() {
    floorPlan.src = 'floor.jpg';
    floorPlan.onload = function(){
        render();
    }
    //console.log("test");
}

class room {
    constructor(x,y,endX,endY,roomName) {//xy is top left. endx and endy is bottom right
        this.x = x;
        this.y = y;
        this.endX = endX;
        this.endY = endY;
        this.roomName = roomName;
        this.floor = Number(roomName.substring(1,2));
        this.hall = Number(roomName.substring(0,1));
    }
    draw(){
        ctx.rect(this.x, this.y-offy, this.endX-this.x, this.endY-this.y);
        ctx.stroke();
    }
    alt(names){
        this.altName = names;
    }
    match(search){
        if(this.altName != null){
            for(var i=0; i!=this.altName.length;i++){
                if (search == this.altName[i]){
                    return true;
                }
            }
        }
        return false;
    }
}

var rooms = [];
rooms.push(new room(317, 344, 348, 364, "C100"));
rooms.push(new room(317, 365, 348, 395, "C102"));
rooms.push(new room(317, 396, 348, 419, "C104"));
rooms.push(new room(357, 343, 393, 357, "C101"));
rooms.push(new room(357, 372, 393, 387, "C103"));
rooms.push(new room(357, 401, 393, 416, "C100"));//bottom right
rooms.push(new room(248, 379, 261, 390, "A101"));
rooms.push(new room(307, 304, 332, 336, "B108"));
rooms.push(new room(283, 300, 305, 336, "B107"));
rooms.push(new room(255, 300, 275, 337, "B105"));
rooms.push(new room(276, 326, 282, 335, "B106"));
rooms.push(new room(415, 405, 432, 418, "E100"));
rooms.push(new room(415, 390, 432, 404, "E102"));
rooms.push(new room(439, 390, 454, 404, "E103"));
rooms.push(new room(439, 405, 454, 418, "E101"));
rooms.push(new room(220, 353, 240, 370, "B103"));
rooms.push(new room(206, 353, 219, 370, "B106"));
rooms.push(new room(428, 491, 459, 537, "D106"));//Music Room
rooms[rooms.length-1].alt(["Music Room"]);
rooms.push(new room(141, 354, 197, 391, "F101"));
rooms[rooms.length-1].alt(["Red Cafeteria"]);
rooms.push(new room(198, 464, 142, 428, "F100"));
rooms[rooms.length-1].alt(["Blue Cafeteria"]);

let guidance = new room(249, 420, 340, 448, "D102");
guidance.alt(["SPS","Guidance"]);
rooms.push(guidance);





var floor = 1;
let offy = 250;
function render(){
        ctx.drawImage(floorPlan, 0, -offy, 500,700);
    
        ctx.beginPath();
        ctx.arc(100, 100, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        for(var i = 0; i!=rooms.length;i++){
            if(rooms[i].floor==floor){
                rooms[i].draw();
            }
        }
        //room(317,364,350,396);
}

c.addEventListener('mousemove', event =>
{
    var x = event.clientX;
    var y = event.clientY;
    //x -= parseFloat(style['padding-left'].replace('px'));
    //y -= parseFloat(style['padding-top'].replace('px'));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    render();
    ctx.fillRect(x, y, 10, 10);
    //console.log("("+x+", "+y+")");
});
var first = true;
var oldX;
var oldY;
c.addEventListener('click', event =>
{
    var x = event.clientX;
    var y = event.clientY+offy;
    if(first){
        oldX = x;
        oldY = y;
        first = false;
    }else{
        console.log("rooms.push(new room("+oldX+", "+oldY+", "+ x + ", " + y+", \"\"));");
        rooms.push(new room(oldX, oldY, x, y, "T1ST"));
        first = true;
    }
    render();
});