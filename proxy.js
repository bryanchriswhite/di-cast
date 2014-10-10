// THIS IS EXPERIMENTAL GARBAGE.. DON'T USE THIS SHIT
var https = require('https')
  , httpProxy = require('http-proxy')
  , fs = require('fs')
  , httpsOptions = {
      key : fs.readFileSync('server.key', 'utf8'),
      cert: fs.readFileSync('server.crt', 'utf8')
    }
  ;

var diProxy = httpProxy.createProxyServer({
  target: {
    host: 'pub1.di.fm',
    port: 80
  },
//  ssl: {
//    key: fs.readFileSync('server.key', 'utf8'),
//    cert: fs.readFileSync('server.crt', 'utf8')
//  }
})//.listen(9009);

var apiProxy = httpProxy.createProxyServer({
  target: {
    host: 'listen.di.fm',
    port: 80
  }
});

var appProxy = httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: 9000
  }
});

var server = https.createServer(httpsOptions, function (req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  if (req.url.match(/di_\w+$/)) {
    req.url = req.url + '?type=.flv';
    console.log('di url');
    diProxy.web(req, res);
  } else if (req.url.match(/crossdomain\.xml$/)) {
    diProxy.web(req, res);
  } else if (req.url.match(/public1$/)) {
    apiProxy.web(req, res);
  } else {
    console.log('app url');
    appProxy.web(req, res);
  }
});

console.log("listening on port 9009")
server.listen(9009);