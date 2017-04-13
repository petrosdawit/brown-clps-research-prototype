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

//set height of game body div
var bodyheight = $(document).height()-130;
$("#gameBody").height(bodyheight);

//instructions modal 
var instModal = document.getElementById('inst');

// Get the button that opens the modal
var instBtn = document.getElementById("instBtn");

// Get the span for instructions 
var span1 = document.getElementsByClassName("close1")[0];

// Get the win modal
var winModal = document.getElementById('win');


// Get the lose modal
var loseModal = document.getElementById('lose');

//get convertModal
var convertModal = document.getElementById('convertModal');

// Get the <span> element that closes the convert modal
var span2 = document.getElementsByClassName("close2")[0];

//get keep Modal
var deductModal = document.getElementById('deductModal');

// Get the <span> element that closes the deduct modal
var span3 = document.getElementsByClassName("close3")[0];

//get the message modal
var messageModal = document.getElementById('messageModal');

// Get the <span> element that closes the message modal
var span4 = document.getElementsByClassName("close4")[0];

// When the user clicks the button, open the modal 
instBtn.onclick = function() {
    instModal.style.display = "block";
}

// When the user clicks on <span> (x), close the instructions modal
span1.onclick = function() {
    instModal.style.display = "none";
}


// When the user clicks on <span> (x), close the convert modal
span2.onclick = function() {

  convertModal.style.display = "none";

  messageModal.style.display = "block";
  
}

// When the user clicks on <span> (x), close the deduct modal
span3.onclick = function() {

  deductModal.style.display = "none";

  messageModal.style.display = "block";
  
}

// When the user clicks on <span> (x), close the messages modal
span4.onclick = function() {
    messageModal.style.display = "none";
    reset();
}
// When the user clicks anywhere outside of the modal, close it
window.onclick  = function(event) {

    if($(event.target).is('#instBtn')){
            e.preventDefault();
           
        }

    else if (event.target == instModal) {
        instModal.style.display = "none";
    }

    else if(event.target == convertModal){
        messageModal.style.display = "block";

        convertModal.style.display = "none";

        
    }else if(event.target == messageModal){
        messageModal.style.display = "none";

        reset();

    }
}

 $(document).ready(function() {
   $(window).resize(function() {
        var bodyheight = $(document).height()-130;
        var player1= bodyheight-130;
        $("#gameBody").height(bodyheight);
    }); 

   $('#spacebar').hide();

});


function reset(){
        sound.play();
        var changeColors = window.setInterval(function(){
            $('#spacebar').hide();
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
                $('#spacebar').show();
                //$("#img1").css("animation-name", "example3");
                $("#img1").css("animation-duration", 0);
                //$("#img2").css("animation-name", "example3");
                $("#img2").css("animation-duration", 0);
                //$("#spacebar").append("Hit the spacebar!");
                var hitSpace = window.setInterval(function(){
                    $('#spacebar').hide();
                }, 1000);
            }
        }, 830);

    
}


$(function(){
    $(document).keypress(function(e){
        if (e.keyCode == 32 && i > 2){
            console.log("Spacebar hit");

            $('#spacebar').hide();
            
            if (gameArr[index] == 1){
                
                
                console.log()
                $("#stoplight").css("background-color", "red");
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
                
                $("#img1").css("animation-name", "example");
                $("#img1").css("animation-duration", "4s");
                $("#img2").css("animation-name", "example2");
                $("#img2").css("animation-duration", "4s");

                window.setTimeout(function(){
                    winModal.style.display = "block";
                }, 1500);

                
                
            } else {
                $("#stoplight").css("background-color", "red");
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

                $("#img1").css("animation-name", "example2");
                $("#img1").css("animation-duration", "4s");
                $("#img2").css("animation-name", "example");
                $("#img2").css("animation-duration", "4s");

                 window.setTimeout(function(){
                    loseModal.style.display = "block";
                }, 1500);

                
                
            }
        }
    })
})

setUpInfoBar("Shanti", "Bob");


$('#submitId').on("click", sendMessage);

$("#convertBtn1").click(convertPopUp);

$("#convertBtn2").click(convertPopUp);

$("#deductBtn1").click(deductPopUp);

$("#deductBtn2").click(deductPopUp);

$("#keepBtn1").click(keepOption);

$("#keepBtn2").click(keepOption);

function setUpInfoBar(namePly, nameOpp){
    //setting up player info 
    $("#namePly").val(namePly);

    $("#usernameId").val(namePly);

    $("#tokensPly").val(0);

    $("#pointsPly").val(0);

     var tokensPly =$("#tokensPly").val();

     var pointsPly =$("#pointsPly").val();

    $("#namePly").html('<strong>'+namePly+'</strong>');

    $("#tokensPly").html('Tokens: '+'</strong>'+ tokensPly);

    $("#pointsPly").html('Points: '+'</strong>'+pointsPly);

    //seting up opponent info 

    $("#nameOpp").val(nameOpp);


    $("#tokensOpp").val(0);

    $("#pointsOpp").val(0);

    var tokensOpp =$("#tokensOpp").val();

    var pointsOpp =$("#pointsOpp").val();

    $("#nameOpp").html('<strong>'+nameOpp+'</strong>' );

    $("#tokensOpp").html('Tokens: '+  tokensOpp);

    $("#pointsOpp").html('Points: ' + pointsOpp);

}

function convertPopUp(){
    console.log("inside convert popup");

    convertModal.style.display = "block";

    loseModal.style.display = "none";

    winModal.style.display = "none";


}

function deductPopUp(){
    console.log("inside deduct popup");

    deductModal.style.display = "block";

    loseModal.style.display = "none";

    winModal.style.display = "none";

}

function keepOption(){
    console.log("inside keep popup");

    loseModal.style.display = "none";

    winModal.style.display = "none";

    messageModal.style.display = "block";

}

function sendMessage(event) {

        
        event.preventDefault();
          
          var username =  $('#usernameId').val();
          var message = $('#messageId').val();

          console.log(message);

          //clear the message input
          $('#messageId').val('');

          var li = $('<li></li>');

          li.html('<span style="font-weight:bold; color:red;"">' + username + '</span>: ' + message);
         

          $("#messagesList").append(li);

}

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