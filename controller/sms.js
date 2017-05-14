var express = require('express');
var https = require('https');

module.exports = (function() {
    'use strict';
    var router = express.Router();

    router.get('/receive', function(req, res) {

    let tNumber = req.query.msisdn;
    let tText = req.query.text;
    handleWebhook(req.query, res);
    


let monkey = "Fuck you!?"

var data = JSON.stringify({
 api_key: 'c492b266',
 api_secret: '9bc16bd976d0f158',
 to: `${tNumber}`,
 from: '12035298974',
 text: `${monkey}`
});

var options = {
 host: 'rest.nexmo.com',
 path: '/sms/json',
 port: 443,
 method: 'POST',
 headers: {
   'Content-Type': 'application/json',
   'Content-Length': Buffer.byteLength(data)
 }
};

var req = https.request(options);

req.write(data);
req.end();

var responseData = '';
req.on('response', function(res){
 res.on('data', function(chunk){
   responseData += chunk;
 });

 res.on('end', function(){
   console.log(JSON.parse(responseData));
 });
});

    });

    return router;
})();

function handleWebhook(params, res) {
    if (!params['status'] || !params['messageId']) {
        console.log('This is not a delivery receipt');
    } else {
        //This is a DLR, check that your message has been delivered correctly
        if (params['status'] !== 'delivered') {
            console.log("Fail:", params['status'], ": ", params['err-code']);
        } else {
            console.log("Success");
        }
    }
    res.sendStatus(200);
}
