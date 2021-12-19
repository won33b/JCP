var BayesClassifier = require('./bayes-classifier');
var classifier = new BayesClassifier();
var fs = require('fs');
const path = require('path');




AdPath = path.join(__dirname,'/data','/Ads')             //AD를 저장 해둔 경로
NotAdsPath = path.join(__dirname,'/data','/NotAds')      //Not AD를 저장 해둔 경로
HtmlPath = path.join(__dirname,'/data','/html')          //광고 여부를 분류할 html경로

AdPath = path.join(__dirname,'/data','/Ads')   
NotAdsPath = path.join(__dirname,'/data','/NotAds')     
HtmlPath = path.join(__dirname,'/data','/html')  


NotAdvArr = classifier.inputData('/data','/NotAds','NotAd');
AdvArr = classifier.inputData('/data','/Ads','Ad');


classifier.train();
console.log("ok")//train 확인()




var files = fs.readdirSync(HtmlPath);
for(i=0;i<files.length;i++)
{
  var string = fs.readFileSync(HtmlPath+'/'+files[i]).toString()
  console.log(files[i]+classifier.classify(string))     
  // 파일 이름 , 분류결과 
  
}
console.log("ok")
