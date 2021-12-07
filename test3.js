var BayesClassifier = require('./classifier');
var classifier = new BayesClassifier();

console.log(classifier.classify('The torta is epicly bad.')); // "positive"