(() => {
  var e,
    t = {
      526: (e, t, s) => {
        var i = s(268);
        function o() {
          if (!(this instanceof o)) return new o();
          (this.stemmer = i),
            (this.docs = [
              { label: "positive", value: ["i", "love", "taco"] },
              { label: "positive", value: ["dude", "burrito", "epic"] },
              {
                label: "positive",
                value: ["holi", "cow", "nacho", "so", "good", "tasti"],
              },
              {
                label: "positive",
                value: ["i", "drool", "awesom", "bean", "chees", "quesadilla"],
              },
              { label: "negative", value: ["gross", "worst", "taco", "ever"] },
              {
                label: "negative",
                value: ["the", "burito", "gave", "horribl", "diarrhea"],
              },
              {
                label: "negative",
                value: ["i", "go", "puke", "i", "eat", "bad", "nacho"],
              },
              {
                label: "negative",
                value: ["i", "rather", "die", "eat", "nasti", "enchilada"],
              },
            ]),
            (this.lastAdded = 8),
            (this.features = {
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
              enchilada: 1,
            }),
            (this.classFeatures = {
              positive: {
                0: 3,
                1: 2,
                2: 2,
                3: 2,
                4: 2,
                5: 2,
                6: 2,
                7: 2,
                8: 2,
                9: 2,
                10: 2,
                11: 2,
                12: 2,
                13: 2,
                14: 2,
                15: 2,
                16: 2,
              },
              negative: {
                0: 3,
                2: 2,
                8: 2,
                17: 2,
                18: 2,
                19: 2,
                20: 2,
                21: 2,
                22: 2,
                23: 2,
                24: 2,
                25: 2,
                26: 2,
                27: 3,
                28: 2,
                29: 2,
                30: 2,
                31: 2,
                32: 2,
              },
            }),
            (this.classTotals = { positive: 5, negative: 5 }),
            (this.totalExamples = 9),
            (this.smoothing = 1);
        }
        (o.prototype.addDocument = function (e, t) {
          if (this._size(e)) {
            this._isString(e) && (e = this.stemmer.tokenizeAndStem(e));
            var s = { label: t, value: e };
            this.docs.push(s);
            for (var i = 0; i < e.length; i++) this.features[e[i]] = 1;
          }
        }),
          (o.prototype.addDocuments = function (e, t) {
            for (var s = 0; s < e.length; s++) this.addDocument(e[s], t);
          }),
          (o.prototype.docToFeatures = function (e) {
            var t = [];
            for (var s in (this._isString(e) &&
              (e = this.stemmer.tokenizeAndStem(e)),
            this.features))
              t.push(Number(!!~e.indexOf(s)));
            return t;
          }),
          (o.prototype.classify = function (e) {
            var t = this.getClassifications(e);
            if (!this._size(t)) throw "Not trained";
            return t[0].label;
          }),
          (o.prototype.train = function () {
            for (var e = this.docs.length, t = this.lastAdded; t < e; t++) {
              var s = this.docToFeatures(this.docs[t].value);
              this.addExample(s, this.docs[t].label), this.lastAdded++;
            }
          }),
          (o.prototype.addExample = function (e, t) {
            if (
              (this.classFeatures[t] ||
                ((this.classFeatures[t] = {}), (this.classTotals[t] = 1)),
              this.totalExamples++,
              this._isArray(e))
            ) {
              var s = e.length;
              for (this.classTotals[t]++; s--; )
                e[s] &&
                  (this.classFeatures[t][s]
                    ? this.classFeatures[t][s]++
                    : (this.classFeatures[t][s] = 1 + this.smoothing));
            } else
              for (var i in e)
                (value = e[i]),
                  this.classFeatures[t][value]
                    ? this.classFeatures[t][value]++
                    : (this.classFeatures[t][value] = 1 + this.smoothing);
          }),
          (o.prototype.probabilityOfClass = function (e, t) {
            var s = 0,
              i = 0;
            if (this._isArray(e))
              for (var o = e.length; o--; )
                e[o] &&
                  ((s = this.classFeatures[t][o] || this.smoothing),
                  (i += Math.log(s / this.classTotals[t])));
            else
              for (var a in e)
                (s = this.classFeatures[t][e[a]] || this.smoothing),
                  (i += Math.log(s / this.classTotals[t]));
            return (this.classTotals[t] / this.totalExamples) * Math.exp(i);
          }),
          (o.prototype.getClassifications = function (e) {
            var t = [];
            for (var s in this.classFeatures)
              t.push({
                label: s,
                value: this.probabilityOfClass(this.docToFeatures(e), s),
              });
            return t.sort(function (e, t) {
              return console.log(t.value, e.value), t.value - e.value;
            });
          }),
          (o.prototype.restore = function (e) {
            return (
              (this.docs = e.docs),
              (this.lastAdded = e.lastAdded),
              (this.features = e.features),
              (this.classFeatures = e.classFeatures),
              (this.classTotals = e.classTotals),
              (this.totalExamples = e.totalExamples),
              (this.smoothing = e.smoothing),
              (this.stemmer = i),
              this
            );
          }),
          (o.prototype._isString = function (e) {
            return "string" == typeof e || e instanceof String;
          }),
          (o.prototype._isArray = function (e) {
            return Array.isArray(e);
          }),
          (o.prototype._isObject = function (e) {
            return e instanceof Object;
          }),
          (o.prototype._size = function (e) {
            return this._isArray(e) || this._isString(e) || this._isObject(e)
              ? e.length
              : 0;
          }),
          "undefined" != typeof window && (window.BayesClassifier = o),
          (e.exports = o);
      },
      268: (e) => {
        function t(e) {
          return e.replace(/[^aeiou]+/g, "C").replace(/[aeiouy]+/g, "V");
        }
        function s(e) {
          return e.replace(/[^aeiou]/g, "C").replace(/[aeiouy]/g, "V");
        }
        function i(e) {
          return e ? t(e).replace(/^C/, "").replace(/V$/, "").length / 2 : -1;
        }
        function o(e) {
          return e.match(/([^aeiou])\1$/);
        }
        function a(e, t, s, i) {
          var o = null;
          return (
            "string" == typeof t && e.substr(0 - t.length) == t
              ? (o = e.replace(new RegExp(t + "$"), s))
              : t instanceof RegExp && e.match(t) && (o = e.replace(t, s)),
            o && i ? i(o) : o
          );
        }
        function r(e, t, s) {
          for (
            var o = null, r = 0;
            r < t.length &&
            ((!s || i(a(e, t[r][0], "")) > s) && (o = a(e, t[r][0], t[r][1])),
            !o);
            r++
          );
          return o;
        }
        function n(e, t, s) {
          return r(e, t, s) || e;
        }
        var l = function () {};
        (l.stopwords = [
          "about",
          "after",
          "all",
          "also",
          "am",
          "an",
          "and",
          "another",
          "any",
          "are",
          "as",
          "at",
          "be",
          "because",
          "been",
          "before",
          "being",
          "between",
          "both",
          "but",
          "by",
          "came",
          "can",
          "come",
          "could",
          "did",
          "do",
          "each",
          "for",
          "from",
          "get",
          "got",
          "has",
          "had",
          "he",
          "have",
          "her",
          "here",
          "him",
          "himself",
          "his",
          "how",
          "if",
          "in",
          "into",
          "is",
          "it",
          "like",
          "make",
          "many",
          "me",
          "might",
          "more",
          "most",
          "much",
          "must",
          "my",
          "never",
          "now",
          "of",
          "on",
          "only",
          "or",
          "other",
          "our",
          "out",
          "over",
          "said",
          "same",
          "see",
          "should",
          "since",
          "some",
          "still",
          "such",
          "take",
          "than",
          "that",
          "the",
          "their",
          "them",
          "then",
          "there",
          "these",
          "they",
          "this",
          "those",
          "through",
          "to",
          "too",
          "under",
          "up",
          "very",
          "was",
          "way",
          "we",
          "well",
          "were",
          "what",
          "where",
          "which",
          "while",
          "who",
          "with",
          "would",
          "you",
          "your",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
          "$",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "0",
          "_",
        ]),
          (l.prototype.trim = function (e) {
            for (; "" === e[e.length - 1]; ) e.pop();
            for (; "" === e[0]; ) e.shift();
            return e;
          }),
          (l.prototype.tokenize = function (e) {
            return this.trim(e.split(/\W+/));
          });
        var u = function () {};
        (u.prototype.stem = function (e) {
          return (function (e) {
            return i(e) > 1 && o(e) && "ll" == e.substr(-2)
              ? e.replace(/ll$/, "l")
              : e;
          })(
            (function (e) {
              var t = i(e);
              return e.length > 3 &&
                ((t > 1 && "e" == e.substr(-1)) ||
                  (1 == t &&
                    ("CVC" != s(e).substr(-4, 3) || !e.match(/[^wxy].$/))))
                ? e.replace(/e$/, "")
                : e;
            })(
              (function (e) {
                return n(
                  e,
                  [
                    ["al", ""],
                    ["ance", ""],
                    ["ence", ""],
                    ["er", ""],
                    ["ic", ""],
                    ["able", ""],
                    ["ible", ""],
                    ["ant", ""],
                    ["ement", ""],
                    ["ment", ""],
                    ["ent", ""],
                    [/([st])ion/, "$1"],
                    ["ou", ""],
                    ["ism", ""],
                    ["ate", ""],
                    ["iti", ""],
                    ["ous", ""],
                    ["ive", ""],
                    ["ize", ""],
                  ],
                  1
                );
              })(
                (function (e) {
                  return n(
                    e,
                    [
                      ["icate", "ic"],
                      ["ative", ""],
                      ["alize", "al"],
                      ["iciti", "ic"],
                      ["ical", "ic"],
                      ["ful", ""],
                      ["ness", ""],
                    ],
                    0
                  );
                })(
                  (function (e) {
                    return n(
                      e,
                      [
                        ["ational", "ate"],
                        ["tional", "tion"],
                        ["enci", "ence"],
                        ["anci", "ance"],
                        ["izer", "ize"],
                        ["abli", "able"],
                        ["alli", "al"],
                        ["entli", "ent"],
                        ["eli", "e"],
                        ["ousli", "ous"],
                        ["ization", "ize"],
                        ["ation", "ate"],
                        ["ator", "ate"],
                        ["alism", "al"],
                        ["iveness", "ive"],
                        ["fulness", "ful"],
                        ["ousness", "ous"],
                        ["aliti", "al"],
                        ["iviti", "ive"],
                        ["biliti", "ble"],
                      ],
                      0
                    );
                  })(
                    (function (e) {
                      return "V" == t(e).substr(-2, 1) && "y" == e.substr(-1)
                        ? e.replace(/y$/, "i")
                        : e;
                    })(
                      (function (e) {
                        if ("eed" == e.substr(-3)) {
                          if (i(e.substr(0, e.length - 3)) > 0)
                            return e.replace(/eed$/, "ee");
                        } else {
                          var n = a(e, /ed|ing$/, "", function (e) {
                            return t(e).indexOf("V") >= 0
                              ? r(e, [
                                  ["at", "ate"],
                                  ["bl", "ble"],
                                  ["iz", "ize"],
                                ]) ||
                                  (o(e) && e.match(/[^lsz]$/)
                                    ? e.replace(/([^aeiou])\1$/, "$1")
                                    : 1 == i(e) &&
                                      "CVC" == s(e).substr(-3) &&
                                      e.match(/[^wxy]$/)
                                    ? e + "e"
                                    : e)
                              : null;
                          });
                          if (n) return n;
                        }
                        return e;
                      })(
                        (function (e) {
                          return e.match(/(ss|i)es$/)
                            ? e.replace(/(ss|i)es$/, "$1")
                            : "s" == e.substr(-1) &&
                              "s" != e.substr(-2, 1) &&
                              e.length > 3
                            ? e.replace(/s?$/, "")
                            : e;
                        })(e.toLowerCase())
                      )
                    )
                  )
                )
              )
            )
          ).toString();
        }),
          (u.prototype.addStopWord = function (e) {
            l.stopwords.push(e);
          }),
          (u.prototype.addStopWords = function (e) {
            l.stopwords = l.stopwords.concat(e);
          }),
          (u.prototype.tokenizeAndStem = function (e, t) {
            var s = [];
            return (
              new l().tokenize(e).forEach(
                function (e) {
                  (t || -1 == l.stopwords.indexOf(e)) && s.push(this.stem(e));
                }.bind(this)
              ),
              s
            );
          }),
          (e.exports = new u());
      },
    },
    s = {};
  (e = new ((function e(i) {
    var o = s[i];
    if (void 0 !== o) return o.exports;
    var a = (s[i] = { exports: {} });
    return t[i](a, a.exports, e), a.exports;
  })(526))()),
    chrome.extension.onMessage.addListener(function (t, s) {
      "getSource" == t.action &&
        ((document.body.innerText = t.source), alert(e.classify(t.source)));
    }),
    (window.onload = function () {
      chrome.tabs.executeScript(null, { file: "getSource.js" }, function () {
        chrome.extension.lastError &&
          (document.body.innerText =
            "There was an error injecting script : \n" +
            chrome.extension.lastError.message);
      });
    });
})();
