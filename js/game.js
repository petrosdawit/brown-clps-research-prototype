var socket = io.connect();
var numRounds = 10;
var round = 1;
var isSpaceFlag=false;
var gameArr = new Array(numRounds);
var numPoints = numRounds * 5 * 125;
var t0 = 0;
var t1 = 0;
//keeps track of who is supposed to win each round
for (var i = 0; i<gameArr.length; i++){
    if (i%3== 0 || i%7 == 0 || i%10 == 0){
        gameArr[i] = 0;
    } else {
        gameArr[i] = 1;
    }
}
var index = 0;
var sound = new Audio("background_music.mp3");
sound.play();
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
var roundModal = document.getElementById('round');

//get convertModal
var convertModal = document.getElementById('convertModal');

// Get the <span> element that closes the convert modal
var span2 = document.getElementsByClassName("close2")[0];

//get keep Modal
var deductModal = document.getElementById('deductModal');

// Get the <span> element that closes the deduct modal
var span3 = document.getElementsByClassName("close3")[0];

var messageModal = document.getElementById('messageModal');


var tokenModal = document.getElementById('tokenModal');

//**CHANGE can delete span 4


// Get the <span> element that closes the token modal
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

        //delete other modals
    else if (event.target == instModal) {
        instModal.style.display = "none";
    }

    else if(event.target == tokenModal){
         tokenModal.style.display = "none";
    }
}

function addinc(){

        if (round<4) {
            $('#gameBody').css('background', 'url(../images/backgroundTrack.png) no-repeat center center');
            $('#gameBody').css('background-size', '100% 100%');
        }
        else if (round < 7 && round >= 4) {
            $('#gameBody').css('background', 'url(../images/backgroundTrack2.png) no-repeat center center');
            $('#gameBody').css('background-size', '100% 100%');
        }
        else if (round < 10 && round >= 7) {
            $('#gameBody').css('background', 'url(../images/backgroundTrack3.png) no-repeat center center');
            $('#gameBody').css('background-size', '100% 100%');
        }
         else if (round < 13 && round >= 10) {
            $('#gameBody').css('background', 'url(../images/backgroundTrack4.png) no-repeat center center');
            $('#gameBody').css('background-size', '100% 100%');

        }

    }
//variables for game

 $(document).ready(function() {
    $('#gameBody').css('background', 'url(../images/backgroundTrack.png) no-repeat center center');
    $('#gameBody').css('background-size', '100% 100%');

    var time = 0;



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
        //CHANGE add the following lines
        $("#namePlyR").html(data.username);
        $("#nameOppR").html(data.compName);
        $("#deductPoints").html(data.compName);
        $("#messageHeader").html("Send a message to "+data.compName+"!");
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
                //$("#img1").css("animation-name", "example3");
                $("#img1").css("animation-duration", 0);
                // $("#img2").css("animation-name", "example3");
                $("#img2").css("animation-duration", 0);
                //$("#spacebar").append("Hit the spacebar!");
                var hitSpace = window.setInterval(function(){
                    $('#spacebar').hide();
                }, 1000);
                isSpaceFlag = true;
                autoloss = setTimeout(function(){
                    console.log("Autolosing");
                    var e = $.Event("keypress", {keyCode:80});
                    console.log(e);
                    $(document).trigger(e);
                }, 3000);
            }
        }, 830);


}


