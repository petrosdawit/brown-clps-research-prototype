var socket = io.connect();
var numRounds = 7;
var round = 1;
var gameArr = new Array(numRounds);
//keeps track of who is supposed to win each round
for (var i = 0; i<gameArr.length; i++){
    if (i%3== 0 || i%7 == 0 || i%10 == 0){
        gameArr[i] = 0;
    } else {
        gameArr[i] = 1;
    }
}
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

var messageModal = document.getElementById('messageModal');

// Get the <span> element that closes the message modal
var span4 = document.getElementsByClassName("close4")[0];

var tokenModal = document.getElementById('tokenModal');

// Get the <span> element that closes the message modal
var span5 = document.getElementsByClassName("close5")[0];

var tokenBtn1 = document.getElementById("tokenBtn1");

var tokenBtn2 = document.getElementById("tokenBtn2");

var resultModal = document.getElementById('resultModal');

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

tokenBtn1.onclick = function() {
    tokenModal.style.display = "block";
}

tokenBtn2.onclick = function() {
    tokentModal.style.display = "block";
}
// When the user clicks on <span> (x), close the messages modal
span5.onclick = function() {
    tokenModal.style.display = "none";

}


// When the user clicks anywhere outside of the modal, close it
window.onclick  = function(event) {

    if($(event.target).is('#instBtn')){
            event.preventDefault();

        }

    else if (event.target == instModal) {
        instModal.style.display = "none";
    }

    else if(event.target == convertModal){
        messageModal.style.display = "block";

        convertModal.style.display = "none";


    } else if(event.target == messageModal){
        messageModal.style.display = "none";

        reset();

    } else if(event.target == tokenModal){
         tokenModal.style.display = "none";
    }
}


//variables for game

 $(document).ready(function() {
    $('#gameBody').css('background', 'url(../images/backgroundTrack.png) no-repeat center center');
    $('#gameBody').css('background-size', '100% 100%');
 
    var time = 0;

    function addinc(){
        time += 1;
        console.log(time);
        if (time == 60) {
            $('#gameBody').css('background', 'url(../images/backgroundTrack.png) no-repeat center center');
            $('#gameBody').css('background-size', '100% 100%');      
        }
        if (time == 120) {
            $('#gameBody').css('background', 'url(../images/backgroundTrack2.png) no-repeat center center');
            $('#gameBody').css('background-size', '100% 100%');         
        }
        if (time == 180) {
            $('#gameBody').css('background', 'url(../images/backgroundTrack3.png) no-repeat center center');
            $('#gameBody').css('background-size', '100% 100%');         
        }
        if (time == 240) {
            $('#gameBody').css('background', 'url(../images/backgroundTrack4.png) no-repeat center center');
            $('#gameBody').css('background-size', '100% 100%');         
            time = 0;
        }

    }

    var clockint = setInterval(addinc, 1000)
   $(window).resize(function() {
        var bodyheight = $(document).height()-130;
        var player1= bodyheight-130;
        $("#gameBody").height(bodyheight);
    });

   $('#spacebar').hide();

   //Let the server know you are on game apge
   socket.emit('gameStart', {});
   // Receive the userid and username of current player
   socket.on('names', function(data){
        $("#namePlyWin").html(data.username);
        $("#namePlyLose").html(data.username);
        $("#nameOppWin").html(data.compName);
        $("#nameOppLose").html(data.compName);
        console.log(data.username);
        console.log(data.userid);
        setUpInfoBar(data.username, data.compName);
   });
   //Display computer messages sent at specific rounds
   socket.on('sendCompMessage', function(data){
        console.log(data);
        var li = $('<li></li>');
        li.html('<span style="font-weight:bold; color:red;"">' + data.compName + '</span>: ' + data.message);
        $("#messagesList").append(li);
   });

});
var autoloss = null;
/* Resets the gamepage to get ready for next round */
function reset(){
        $("#PlyInfo").show();
        $("#OppInfo").show();
        //sound.play();
        var changeColors = window.setInterval(function(){
            $('#spacebar').hide();
            colors = ["red", "yellow", "green"];
            pos_x=[45, 45, 45];
            pos_y=[30, 70, 110];
            // Stoplight color switcher
            if (i < 3){
                ctx1.fillStyle = "#222";
                ctx1.fill();
                ctx.strokeStyle = colors[i];
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

                $("#img1").css("animation-name", "example3_img1");
                $("#img1").css("animation-duration", 0);
                $("#img2").css("animation-name", "example3_img2");
                $("#img2").css("animation-duration", 0);
                //$("#spacebar").append("Hit the spacebar!");
                var hitSpace = window.setInterval(function(){
                    $('#spacebar').hide();
                }, 1000);
                autoloss = setTimeout(function(){
                    console.log(autoloss);
                    lost()},3000);
            }
        }, 830);



}

