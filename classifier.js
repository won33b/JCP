


 var stemmer = require('./porter');


 
 function BayesClassifier() {
   
   if (!(this instanceof BayesClassifier)) {
     return new BayesClassifier();
   }
 
   
   this.stemmer = stemmer;
 
   
   this.features = {
    i: 1,
    love: 1,      
    taco: 1,      
    dude: 1,      
    burrito: 1,   
    epic: 1,      
    holi: 1,      
    cow: 1,       
    nacho: 1,     
    so: 1,        
    good: 1,      
    tasti: 1,     
    drool: 1,     
    awesom: 1,    
    bean: 1,      
    chees: 1,     
    quesadilla: 1,
    gross: 1,     
    worst: 1,     
    ever: 1,      
    the: 1,       
    burito: 1,    
    gave: 1,      
    horribl: 1,   
    diarrhea: 1,  
    go: 1,        
    puke: 1,      
    eat: 1,       
    bad: 1,       
    rather: 1,    
    die: 1,       
    nasti: 1,     
    enchilada: 1  
  };
 
 
   this.classFeatures = {
       positive: {
         '0': 3,
         '1': 2,
         '2': 2,
         '3': 2,
         '4': 2,
         '5': 2,
         '6': 2,
         '7': 2,
         '8': 2,
         '9': 2,
         '10': 2,
         '11': 2,
         '12': 2,
         '13': 2,
         '14': 2,
         '15': 2,
         '16': 2
          },

        negative: {
         '0': 3,
         '2': 2,
         '8': 2,
         '17': 2,
         '18': 2,
         '19': 2,
         '20': 2,
         '21': 2,
         '22': 2,
         '23': 2,
         '24': 2,
         '25': 2,
         '26': 2,
         '27': 3,
         '28': 2,
         '29': 2,
         '30': 2,
         '31': 2,
         '32': 2
         }
    };
 
   
   this.classTotals = {positive: 5, negative: 5 };
 
   
   this.totalExamples = 9;
 
  
   this.smoothing = 1;
 }
 
 
 BayesClassifier.prototype.docToFeatures = function(doc) {
   var features = [];
 
   if (this._isString(doc)) {
     doc = this.stemmer.tokenizeAndStem(doc);
   }
 
   for (var feature in this.features) {
     features.push(Number(!!~doc.indexOf(feature)));
   }
   //console.log(features);
 
   return features;
 };
 

 BayesClassifier.prototype.classify = function(doc) {
   var classifications = this.getClassifications(doc);
   if (!this._size(classifications)) {
     throw 'Not trained';
   }
   console.log(classifications[0].value,classifications[1].value);
   return classifications[0].label;
 };
 
 
 
 
 
 
 /**
  * probabilityOfClass
  * @param {array|string} docFeatures - document features
  * @param {string} label - class
  * @return probability;
  * @desc
  * calculate the probability of class for the document.
  *
  * Algorithm source
  * http://en.wikipedia.org/wiki/Naive_Bayes_classifier
  *
  * P(c|d) = P(c)P(d|c)
  *          ---------
  *             P(d)
  *
  * P = probability
  * c = class
  * d = document
  *
  * P(c|d) = Likelyhood(class given the document)
  * P(d|c) = Likelyhood(document given the classes).
  *     same as P(x1,x2,...,xn|c) - document `d` represented as features `x1,x2,...xn`
  * P(c) = Likelyhood(class)
  * P(d) = Likelyhood(document)
  *
  * rewritten in plain english:
  *
  * posterior = prior x likelyhood
  *             ------------------
  *                evidence
  *
  * The denominator can be dropped because it is a constant. For example,
  * if we have one document and 10 classes and only one class can classify
  * document, the probability of the document is the same.
  *
  * The final equation looks like this:
  * P(c|d) = P(c)P(d|c)
  */
 BayesClassifier.prototype.probabilityOfClass = function(docFeatures, label) {
   var count = 0;
   var prob = 0;
 
   if (this._isArray(docFeatures)) {
     var i = docFeatures.length;
 
     // Iterate though each feature in document.
     while(i--) {
       // Proceed if feature collection.
       if (docFeatures[i]) {
         /*
          * The number of occurances of the document feature in class.
          */
         count = this.classFeatures[label][i] || this.smoothing;
 
         /* This is the `P(d|c)` part of the model.
          * How often the class occurs. We simply count the relative
          * feature frequencies in the corpus (document body).
          *
          * We divide the count by the total number of features for the class,
          * and add it to the probability total.
          * We're using Natural Logarithm here to prevent Arithmetic Underflow
          * http://en.wikipedia.org/wiki/Arithmetic_underflow
          */
         prob += Math.log(count / this.classTotals[label]);
       }
     }
   } else {
     for (var key in docFeatures) {
       count = this.classFeatures[label][docFeatures[key]] || this.smoothing;
       prob += Math.log(count / this.classTotals[label]);
     }
   }
 
   /*
    * This is the `P(c)` part of the model.
    *
    * Divide the the total number of features in class by total number of all features.
    */
   var featureRatio = (this.classTotals[label] / this.totalExamples);
 
   /**
    * probability of class given document = P(d|c)P(c)
    */
   prob = featureRatio * Math.exp(prob);
 
   return prob;
 };
 
 /**
  * getClassifications
  * @desc Return array of document classes their probability values.
  * @param {string} doc - document
  * @return classification ordered by highest probability.
  */
 BayesClassifier.prototype.getClassifications = function(doc) {
   var classifier = this;
   var labels = [];
 
   for (var className in this.classFeatures) {
     labels.push({
       label: className,
       value: classifier.probabilityOfClass(this.docToFeatures(doc), className)
     });
   }
 
   return labels.sort(function(x, y) {
     return y.value - x.value;
   });
 };
 
 /*
  * Helper utils
  */
 BayesClassifier.prototype._isString = function(s) {
   return typeof(s) === 'string' || s instanceof String;
 };
 
 BayesClassifier.prototype._isArray = function(s) {
   return Array.isArray(s);
 };
 
 BayesClassifier.prototype._isObject = function(s) {
   return typeof(s) === 'object' || s instanceof Object;
 };
 
 BayesClassifier.prototype._size = function(s) {
   if (this._isArray(s) || this._isString(s) || this._isObject(s)) {
     return s.length;
   }
   return 0;
 };




 module.exports = BayesClassifier;