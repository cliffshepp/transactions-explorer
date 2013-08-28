var page = require("webpage").create();
page.viewportSize = { width: 1280, height: 1020 };
var fs = require("fs");

function getClipRect(selector) {
    return document.querySelector(selector).getBoundingClientRect();
}

function removeDots(f) {
    return (f !== '.' && f != '..');
}

function getDepartmentPages(domain) {
    var files = fs.list('output/department').filter(removeDots);
    return files.map(function (f) {
        return domain + '/department/' + f + '/by-transactions-per-year/descending';
    });
}

function getExtraPages(domain) {
    return [
            '/all-services/by-transactions-per-year/descending',
            '/high-volume-services/by-transactions-per-year/descending'
            ].map(function (path) { return domain + path });
};

var departmentPages = getDepartmentPages('http://localhost:8080');
var extraPages = getExtraPages('http://localhost:8080');
var pagesWithTreeMaps = departmentPages.concat(extraPages);

function pathToName(path) {
    console.log(path);
    return path.split('/').reverse()[2];
}

function fixTheFont(page) {
    var fontStyles = fs.open('data/fonts.css', 'r').read();
    // var h = page.evaluate(function (fontStyles) {
    //     var fontLink = document.getElementsByTagName('link')[1],
    //         style = document.createElement('style');
    //         style.type = 'text/css';
    //         style.appendChild(document.createTextNode('foo'));
    //         fontLink.parentNode.insertBefore(style, fontLink.nextSibling);
    // }, fontStyles);
}


function processPage() {
    console.log(pagesWithTreeMaps.length);
    var path = pagesWithTreeMaps.pop();
    page.open(path, function () {
        var treemap = page.evaluate(function () { return document.getElementsByClassName('treemap')[0]; })
        console.log(path);
        if (treemap) {
            fixTheFont(page);
            var name = pathToName(path);
            console.log(name, '<---------');
            page.clipRect = page.evaluate(getClipRect, 'figure');
            page.render('trees/' + name + '.png');
            fs.write('trees/' + name + '.html', treemap.outerHTML);
        }
        
        if (pagesWithTreeMaps.length > 0) {
            processPage();
        } else {
            phantom.exit();   
        }        
    });
};

processPage();
