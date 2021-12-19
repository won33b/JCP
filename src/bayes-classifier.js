var stemmer = require('./porter');

/**
 * Terminology
 *
 * label: refers to class, since `class` is a reserved word.
 * doc: refers to document, since `document` is a reserved word.
 * feature: a token (word) in the bag of words (document).
 */

/**
 * BayesClassifier
 * @desc Bayes classifier constructor
 * @constructor
 * @return Bayes classifier instance
 */
 function BayesClassifier() {
  /*
   * Create a new instance when not using the `new` keyword.
   */
  if (!(this instanceof BayesClassifier)) {
    return new BayesClassifier();
  }

  /*
   * The stemmer provides tokenization methods.
   * It breaks the doc into words (tokens) and takes the
   * stem of each word. A stem is a form to which affixes can be attached.
   */
  this.stemmer = stemmer;

  /*
   * A collection of added documents
   * Each document is an object containing the class, and array of tokenized strings.
   */
  this.docs = [
    { label: 'positive', value: [ 'i', 'love', 'taco' ] },
    { label: 'positive', value: [ 'dude', 'burrito', 'epic' ] },
    {
      label: 'positive',
      value: [ 'holi', 'cow', 'nacho', 'so', 'good', 'tasti' ]
    },
    {
      label: 'positive',
      value: [ 'i', 'drool', 'awesom', 'bean', 'chees', 'quesadilla' ]
    },
    { label: 'negative', value: [ 'gross', 'worst', 'taco', 'ever' ] },
    {
      label: 'negative',
      value: [ 'the', 'burito', 'gave', 'horribl', 'diarrhea' ]
    },
    {
      label: 'negative',
      value: [
        'i',     'go',
        'puke',  'i',
        'eat',   'bad',
        'nacho'
      ]
    },
    {
      label: 'negative',
      value: [ 'i', 'rather', 'die', 'eat', 'nasti', 'enchilada' ]
    }
  ];

  /*
   * Index of last added document.
   */
  this.lastAdded = 8;

  /*
   * A map of every class features.
   */
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

  /*
   * A map containing each class and associated features.
   * Each class has a map containing a feature index and the count of feature appearances for that class.
   */
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

  /*
   * Keep track of how many features in each class.
   */
  this.classTotals = { positive: 5, negative: 5 };

  /*
   * Number of examples trained
   */
  this.totalExamples = 9;

  /* Additive smoothing to eliminate zeros when summing features,
   * in cases where no features are found in the document.
   * Used as a fail-safe to always return a class.
   * http://en.wikipedia.org/wiki/Additive_smoothing
   */
  this.smoothing = 1;
}



/**
 * docToFeatures
 *
 * @desc
 * Returns an array with 1's or 0 for each feature in document
 * A 1 if feature is in document
 * A 0 if feature is not in document
 *
 * @param {string|array} doc - document
 * @return {array} features
 */
BayesClassifier.prototype.docToFeatures = function(doc) {
  var features = [];

  if (this._isString(doc)) {
    doc = this.stemmer.tokenizeAndStem(doc);
  }

  for (var feature in this.features) {
    features.push(Number(!!~doc.indexOf(feature)));
  }

  return features;
};

/**
 * classify
 * @desc returns class for document
 * @param {string} doc - document
 * @return {string} class
 */
BayesClassifier.prototype.classify = function(doc) {
  var classifications = this.getClassifications(doc);
  if (!this._size(classifications)) {
    throw 'Not trained';
  }
  //console.log(classifications[0].value-classifications[1].value);
  return classifications[0].label;
};

/**
 * train
 * @desc train the classifier on the added documents.
 * @return {object} - Bayes classifier instance
 */
BayesClassifier.prototype.train = function() {
  var totalDocs = this.docs.length;
  for (var i = this.lastAdded; i < totalDocs; i++) {
    var features = this.docToFeatures(this.docs[i].value);
    this.addExample(features, this.docs[i].label);
    this.lastAdded++;
  }
};

/**
 * addExample
 * @desc Increment the counter of each feature for each class.
 * @param {array} docFeatures
 * @param {string} label - class
 * @return {object} - Bayes classifier instance
 */
BayesClassifier.prototype.addExample = function(docFeatures, label) {
  if (!this.classFeatures[label]) {
    this.classFeatures[label] = {};
    this.classTotals[label] = 1;
  }

  this.totalExamples++;

  if (this._isArray(docFeatures)) {
    var i = docFeatures.length;
    this.classTotals[label]++;

    while(i--) {
      if (docFeatures[i]) {
        if (this.classFeatures[label][i]) {
          this.classFeatures[label][i]++;
        } else {
          this.classFeatures[label][i] = 1 + this.smoothing;
        }
      }
    }
  } else {
    for (var key in docFeatures) {
      value = docFeatures[key];

      if (this.classFeatures[label][value]) {
        this.classFeatures[label][value]++;
      } else {
        this.classFeatures[label][value] = 1 + this.smoothing;
      }
    }
  }
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

        /* This is the `P(d|c)` part of the formula.
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
   * This is the `P(c)` part of the formula.
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
    console.log(y.value,x.value)
    return y.value - x.value;
  });
};

/**
 * restore
 * @desc Restores a classifier instance
 * @param {object} classifier object
 * @return {object} - Bayes classifier instance
 */
BayesClassifier.prototype.restore = function(classifier) {
  this.docs = classifier.docs;
  this.lastAdded = classifier.lastAdded;
  this.features = classifier.features;
  this.classFeatures = classifier.classFeatures;
  this.classTotals = classifier.classTotals;
  this.totalExamples = classifier.totalExamples;
  this.smoothing = classifier.smoothing;
  this.stemmer = stemmer;
  return this;
};

/*
 * Helper utils
 */
BayesClassifier.prototype._isString = function(s) {
  return typeof s === 'string' || s instanceof String;
};

BayesClassifier.prototype._isArray = function(s) {
  return Array.isArray(s);
};

BayesClassifier.prototype._isObject = function(s) {
  return s instanceof Object;
};

BayesClassifier.prototype._size = function(s) {
  if (this._isArray(s) || this._isString(s) || this._isObject(s)) {
    return s.length;
  }
  return 0;
};

// For Browserify build
if (typeof window !== 'undefined') {
  window.BayesClassifier = BayesClassifier;
}

/*
 * Export constructor
 */
module.exports = BayesClassifier;
