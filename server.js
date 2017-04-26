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

var ctablesql = "CREATE TABLE IF NOT EXISTS game (id INTEGER PRIMARY KEY AUTOINCREMENT, "
    + "userid TEXT, name TEXT, round TEXT, winner INTEGER, action TEXT, "
    + "pointsPly INTEGER, pointsOpp INTEGER, tokensPly INTEGER, tokensOpp INTEGER, message TEXT, time TEXT);";

var q = conn.query(ctablesql, function(err, data){
        console.log("TABLE CREATED", err, data);
        if(err!= null){
            console.log("Error creating table message");
        }
});

/* Hard coded messages and names for computer */
var name, id = null;
var round = 1;
var compNames = ["Bob", "Joey", "Chandler", "Rachel", "Ross"];
var random = Math.floor((Math.random() * 5));
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
        conn.query("INSERT INTO game (userid, name, round, winner, action, pointsPly, pointsOpp, tokensPly, tokensOpp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [id, name, data.rounds, data.winner, data.action, data.pointsPly, data.pointsOpp, data.tokensPly, data.tokensOpp], function(error, data2){
                if (error!=null) console.log("Error inserting into game");
        });
        round += 1;
    });
    //Update db when message is sent
    socket.on('message', function(data){
        conn.query("UPDATE game SET message=$1 WHERE userid=$2 AND round=$3", [data.message, id, data.rounds], function(error, data2){
            if (error!=null) console.log("Error inserting message");
        });
    });

});

//start server
server.listen(PORT, function(){
console.log('Server listening on port ' + PORT);
});