var assert = require("assert"); 
var BayesClassifier = require('./bayes-classifier');
var fs = require('fs');
const path = require('path');

Path = path.join(__dirname,'/Testdata','/toClassfy')

describe('loadTest', function () {
    it('case1', function (done) {
        var files = fs.readdirSync(Path);
            var result = fs.readFileSync(Path+'/'+files[0]).toString()
            var expected=fs.readFileSync(Path+'/'+files[1]).toString()
        assert.equal(result,expected);
        done();
    });

})


