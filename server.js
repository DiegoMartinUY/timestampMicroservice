// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
    res.json({ greeting: 'hello API' });
});

app.get("/api/timestamp/:date?", function(req, res) {
    let param = req.params.date;
    if (param && typeof param === 'string') {
        let date = null;
        if (!isNaN(Date.parse(param))) {
            date = new Date(param);
        } else if (isNaN(Date.parse(param))) {
            if (param.length === 13) {
                date = new Date(param / 1);
                return res.json({ unix: date.getTime(), utc: date.toUTCString() });
            }
            return res.json({ error: "Invalid Date" });
        }
    } else {
        return res.json({ unix: new Date().getTime(), utc: Date(param).toUTCString() });
    }
});




// listen for requests :)
var listener = app.listen(37535, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});