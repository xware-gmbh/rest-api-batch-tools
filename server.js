var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Body parser use JSON data
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

app.post('/save', function(req, res) {

    // parse json data
    var jsonParsed = req.body.records;

    // loop through
    jsonParsed.forEach((record) => {

        // path of the file to output
        var outputFilename = '/data/'+record.filename;
        // write to the file system
        fs.appendFileSync(outputFilename, record.csvline+"\n");
        // logging
        // date time
        let currentDate = new Date();
        let cDay = "00" + currentDate.getDate();
        cDay = cDay.substring(cDay.length-2);
        let cMonth = "00" + (currentDate.getMonth() + 1);
        cMonth = cMonth.substring(cMonth.length-2);
        let cYear = currentDate.getFullYear();
        let cHours = "00" + currentDate.getHours();
        cHours = cHours.substring(cHours.length-2);
        let cMinutes = "00" + currentDate.getMinutes();
        cMinutes = cMinutes.substring(cMinutes.length-2);
        let cSeconds = "00" + currentDate.getSeconds();
        cSeconds = cSeconds.substring(cSeconds.length-2);
        // source IP
        let cIp = req.header('x-forwarded-for') || req.connection.remoteAddress;
        // filename
        // content
        console.log(cDay + "." + cMonth + "." + cYear + " " + cHours + ":" + cMinutes + ":" + cSeconds + " - " + "[INFO]" + " - " + cIp + " - " + outputFilename + " - " + record.csvline);

    });

    res.send('Saved');

});

var port = 3000;
app.listen(port);
console.log('Express started on port %d ...', port);