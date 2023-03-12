const PORT = process.env.PORT || 3000;
let express = require('express');
let fs = require('fs');
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/guestbook", function (req, res) {
    let data = require("./public/messages.json");

    let out = '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Bootstrap CSS --> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> <!-- Custom CSS --> <!-- <link rel="stylesheet" href="styles.css"> --> <title>Guestbook</title></head> <body> <div class="container"> <div class="row" style="background-color: #EBEBEB"> <div class="col-12" style="text-align:center"><h1 style="font-weight:bold">Guestbook app</h1> </div> </div> <div class="row" style="background-color: #EBEBEB"> <div class="col-3" style="border-bottom:3px solid #005792;"> <h2><a href="/">Front page</a></h2> </div> <div class="col-3" style="border-bottom:3px solid #005792;"> <h2><a href="/guestbook">View guestbook</a></h2> </div> <div class="col-3" style="border-bottom:3px solid #005792;"> <h2><a href="/newmessage">Add message</a></h2> </div> <div class="col-3" style="border-bottom:3px solid #005792;"> <h2><a href="/ajaxmessage">Add ajax message</a></h2> </div> </div> <br> <br> <div class="row"> <div class="col-12"> <h3 style="font-weight:bold">Guestbook</h3> <table border="1"> <tr style="font-weight:bold"> <td> ID </td> <td> User name </td> <td> Country </td> <td> Date </td> <td> Message </td> </tr>';

    for (let i = 0; i < data.length; i++) {
        out += "<tr>"
        out += "<td>" + data[i].id + "</td>";
        out += "<td>" + data[i].username + "</td>";
        out += "<td>" + data[i].country + "</td>";
        out += "<td>" + data[i].date + "</td>";
        out += "<td>" + data[i].message + "</td>";
        out += "</tr>"
    }
    out += '</table> </div> </div> </div> </body> </html>';

    res.send(out);
});

app.get("/newmessage", function (req, res) {
    res.sendFile(__dirname + "/public/form.html");
});

app.post("/newmessage", function (req, res) {

    let data = require("./public/messages.json");
    var biggest_id = 0;

    for (let i = 0; i < data.length; i++) {
        if(biggest_id<parseInt(data[i].id)) {
            biggest_id = parseInt(data[i].id);
        }
    }

    data.push({
        "id": biggest_id+1,
        "username": req.body.username,
        "country": req.body.country,
        "date": new Date(),
        "message": req.body.message,
    });

    let str = JSON.stringify(data);

    let fs = require("fs");

    fs.writeFile("public/messages.json", str, (err) => {
        if (err) throw err;
    });

    res.sendFile(__dirname + "/public/form.html");
});

app.get("/ajaxmessage", function (req, res) {
    res.sendFile(__dirname + "/public/ajaxform.html");
});

app.post("/ajaxmessage", function (req, res) {
    res.send("");
});

app.get("/messages.json", function (req, res) {
    res.sendFile(__dirname + "/public/messages.json");
});

app.get('/guestbook.jpg', function(req, res){
    res.sendFile(__dirname + "/public/guestbook.jpg"); 
});

app.get("*", function (req, res) {
    res.status(404).send("Error");
});

app.listen(PORT, function () {
    console.log("Listening 3000");
});