function lost(){
    console.log("Computer wins!");
    //Subtract 100 points from player
    if($("#pointsPly").val()>=100){
        var newval = $("#pointsPly").val()-100;
        $("#pointsPly").val(newval);

        $("#deduction").html('Your opponenet has deducted 100 points')

    }

    var oppTokens = $("#tokensOpp").val() +1;

    $("#tokensOpp").val(oppTokens);

    // if(round%3==0){
    //     var oppPoints = $("#pointsOpp").val();

    //     $("#pointsOpp").val(oppPoints + 100);
    //     $("#tokensOpp").val(oppTokens-1);
    //     // $("#tokensOppLose").html('Tokens: '+'</strong>'+ $("#tokensOpp").val() + "/5");
    //     // $("#pointsOppLose").html('Points: '+'</strong>'+ $("#pointsOpp").val());
    // }




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

    $("#img1").css("animation-name", "example2_img1");
    $("#img1").css("animation-duration", "4s");
    $("#img2").css("animation-name", "example_img2");
    $("#img2").css("animation-duration", "4s");

    var $element = $('#img1').bind('webkitAnimationEnd', function(){
                    this.style.webkitAnimationName = '';
                });

    var $element2 = $('#img2').bind('webkitAnimationEnd', function(){
                    this.style.webkitAnimationName = '';
                });

     window.setTimeout(function(){
        // Update player score
        $("#pointsPly").html('Points: '+'</strong>'+ $("#pointsPly").val());
        $("#PlyInfo").hide();
        $("#OppInfo").hide();

        $("#tokensPlyLose").html('Tokens: '+'</strong>'+ $("#tokensPly").val() + "/5");
        $("#pointsPlyLose").html('Points: '+'</strong>'+ $("#pointsPly").val());
        $("#tokensOppLose").html('Tokens: '+'</strong>'+ $("#tokensOpp").val() + "/5");
        $("#pointsOppLose").html('Points: '+'</strong>'+ $("#pointsOpp").val());

        if ($("#tokensPly").val()==5){
            $("#keepBtn2").hide();
        }else{
            $("#keepBtn2").show();
        }

        console.log($("#pointsOpp").val());
        if ($("#pointsOpp").val()==0){

            $("#deductBtn2").hide();
        }else{
            $("#deductBtn2").show();
        }

        loseModal.style.display = "block";
        t0 = performance.now();
    }, 1500);
}
$(function(){
    $(document).keypress(function(e){
        // If spacebar is hit
        if (e.keyCode == 32 && i > 2){
            console.log("Spacebar hit");
            window.clearInterval(autoloss);
            $('#spacebar').hide();
            // If user wins the round
            if (gameArr[round] == 1){
                // Give user an extra token
                $("#tokensPly").val($("#tokensPly").val()+1);

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

                $("#img1").css("animation-name", "example_img1");
                $("#img1").css("animation-duration", "4s");
                $("#img2").css("animation-name", "example2_img2");
                $("#img2").css("animation-duration", "4s");

                var $element = $('#img1').bind('webkitAnimationEnd', function(){
                    this.style.webkitAnimationName = '';
                });

                var $element2 = $('#img2').bind('webkitAnimationEnd', function(){
                    this.style.webkitAnimationName = '';
                });

                window.setTimeout(function(){
                    //Update player tokens


                    $("#tokensPly").html('Tokens: '+'</strong>'+ $("#tokensPly").val() + "/5");
                    $("#PlyInfo").hide();
                    $("#OppInfo").hide();

                    $("#tokensPlyWin").html('Tokens: '+'</strong>'+ $("#tokensPly").val() + "/5");
                    $("#pointsPlyWin").html('Points: '+'</strong>'+ $("#pointsPly").val());
                    $("#tokensOppWin").html('Tokens: '+'</strong>'+ $("#tokensOpp").val() + "/5");
                    $("#pointsOppWin").html('Points: '+'</strong>'+ $("#pointsOpp").val());


                  if ($("#tokensPly").val()==5){
                        $("#keepBtn1").hide();
                    }else{
                        $("#keepBtn1").show();
                    }

                    if ($("#pointsOpp").val()==0){
                        $("#deductBtn1").hide();
                    }else{
                        $("#deductBtn1").show();
                    }

                    winModal.style.display = "block";
                    t0 = performance.now();
                }, 1500);



            } else {
                //Computer wins
                lost();




            }
        }
    })
})



