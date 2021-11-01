var BayesClassifier = require('./bayes-classifier');
var classifier = new BayesClassifier();
var fs = require('fs');
const path = require('path');

AdvPath = path.join(__dirname,'/data','/ad')
NotAdvPath = path.join(__dirname,'/data','/notad')
TestPath = path.join(__dirname,'/data','/test')

var files = fs.readdirSync(AdvPath);
var AdvArr = []
for(i=0;i<files.length;i++)
{
  var array = fs.readFileSync(AdvPath+'/'+files[i]).toString();
  AdvArr.push(array);
}

var files = fs.readdirSync(NotAdvPath);
var NotAdvArr=[];
for(i=0;i<files.length;i++)
{
  var array = fs.readFileSync(NotAdvPath+'/'+files[i]).toString();
  NotAdvArr.push(array);
}


classifier.addDocuments(AdvArr, 'Ad');
classifier.addDocuments(NotAdvArr, 'NotAd');


classifier.train();

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
