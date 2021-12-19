var BayesClassifier = require("./bayes-classifier");
var classifier = new BayesClassifier();
var fs = require("fs");
const path = require("path");


HtmlPath = path.join(__dirname,'/data','/html')  

var files = fs.readdirSync(HtmlPath);
var ex1 = fs.readFileSync(HtmlPath + "/" + files[0]).toString();
var a = classifier.classify(ex1);
console.log(files[0]+a);

var files = fs.readdirSync(HtmlPath);
var ex2 = fs.readFileSync(HtmlPath + "/" + files[1]).toString();
var b = classifier.classify(ex2);
console.log(files[1]+b);



