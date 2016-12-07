var express = require("express");

var app = express();
var port = process.env.port || 3000;

app.use(express.static(__dirname + "/"));
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("Listenint at http://localhost:" + port + "\n");
});