$(function(){
    $(document).keypress(function(e){
        // If spacebar is hit
        console.log(e);
    console.log(isSpaceFlag);
    if (isSpaceFlag == true){
        if ((e.keyCode == 32 && i > 2) || e.keyCode == 80){
            isSpaceFlag = false;
            clearInterval(autoloss);
            console.log("Spacebar hit");
            $('#spacebar').hide();
            // If user wins the round
            if (gameArr[round] == 1 && e.keyCode == 32){
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


                    $("#tokensPly").html('Tokens: '+'</strong>'+ $("#tokensPly").val()+"/5");
                    $("#PlyInfo").hide();
                    $("#OppInfo").hide();


                    $("#tokensPlyWin").html('Tokens: '+'</strong>'+ $("#tokensPly").val()+"/5");
                    $("#pointsPlyWin").html('Points: '+'</strong>'+ $("#pointsPly").val());
                    $("#tokensOppWin").html('Tokens: '+'</strong>'+ $("#tokensOpp").val()+"/5");
                    $("#pointsOppWin").html('Points: '+'</strong>'+ $("#pointsOpp").val());

                    console.log("Opp Tokens: "+$("#tokensOpp").val());
                  if ($("#tokensPly").val()==5){
                        $("#keepBtn1").hide();
                    }else{
                        $("#keepBtn1").show();
                    }

                    if ($("#tokensPly").val()==0){
                        $("#deductBtn1").hide();
                        $("#convertBtn1").hide();
                        $("#keepBtn1").hide();
                        $("#messageButton").show();

                    }else{
                        $("#deductBtn1").show();
                        $("#convertBtn1").show();
                        $("#keepBtn1").show();
                        $("#messageButton").hide();
                    }

                    $("#roundh1").html("You won!");
                    $("#deduction").hide();
                    $("#roundInfo").html("You have earned 1 token.");
                    $("#roundInfo").show();
                    roundModal.style.display = "block";
                    t0 = performance.now();
                }, 1500);



            } else if (e.keyCode == 80 || gameArr[round] == 0){

                console.log("Opp Tokens: "+$("#tokensOpp").val());
                //Computer wins

                console.log("Computer wins!");
                //Subtract 100 points from player
                var tokenIncrease = $("#tokensOpp").val()+1;

                console.log(tokenIncrease);

                var tokensOpp = $("#tokensOpp").val(tokenIncrease);

                console.log($("#tokensOpp").val());

                if($("#pointsPly").val()>=100 && round%2==0){
                    console.log("deduct points")

                    var tokensDeduct = (Math.floor(Math.random() * $("#tokensOpp").val())) +1;

                    console.log(tokensDeduct);

                    var decrease = tokensDeduct*100*(1 + (tokensDeduct-1)*.05);
                    console.log(decrease);
                    var deductPly = $("#pointsPly").val()-decrease;

                    //var deductPly =$("#pointsPly").val()-100;

                    console.log(deductPly);

                    $("#pointsPly").val(deductPly);

                    $("#tokensOpp").val($("#tokensOpp").val()-tokensDeduct);


                    console.log("Tokens Opp New: " +$("#tokensOpp").val(tokensOpp));

                    $("#pointsPly").html("Points: "+$("#pointsPly").val());

                    console.log("Points Ply: "+$("#pointsPly").val());

                    $("#roundInfo").html('Your opponent has deducted '+decrease+ ' points from you.');


                    $("#pointsPly").html("Points: "+ $("#pointsPly").val());

                } else if(round%3==0 || $("#tokensOpp").val()==5){

                    console.log("convert points");



                   var tokensConvert = (Math.floor(Math.random() * $("#tokensOpp").val())) +1;

                   var increase = tokensConvert*100*(1 + (tokensConvert-1)*.05);


                    var newPoints= $("#pointsOpp").val()+increase;

                    var oppTokens = $("#tokensOpp").val();

                    $("#pointsOpp").val(newPoints);
                    $("#pointsOpp").html("Points: "+$("#pointsOpp").val());
                    $("#roundInfo").html('Your opponent converted '+increase+ ' points.');

                    oppTokens-=1;
                    $("#tokensOpp").val(oppTokens);

                }else{
                    $("#roundInfo").html('Your opponent has kept points.');

                }

                $("#tokensOpp").html("Tokens: "+$("#tokensOpp").val()+"/5");



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

                    $("#tokensPlyWin").html('Tokens: '+'</strong>'+ $("#tokensPly").val()+"/5");
                    $("#pointsPlyWin").html('Points: '+'</strong>'+ $("#pointsPly").val());
                    $("#tokensOppWin").html('Tokens: '+'</strong>'+ $("#tokensOpp").val()+"/5");
                    $("#pointsOppWin").html('Points: '+'</strong>'+ $("#pointsOpp").val());

                    if ($("#tokensPly").val()==5){
                        $("#keepBtn1").hide();
                    }else{
                        $("#keepBtn1").show();
                    }

                    console.log($("#pointsOpp").val());
                    if ($("#tokensPly").val()==0){
                        $("#deductBtn1").hide();
                        $("#convertBtn1").hide();
                        $("#keepBtn1").hide();
                        $("#messageButton").show();

                    }else{
                        $("#deductBtn1").show();
                        $("#convertBtn1").show();
                        $("#keepBtn1").show();
                        $("#messageButton").hide();
                    }


                    $("#roundh1").html("You lost.");

                    roundModal.style.display = "block";
                    t0 = performance.now();
                }, 1500);

                }

            }
        }
    })
})



