var assert = require("assert"); 
var BayesClassifier = require('./bayes-classifier');
var classifier = new BayesClassifier();
var classifier1 = new BayesClassifier();
var classifier2 = new BayesClassifier();
var fs = require('fs');
const path = require('path');

PositivePath = path.join(__dirname,'/Testdata','/positive')
NegativePath = path.join(__dirname,'/Testdata','/negative')

var docs =[
    { 
        label: 'positive', 
        value: [ 'i', 'love', 'taco' ] 
    },
    { 
        label: 'positive', 
        value: [ 'dude', 'burrito', 'epic' ] 
    },
    {
      label: 'positive',
      value: [ 'holi', 'cow', 'nacho', 'so', 'good', 'tasti' ]
    },
    {
      label: 'positive',
      value: [ 'i', 'drool', 'awesom', 'bean', 'chees', 'quesadilla' ]
    },
]

var positiveDocuments = [
    `I love tacos.`,
    `Dude, that burrito was epic!`,
    `Holy cow, these nachos are so good and tasty.`,
    `I am drooling over the awesome bean and cheese quesadillas.`
    
  ]
  classifier.addDocuments(positiveDocuments, `positive`)


describe('docstest', function () {
    it('case1', function (done) {
        var files = fs.readdirSync(PositivePath);
            for(i=0;i<files.length;i++)
            {
                var string = fs.readFileSync(PositivePath+'/'+files[i]).toString().split("\n")
                classifier1.addDocuments(string, 'positive');
            }
        assert.equal(JSON.stringify(classifier.docs),JSON.stringify(classifier1.docs));
        done();
    });

    it('case2', function (done) {
        AdvArr = classifier2.inputData('/Testdata','/positive');

        classifier2.addDocuments(AdvArr, 'positive');

        assert.equal(JSON.stringify(classifier.docs),JSON.stringify(classifier2.docs));
        done();
    });

    it('case3', function (done) {
        assert.equal(JSON.stringify(classifier.docs),JSON.stringify(docs));
        done();
    });



})


