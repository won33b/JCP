var assert = require("assert"); 
var BayesClassifier = require('./bayes-classifier copy');
var classifier = new BayesClassifier();
var classifier1 = new BayesClassifier();
var fs = require('fs');
const path = require('path');


AdPath = path.join(__dirname,'/data','/Ads')   
NotAdsPath = path.join(__dirname,'/data','/NotAds')     
HtmlPath = path.join(__dirname,'/data','/html')  


NotAdvArr = classifier.inputData('/data','/NotAds','NotAd');
AdvArr = classifier.inputData('/data','/Ads','Ad');


classifier.train();

describe('ClassifyTest', function () {
    it('case1', function (done) {
      var files = fs.readdirSync(HtmlPath);
      var ex1 = fs.readFileSync(HtmlPath+'/'+files[0]).toString()
      var a=classifier.classify(ex1)
      console.log(files[0])
      assert.equal(JSON.stringify(a),JSON.stringify('NotAd'));
      done();
    });

    it('case2', function (done) {
      var files = fs.readdirSync(HtmlPath);
      var ex2=fs.readFileSync(HtmlPath+'/'+files[1]).toString()
      var b=classifier.classify(ex2)
      console.log(files[1])
      assert.equal(JSON.stringify(b),JSON.stringify('Ad'));
      done();
    });
  })



  console.log(JSON.stringify(classifier.totalExamples))