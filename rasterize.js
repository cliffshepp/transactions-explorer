var page = require("webpage").create();
var fs = require("fs");

function getClipRect(selector) {
    return document.querySelector(selector).getBoundingClientRect();
}

page.viewportSize = { width: 1280, height: 1020 };
page.open("http://localhost:8080/all-services/by-transactions-per-year/descending", function () {
    page.clipRect = page.evaluate(getClipRect, '#services-treemap');
    page.render('treemap.png');
    var treemap = page.evaluate(function () { return document.querySelector('#services-treemap'); });
    fs.write('treemap.html', treemap.outerHTML);
    phantom.exit();
});