/* Click event handlers */
$('#submitId').on("click", sendMessage);

$("#convertBtn1").click(convertPopUp);



$("#deductBtn1").click(deductPopUp);



$("#keepBtn1").click(keepOption);



$("#chartlink").click(tokenPopUp)

$("#enterId").on('click', convertPoints);

$("#deductId").on('click', deductPoints);

$("#nextBtn").on('click', function(){
    messageModal.style.display = "none";
    // isSpaceFlag = true;
    addinc();
    reset();
});

$("#mesgBtn").on('click', function(){
    roundModal.style.display = "none";
    messageModal.style.display = "block";

});

$("#questionBtn").on('click', function(){
    //load questionaire page
    window.location.replace("questions.html");
});

//CHANGE end chanegs to this function
function gameEnd(){
    if($("#pointsOpp").val()<$("#pointsPly").val()){
        $("#resultHeader").html("Congratulations! You won the game!")
    }else if($("#pointsOpp").val()>$("#pointsPly").val()){
        $("#resultHeader").html("Sorry, you lost the game!")
    }else{
        $("#resultHeader").html("The game is a tie!")
    }
    $("#tokensPlyR").html('Tokens: '+'</strong>'+ $("#tokensPly").val());
    $("#pointsPlyR").html('Points: '+'</strong>'+ $("#pointsPly").val());
    $("#tokensOppR").html('Tokens: '+'</strong>'+ $("#tokensOpp").val());
    $("#pointsOppR").html('Points: '+'</strong>'+ $("#pointsOpp").val());

    resultModal.style.display = "block";

}

function keepOption(){
    console.log("inside keep popup");
    t1 = performance.now();
    var time = t1-t0;

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

    //CHNAGE add if statment
    if(round==numRounds){
            roundModal.style.display = "none";



            gameEnd();
        }else{
            roundModal.style.display = "none";



            messageModal.style.display = "block";

        }



}
function convertPoints(event){
    event.preventDefault();
    console.log("Tried to convert points");
    t1 = performance.now();
    var time = t1-t0;
    //CHANGE add regex and if statement
    console.log($("#tokensConvert").val());
    var conversion = $("#tokensConvert").val();
    var regTokens = new RegExp("^[0-9]+$");
    var matchTokens = regTokens.test(conversion);

    if(matchTokens){
        var pointsAdd = $("#tokensConvert").val()*100*(1 + ($("#tokensPly").val()-1)*.05);;

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
        $("#tokensPly").html('Tokens: '+'</strong>'+ $("#tokensPly").val()+"/5");
        $("#tokensOpp").html('Tokens: '+'</strong>'+ $("#tokensOpp").val()+"/5");
        $("#pointsPly").html('Points: '+'</strong>'+ $("#pointsPly").val());
        round += 1;

        //CHANGE add if statement
         if(round==numRounds){
            convertModal.style.display = "none";
            gameEnd();
        }else{
            convertModal.style.display = "none";
            messageModal.style.display = "block";
        }

    }else{
        alert("Please enter a valid amount of tokens.")

    }

    //reset();
}