/* Click event handlers */
$('#submitId').on("click", sendMessage);

$("#convertBtn1").click(convertPopUp);

$("#convertBtn2").click(convertPopUp);

$("#deductBtn1").click(deductPopUp);

$("#deductBtn2").click(deductPopUp);

$("#keepBtn1").click(keepOption);

$("#keepBtn2").click(keepOption);

$("#chartlink").click(tokenPopUp)

$("#enterId").on('click', convertPoints);

$("#deductId").on('click', deductPoints);

$("#nextBtn").on('click', function(){
    messageModal.style.display = "none";
    reset();
});

$("#questionBtn").on('click', function(){
    //load questionaire page
    window.location.replace("questions.html");
});


function gameEnd(){
    if($("#pointsOpp").val()<$("#pointsPly").val()){
        $("#resultHeader").html("Congratulations! You won the game!")
    }else if($("#pointsOpp").val()>$("#pointsPly").val()){
        $("#resultHeader").html("Sorry, you lost the game!")
    }else{
        $("#resultHeader").html("The game is a tie!")
    }

    resultModal.style.display = "block";

}

function keepOption(){
    console.log("inside keep popup");
    t1 = performance.now();
    var time = t1-t0;
    loseModal.style.display = "none";

    winModal.style.display = "none";

    messageModal.style.display = "block";

    // Let backend know user just kept tokens
    socket.emit('action', {
        rounds: round,
        action: 0,
        time: time,
        pointsPlyPre: $("#pointsPly").val(),
        pointsPly: $("#pointsPly").val(),
        pointsOppPre: $("#pointsOpp").val(),
        pointsOpp: $("#pointsOpp").val(),
        tokensPlyPre: $("#tokensPly").val(),
        tokensPly: $("#tokensPly").val(),
        tokensOppPre: $("#tokensOpp").val(),
        tokensOpp: $("#tokensOpp").val(),
        winner: gameArr[round]
    });
    // Ask for computer message in these rounds
    if(round == 3 || round == 5 || round == 8){
        socket.emit('sendCompMessage', {rounds:round});
    }
    round += 1;

}

function convertPoints(event){
    event.preventDefault();
    console.log("Tried to convert points");
    t1 = performance.now();
    var time = t1-t0;
    console.log($("#tokensConvert").val());
    var conversion = $("#tokensConvert").val();
    // Make sure the conversion is a number
    if (isNaN(conversion)) {
        alert("Your input is not a number");
        return;
    }
    var pointsAdd = $("#tokensConvert").val()*100*(1 + ($("#tokensPly").val()-1)*.05);;
    convertModal.style.display = "none";
    messageModal.style.display = "block";
    // If they try to convert negative amounts of tokens
    if(conversion < 0){
        conversion = 0;
        pointsAdd = 0;
    }
    // If they try to convert more tokens than they have
    if(conversion > $("#tokensPly").val()){
        conversion = $("#tokensPly").val();
        pointsAdd = conversion*100*(1 + ($("#tokensPly").val()-1)*.05);
    }
    // Convert tokens to points
    var newToken = $("#tokensPly").val()-conversion;
    $("#tokensPly").val(newToken);
    $("#pointsPly").val($("#pointsPly").val()+pointsAdd);
    // Let the backend know convert was the action taken
    socket.emit('action',
    {
        rounds: round,
        action: conversion,
        time: time,
        pointsPlyPre: ($("#pointsPly").val()-pointsAdd),
        pointsPly: $("#pointsPly").val(),
        pointsOppPre: $("#pointsOpp").val(),
        pointsOpp: $("#pointsOpp").val(),
        tokensPlyPre: $("#tokensPly").val()+conversion,
        tokensPly: $("#tokensPly").val(),
        tokensOppPre: $("#tokensOpp").val(),
        tokensOpp: $("#tokensOpp").val(),
        winner: gameArr[round]
    });
    // Update tokens and points
    $("#tokensPly").html('Tokens: '+'</strong>'+ $("#tokensPly").val() + "/5");
    $("#pointsPly").html('Points: '+'</strong>'+ $("#pointsPly").val());
    round += 1;
    //reset();
}

