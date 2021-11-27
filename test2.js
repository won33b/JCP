var BayesClassifier = require('./bayes-classifier');
var classifier = new BayesClassifier();
var fs = require('fs');
const path = require('path');

/***************************************************************** */
AdvArr = classifier.inputData('/data','/Ads');
NotAdvArr = classifier.inputData('/data','/NotAds');
HTMLArr = classifier.inputData('/data','/html')

classifier.addDocuments(AdvArr, 'Ad');
classifier.addDocuments(NotAdvArr, 'NotAd');

classifier.train();


/***************************************************************** */

//console.log(classifier.docs);
for(i=0;i<HTMLArr.length;i++)
{
  console.log(classifier.classify(HTMLArr[i]));
}
