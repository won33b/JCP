var BayesClassifier = require('./classifier');
var classifier = new BayesClassifier();

function get_source(document_body){
    result=classifier.classify(document_body.innerHTML)
    window.alert(result)
    
    if(result == 'Ad'){
        window.history.back()
    }
    
return result
}

chrome.extension.sendMessage({
action: "getSource",
source: get_source(document.body)
});

/*

chrome.extension.sendMessage({
    action: "beforeunload",
    source: 
    window.addEventListener("beforeunload", function(event) {
        event.returnValue = "자주 놀러와 !!";
      })

    });

*/


    
    