/* Same as convert but subtracts points instead of converting */
function deductPoints(event){
    event.preventDefault();
    console.log("Tried to deduct points");
    t1 = performance.now();
    var time = t1-t0;
    console.log($("#pointsDeduct").val());
    var deduct = $("#p[ointsDeduct").val()
    if (isNaN(deduct)){
        alert("Your input is not a number");
        return;
    }
    var conversion = deduct/100;
    if (conversion > $("#tokensPly").val()){
        conversion = $("#tokensPly").val();
        deduct = conversion*100;
    }
    if (conversion < 0) {
        conversion = 0;
        deduct = 0;
    }
    deductModal.style.display = "none";
    messageModal.style.display = "block";
    $("#pointsOpp").val($("#pointsOpp").val()-deduct);
    $("#tokensPly").val($("#tokensPly").val()-conversion);


    socket.emit('action',
    {
        rounds: round,
        action: (-conversion),
        time, time,
        pointsPlyPre: $("#pointsPly").val(),
        pointsPly: $("#pointsPly").val(),
        pointsOppPre: $("#pointsOpp").val()+deduct,
        pointsOpp: $("#pointsOpp").val(),
        tokensPlyPre: $("#tokensPly").val()+conversion,
        tokensPly: $("#tokensPly").val(),
        tokensOppPre: $("#tokensOpp").val(),
        tokensOpp: $("#tokensOpp").val(),
        winner: gameArr[round]
    });
    $("#tokensPly").html('Tokens: '+'</strong>'+ $("#tokensPly").val() + "/5");
    $("#pointsOpp").html('Points: '+'</strong>' + $("#pointsOpp").val());
    round += 1;
    //reset();
}

function setUpInfoBar(namePly, nameOpp){
    //setting up player info
    $("#namePly").val(namePly);

    $("#usernameId").val(namePly);

    $("#tokensPly").val(0);

    $("#pointsPly").val(0);

    var tokensPly = $("#tokensPly").val();

    var pointsPly = $("#pointsPly").val();

    $("#namePly").html('<strong>'+namePly+'</strong>');

    $("#tokensPly").html('Tokens: '+'</strong>'+ tokensPly + "/5");

    $("#pointsPly").html('Points: '+'</strong>'+pointsPly);

    //seting up opponent info

    $("#nameOpp").val(nameOpp);


    $("#tokensOpp").val(0);

    $("#pointsOpp").val(0);

    var tokensOpp = $("#tokensOpp").val();

    var pointsOpp = $("#pointsOpp").val();

    $("#nameOpp").html('<strong>'+nameOpp+'</strong>' );

    $("#tokensOpp").html('Tokens: '+  tokensOpp + "/5");

    $("#pointsOpp").html('Points: ' + pointsOpp);

}

function convertPopUp(){
    console.log("inside convert popup");

    if($("#tokensPly").val() ==1){
        $("#convertTokens").html("You have "+ $("#tokensPly").val()+" token.")


    }else{
        $("#convertTokens").html("You have "+ $("#tokensPly").val()+" tokens.")

    }
    convertModal.style.display = "block";

    loseModal.style.display = "none";

    winModal.style.display = "none";


}

function deductPopUp(){
    console.log("inside deduct popup");

    deductModal.style.display = "block";

    loseModal.style.display = "none";

    winModal.style.display = "none";

    $("#tokensOpp").val($("#tokensOpp").val()-1);


}

function tokenPopUp(){
    tokenModal.style.display = "block";
}



function sendMessage(event) {


    event.preventDefault();

    var username =  $('#usernameId').val();
    var message = $('#messageId').val();
    socket.emit("message", {message:message, rounds: round-1});
    console.log(message);
    //clear the message input
    $('#messageId').val('');
    var li = $('<li></li>');
    li.html('<span style="font-weight:bold; color:red;"">' + username + '</span>: ' + message);
    $("#messagesList").append(li);

    if(round==numRounds){
        gameEnd();
    }else{
        messageModal.style.display = "none";
        reset();
    }


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