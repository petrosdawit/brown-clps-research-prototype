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
var i = 0

function reset(){
    sound.play();
    var changeColors = window.setInterval(function(){
        colors = ["red", "yellow", "green"];
        if (i < 3){
            $("#stoplight").css("background-color", colors[i]);
            i += 1;
        }
        else {
            window.clearInterval(changeColors);
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
                console.log()
                $("#stoplight").css("background-color", "red");
                index++;
                i = 0;
                console.log("win");
                prompt();
                $('#spacebar').remove();
                reset();
                // $('#spacebar').remove();
            } else {
                $("#spacebar").append("You lost!");
                $("#stoplight").css("background-color", "red");
                index++;
                i = 0;
                console.log("lose");
                prompt();
                $('#spacebar').remove();
                reset();
                // $('#spacebar').remove();
            }
        }
    })
})

function loading() {
    setTimeout(reset, 13000);
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

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#222";
ctx.fillRect(0,0,80,130);

ctx.fillStyle = "#c82124"; //red
ctx.beginPath();
ctx.arc(40,25,15,0,Math.PI*2,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#E5E500"; //yellow
ctx.beginPath();
ctx.arc(40,65,15,0,Math.PI*2,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#009900"; //green
ctx.beginPath();
ctx.arc(40,105,15,0,Math.PI*2,true);
ctx.closePath();
ctx.fill();