var assert = require("assert"); 
var BayesClassifier = require('./bayes-classifier');
var classifier = new BayesClassifier();
var classifier1 = new BayesClassifier();
var classifier2 = new BayesClassifier();
var fs = require('fs');
const path = require('path');

PositivePath = path.join(__dirname,'/Testdata','/positive')
NegativePath = path.join(__dirname,'/Testdata','/negative')

var positiveDocuments = [
    `I love tacos.`,
    `Dude, that burrito was epic!`,
    `Holy cow, these nachos are so good and tasty.`,
    `I am drooling over the awesome bean and cheese quesadillas.`
    
  ]
  classifier.addDocuments(positiveDocuments, `positive`)
  classifier.train()


describe('docstest', function () {
    it('case1', function (done) {
        var files = fs.readdirSync(PositivePath);
            for(i=0;i<files.length;i++)
            {
                var string = fs.readFileSync(PositivePath+'/'+files[i]).toString().split("\n")
                classifier1.addDocuments(string, 'positive');
            }
            classifier1.train()
        assert.equal(JSON.stringify(classifier.docs),JSON.stringify(classifier1.docs));
        assert.equal(JSON.stringify(classifier.features),JSON.stringify(classifier1.features));
        assert.equal(classifier.lastAdded,classifier1.lastAdded);
        assert.equal(JSON.stringify(classifier.classFeatures),JSON.stringify(classifier1.classFeatures));
        assert.equal(JSON.stringify(classifier.classTotals),JSON.stringify(classifier1.classTotals));
        done();
    });

    it('case2', function (done) {
        AdvArr = classifier2.inputData('/Testdata','/positive');

        classifier2.addDocuments(AdvArr, 'positive');
        classifier2.train()
        assert.equal(JSON.stringify(classifier.docs),JSON.stringify(classifier2.docs));
        assert.equal(JSON.stringify(classifier.features),JSON.stringify(classifier2.features));
        assert.equal(classifier.lastAdded,classifier2.lastAdded);
        assert.equal(JSON.stringify(classifier.classFeatures),JSON.stringify(classifier2.classFeatures));
        assert.equal(JSON.stringify(classifier.classTotals),JSON.stringify(classifier2.classTotals));
        done();
    });

})


