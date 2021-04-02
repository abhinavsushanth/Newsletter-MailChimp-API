const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

const port = process.env.PORT;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

    const dataJSON = JSON.stringify(data);

    const url = 'https://us7.api.mailchimp.com/3.0/lists/93beba9633';
    const options = {
        method: 'POST',
        auth: "abhi:xxxxxxx-us7"
    };

    const request = https.request(url, options, function(response) {
        // response.on("data", function(data) {
        //     console.log(JSON.parse(data));

        statusCode = response.statusCode;

        if (statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
    });
    
    request.write(dataJSON);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(port || 3000, function() {
    console.log("Server is running on port " + port);
});

// API Key
// xxxxxxx-xxxxxxx

// List ID
// xxxxxxx
