var gameArr = new Array(100);
for (var i = 0; i<gameArr.length; i++){
    if (i%7 == 2 || i%4 == 2){
        gameArr[i] = 0;
    } else {
        gameArr[i] = 1;
    }
}
var count = 0
for (var i = 0; i<gameArr.length; i++){
    if (gameArr[i] == 0){
        count++;
    }
}
console.log(count);
var index = 0;
var sound = new Audio("Mariokart.mp3");
var i = 0;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ctx1 = canvas.getContext("2d");

ctx.fillStyle = "#222";
ctx.strokeStyle="#111";
ctx.lineWidth=6;
ctx.strokeRect(0,0,90,140);
ctx.fillRect(4,4,82,132);

function reset(){
    sound.play();
    var changeColors = window.setInterval(function(){
        colors = ["red", "yellow", "green"];
        pos_x=[45, 45, 45];
        pos_y=[30, 70, 110];

        if (i < 3){
            // $("#stoplight").css("background-color", colors[i]);
            ctx1.fillStyle="#222";
            ctx1.fill();
            ctx.strokeStyle=colors[i];
            ctx.strokeRect(0,0,90,140);
            ctx1.beginPath();
            ctx1.arc(pos_x[i],pos_y[i],20,0,Math.PI*2,true);
            ctx1.closePath();
            ctx1.fillStyle=colors[i];
            ctx1.strokeStyle="#222";
            ctx1.fill();
            ctx1.stroke();
            i += 1;
        }
        else {
            window.clearInterval(changeColors);
            $('#spacebar').empty();
            $("#spacebar").append("Hit the spacebar!");
        }
    }, 830);
}

$(function(){
    $(document).keypress(function(e){
        if (e.keyCode == 32 && i > 2){
            console.log("Spacebar hit");
            console.log(index);
            if (gameArr[index] == 1){
                $('#spacebar').empty();
                $("#spacebar").append("You win!");
                console.log()
                // $("#stoplight").css("background-color", "red");
                ctx1.fillStyle="#222";
                ctx1.strokeStyle="#222";
                ctx1.fill();
                ctx1.stroke();
                ctx.fillStyle = "#222";
                ctx.strokeStyle="#222";
                ctx.lineWidth=6;
                ctx.strokeRect(0,0,90,140);
                ctx.fillRect(4,4,82,132);
                index++;
                i = 0;
                console.log("win");
                prompt();
                reset();
            } else {
                $('#spacebar').empty();
                $("#spacebar").append("You lost!");
                // $("#stoplight").css("background-color", "red");
                ctx1.fillStyle="#222";
                ctx1.strokeStyle="#222";
                ctx1.fill();
                ctx1.stroke();
                ctx.strokeStyle="#111";
                ctx.lineWidth=6;
                ctx.strokeRect(0,0,90,140);
                ctx.fillRect(4,4,82,132);
                index++;
                i = 0;
                console.log("lose");
                prompt();
                reset();
            }
        }
    })
})

function loading() {
    setTimeout(reset, 12000);
    setTimeout(changeLoad, 7000);
    setTimeout(foundOpponent, 12000);
}

function changeLoad() {
    document.getElementById("searching").style.display = "none";
    document.getElementById("loader").style.display = "none";
    document.getElementById("foundOpponent").style.display = "block";
    document.getElementById("countDown").style.display = "block";
    var count = 5;
    document.getElementById("countDown").innerHTML = count;
    count--;
    var x = setInterval(function() {
        document.getElementById("countDown").innerHTML = count;
        count--;
        if (count <= 0){
            clearInterval(x);
        }
    }, 1000);
}

function foundOpponent() {
    document.getElementById("foundOpponent").style.display = "none";
    document.getElementById("countDown").style.display = "none";
    document.getElementById("game").style.display = "block";
}