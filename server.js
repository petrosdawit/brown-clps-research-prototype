var PORT = 8080;

var http = require('http');
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var engines = require('consolidate');
var anyDB = require('any-db');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.engine('html', engines.hogan);
app.set('views', __dirname + '/html');
app.set('view engine', 'html');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use('/', express.static(__dirname + "/"));
//app.use('/css', express.static(__dirname + "/css"));
app.get('/',function (req, res) {
    //res.redirect("/html/startpage.html");
    res.render("startpage.html")
});

/* Create connection to database */
var conn = anyDB.createConnection('sqlite3://game.db');

var cPassTableSql = "CREATE TABLE IF NOT EXISTS pass (id INTEGER PRIMARY KEY AUTOINCREMENT, "
    + "userid TEXT, name TEXT)"

var q = conn.query(cPassTableSql, function(err, data){
        console.log("TABLE CREATED", err, data);
        if(err!= null){
            console.log("Error creating table message");
        }
});

var ctablesql = "CREATE TABLE IF NOT EXISTS game (id INTEGER PRIMARY KEY AUTOINCREMENT, "
    + "userid TEXT, name TEXT, trial INTEGER, outcome INTEGER, response INTEGER, time DECIMAL, "+
    "tokensPlyPre INTEGER, tokensPly INTEGER, pointsPlyPre INTEGER, pointsPly INTEGER, message TEXT, "
    + "tokensOppPre INTEGER, tokensOpp INTEGER, pointsOppPre INTEGER, pointsOpp INTEGER, cmessage TEXT);";

var ctablesql2 = "CREATE TABLE IF NOT EXISTS survey (id INTEGER PRIMARY KEY AUTOINCREMENT, "
    + "userid TEXT, question1 INTEGER, question2 INTEGER, question3 INTEGER, question4 INTEGER,"
    + " question5 INTEGER, question6 INTEGER, question7 INTEGER, question8 INTEGER, question9 INTEGER,"
    + " question10 INTEGER, question11 INTEGER);";
var q = conn.query(ctablesql, function(err, data){
        console.log("TABLE CREATED", err, data);
        if(err!= null){
            console.log("Error creating table game");
            console.log(error);
        }
});

conn.query(ctablesql2, function(err, data){
    console.log("Table survey Created", err, data);
    if(err!= null){
        console.log("Error createing table survey");
        console.log(error);
    }
});

/* Hard coded messages and names for computer */
var name, id = null;
var round = 1;
var compNames = ["Taylor", "Joey", "Ryan", "Pat", "Skyler", "Jordan"];
var random = Math.floor((Math.random() * 6));
var compName = compNames[random];
var compMessages = ["I could beat you with my eyes closed", "Talk about a loser", "Maybe next time buddy", "Are you trying to lose???"];


io.on('connection', function(socket){
    socket.on('error', function(){
        console.log("Error connecting!");
    });
    // When a user joins
    socket.on('join', function(data){
        id = data.id;
        name = data.name
        console.log("User joined!");
        console.log(id);
        console.log(name);
    });

    // Send computer messages to frontend
    socket.on("sendCompMessage", function(data){
        if(data.rounds == 3)
            socket.emit('sendCompMessage', {compName: compName, message: compMessages[1]});
        else if(data.rounds == 5){
            socket.emit('sendCompMessage', {compName: compName, message: compMessages[0]});
        }
        else if(data.rounds == 8){
            socket.emit('sendCompMessage', {compName: compName, message: compMessages[2]});
        }
    });
    // When the game starts send the names and id
    socket.on('gameStart', function(data){
        socket.emit('names', {username:name, userid:id, compName: compName});
    });

    //Universal post game action
    socket.on('action', function(data){
        console.log("Did Action!");
        console.log(data);
        conn.query("INSERT INTO game (userid, name, trial, outcome, response, time, tokensPlyPre, tokensPly, pointsPlyPre, pointsPly, tokensOppPre, tokensOpp, pointsOppPre, pointsOpp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
            [id, name, data.rounds, data.winner, data.action, data.time, data.tokensPlyPre, data.tokensPly, data.pointsPlyPre, data.pointsPly, data.tokensOppPre, data.tokensOpp, data.pointsOppPre, data.pointsOpp], function(error, data2){
                if (error!=null) console.log("Error inserting into game: ", error);
        });
        round += 1;
    });
    //Update db when message is sent
    socket.on('message', function(data){
        conn.query("UPDATE game SET message=$1 WHERE userid=$2 AND trial=$3", [data.message, id, data.rounds], function(error, data2){
            if (error!=null) console.log("Error inserting message ", error);
        });
    });


    //Check for masterPage login by comparing to passWord, if nothing in pass db, direct to masterpage, to update
    // password and id
    socket.on('masterPageCheck', function(data){
        conn.query("SELECT * FROM pass;", function(err, data){
            n = data.rows.length;
            console.log(data.rows);
            if (n < 1){
                socket.emit("masterPageLogin", {});
            } else {
                var masterPage = false;
                var passID = data.rows[0].userid;
                var passUser = data.rows[0].name;
                console.log(passID);
                console.log(passUser);
                console.log(name);
                console.log(id);
                if (name == passUser && id == passID) {
                    masterPage = true;
                }
                console.log(masterPage);
                socket.emit('masterPage', {masterPage:masterPage});
            }
        });
        // var masterPage = false;
        // if (name == passUserName[0] && id == passWord[0]){
        //     masterPage = true;
        // }
        // socket.emit('masterPage', {masterPage:masterPage});
    });

    //Download all the data for the masterPage
    socket.on("download", function(data){
        conn.query("SELECT * FROM game order by name, userid ASC;", function(err, data){
            socket.emit("downloadAll", {info:data.rows});
        });        
    })

    //Update Username and Password
    socket.on("changePassword", function(data){
        console.log(data);


        conn.query("DROP TABLE pass", function(err, data3){
            console.log("DROPPED TABLE PASS", err, data3);
            if(err!= null){
                console.log("Error dropping table message");
            }
        });

        var cPassTableSql = "CREATE TABLE IF NOT EXISTS pass (id INTEGER PRIMARY KEY AUTOINCREMENT, "
            + "userid TEXT, name TEXT)"

        var q = conn.query(cPassTableSql, function(err, data3){
                console.log("TABLE CREATED", err, data3);
                if(err!= null){
                    console.log("Error creating table message");
                }
        });

        conn.query("INSERT INTO pass (userid, name) VALUES ($1, $2)",
            [data.userid, data.name], function(error, data4){
                if (error!=null) console.log("Error inserting into pass");
        }); 
    })
    
    //Get survey responses
    socket.on('survey', function(data){
        console.log(data.answers);
        conn.query("INSERT INTO survey (userid,question1,question2,question3,question4,question5,question6,question7,question8,question9,question10,question11) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
            [id,data.answers[0],data.answers[1],data.answers[2],data.answers[3],data.answers[4],data.answers[5],data.answers[6],data.answers[7],data.answers[8],data.answers[9],data.answers[10]], function(error, data2){
                if (error!=null) console.log("Error inserting into survey ", error);
        });
    });

});

//start server
server.listen(PORT, function(){
console.log('Server listening on port ' + PORT);
});