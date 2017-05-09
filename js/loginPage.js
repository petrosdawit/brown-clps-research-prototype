 $(document).ready(function(){
    console.log("in function");
            var socket = io.connect();
            $("#findOppButton").click(function(){
                var userid = $("#userIDField").val();
                var username = $("#userNameField").val();
                var regName = new RegExp("^[0-9]*[a-zA-Z]+[a-zA-Z0-9]*$");
                var regId = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])");
                var matchName = regName.test(username);
                var matchId = regId.test(userid);
                console.log(matchName);
                console.log(matchId);
                if(matchName && username!='' && matchId && userid!=''){

                    window.location.href='instructions.html';
                    socket.emit('join', {id: userid, name: username});
                    socket.emit("masterPageCheck", {});
                    socket.on("masterPageLogin", function(data){
                        window.location.replace("masterPage.html");
                    });
                    socket.on("masterPage", function(data){
                        if (data.masterPage == true){
                            window.location.replace("masterPage.html");
                        }
                });
                }else{
                    
                    if( !(matchName) || username==''){
                        alert("Please enter valid username");

                    }else{
                        alert("Please enter valid id");
                    }     
                    
                }
  
                
            });
        });

 $(document).ready(function(){
    $('#imageContainer img').click(function(){
        $('#imageContainer img').removeClass("imgBorder");
        $(this).addClass("imgBorder");
    });
})