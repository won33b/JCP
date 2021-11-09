var BayesClassifier = require('./bayes-classifier');
var classifier = new BayesClassifier();
var fs = require('fs');
const path = require('path');

PositivePath = path.join(__dirname,'/Testdata','/positive')
NegativePath = path.join(__dirname,'/Testdata','/negative')

var files = fs.readdirSync(PositivePath);
for(i=0;i<files.length;i++)
{
  var string = fs.readFileSync(PositivePath+'/'+files[i]).toString().split("\n");
  classifier.addDocuments(string, 'Positive');
}


var files = fs.readdirSync(NegativePath);
for(i=0;i<files.length;i++)
{
  var string = fs.readFileSync(NegativePath+'/'+files[i]).toString().split("\n");
  classifier.addDocuments(string, 'Negative');
}



classifier.train();

console.log(classifier.classify(`I heard the mexican restaurant is great!`)) // "positive"
console.log(classifier.classify(`I don't want to eat there again.`)) // "negative"
console.log(classifier.classify(`The torta is epicly bad.`)) // "negative"
var string = console.log(classifier.classify(`The torta is tasty.`)) // "positive"

console.log(classifier.classify(`Burritos are the meaning of life.`))



/*
var files = fs.readdirSync(TestPath);
var TestArr=[];
for(i=0;i<files.length;i++)
{
  var array = fs.readFileSync(TestPath+'/'+files[i]).toString();
  TestArr.push(array);
}

console.log(classifier.docs);

for(i=0;i<TestArr.length;i++)
{
  console.log(classifier.classify(TestArr[i]));
}
*/