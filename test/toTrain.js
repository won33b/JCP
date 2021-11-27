var BayesClassifier = require('./bayes-classifier');
var classifier = new BayesClassifier();

AdvArr = classifier.inputData('/data', '/Ads');
notAdvArr = classifier.inputData('/data', '/NotAds');
htmlArr = classifier.inputData('/data', '/html');

classifier.addDocuments(AdvArr, 'Ad');
classifier.addDocuments(notAdvArr, 'NotAd');

classifier.train();

for(i  =0; i < htmlArr.length; i++)
{
  console.log(classifier.classify(htmlArr[i]));
}