/* Same as convert but subtracts points instead of converting */
function deductPoints(event){
    event.preventDefault();
    console.log("Tried to deduct points");
    t1 = performance.now();
    var time = t1-t0;

    var deduct = $("#tokensDeduct").val()
    console.log(deduct);
    var tokens = $("#tokensPly").val();
    console.log(tokens);
     //CHANGE add regex and if statement
    var regTokens = new RegExp("^[0-9]+$");
    var matchTokens = regTokens.test(deduct);
    console.log(matchTokens);

    if(matchTokens && deduct<=tokens && deduct >0){

        var deductOpp = $("#pointsOpp").val()-(deduct*100*(1 + (deduct-1)*.05));

        $("#pointsOpp").val(deductOpp);

         tokens-=deduct;

        $("#tokensPly").val(tokens);


        socket.emit('action',
        {
            rounds: round,
            action: (-deduct),
            time, time,
            pointsPlyPre: $("#pointsPly").val(),
            pointsPly: $("#pointsPly").val(),
            pointsOppPre: $("#pointsOpp").val()+deductOpp,
            pointsOpp: $("#pointsOpp").val(),
            tokensPlyPre: $("#tokensPly").val()+deduct,
            tokensPly: $("#tokensPly").val(),
            tokensOppPre: $("#tokensOpp").val(),
            tokensOpp: $("#tokensOpp").val(),
            winner: gameArr[round]
        });
        $("#tokensPly").html('Tokens: '+'</strong>'+ $("#tokensPly").val()+"/5");
        $("#pointsOpp").html('Points: '+'</strong>' + $("#pointsOpp").val());
        round += 1;

         //CHANGE if statement
        if(round==numRounds){
            deductModal.style.display = "none";
            gameEnd();
        }else{
            deductModal.style.display = "none";
            messageModal.style.display = "block";
        }

    }else{
        alert("Please enter a valid amount of tokens.")

    }
}

function setUpInfoBar(namePly, nameOpp){
    //setting up player info
    $("#namePly").val(namePly);

    $("#usernameId").val(namePly);

    $("#tokensPly").val(0);

    $("#pointsPly").val(numPoints);

    var tokensPly = $("#tokensPly").val();

    var pointsPly = $("#pointsPly").val();

    $("#namePly").html('<strong>'+namePly+'</strong>');

    $("#tokensPly").html('Tokens: '+'</strong>'+ tokensPly);

    $("#pointsPly").html('Points: '+'</strong>'+pointsPly);

    //seting up opponent info

    $("#nameOpp").val(nameOpp);


    $("#tokensOpp").val(0);

    $("#pointsOpp").val(numPoints);

    var tokensOpp = $("#tokensOpp").val();

    var pointsOpp = $("#pointsOpp").val();

    $("#nameOpp").html('<strong>'+nameOpp+'</strong>' );

    $("#tokensOpp").html('Tokens: '+  tokensOpp);

    $("#pointsOpp").html('Points: ' + pointsOpp);

    $("#tokensPly").html('Tokens: '+'</strong>'+ $("#tokensPly").val()+"/5");
    $("#tokensOpp").html('Tokens: '+'</strong>'+ $("#tokensOpp").val()+"/5");

}

function convertPopUp(){
    console.log("inside convert popup");

    //CHANGE add if statment


    $("#convertTokens").html("You have "+ $("#tokensPly").val()+" token.")



    convertModal.style.display = "block";

    roundModal.style.display = "none";




}

function deductPopUp(){
    console.log("inside deduct popup");

    //CHANGE add line
    $("#deductPoints").append(" has "+ $("#pointsOpp").val()+ " points");

    deductModal.style.display = "block";

    roundModal.style.display = "none";


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


    messageModal.style.display = "none";
    // isSpaceFlag = true;
    addinc();
    reset();



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
