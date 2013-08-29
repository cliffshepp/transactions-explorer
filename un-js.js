phantom.onError = function (e) {
    console.log('exiting on error!');
    phantom.exit();
}

var page = require('webpage').create(),
    fs = require('fs'),
    args = require('system').args;

if (args.length !== 4) {
    console.log("Usage: \n\tphantomjs un-js.js [pagePath] [outputDir] [domain]");
    phantom.exit();
}
    
function processPage() {
    var pagePath = args[1], outputDir = args[2], domain = args[3];
    page.open(domain + pagePath, function () {
        var html = page.evaluate(function () { return document.getElementsByTagName('html')[0].outerHTML; });
        fs.write(outputDir + "/" + pagePath + ".html", html);
        phantom.exit();
    });
}

processPage();
