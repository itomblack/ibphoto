var express = require('express'); //use the express library of functions
var fs = require('fs'); //use the fs library of function - part of node - allows file creations
var app = express();

var exec = require('child_process').exec;


// this bodyparse lets us access the form data
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// in latest body-parser use like bellow.
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('src'));

app.post("/photo", function(req, res){

        console.log(req.body);

        //will need to manually add the img folder to my Pi
        var path = __dirname + '/src/img/' + Date.now();
        // var path = __dirname + '/src/img/';
        
        fs.mkdirSync(path);

        //the is the exec command
        exec("gphoto2 --capture-image-and-download -F " + req.body.frames + " -I " + req.body.interval, 

                { cwd: path }, //this is the [options] of the exec command - cwd sets working directory


                //this is the callback of the exec command
                function (error, stdout, stderr) {
                        if (error !== null) {
                                res.send("error" + error);
                        } else {
                                res.send("it worked")
                        }
                });



})




app.listen(3000);
