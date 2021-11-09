var BayesClassifier = require('./bayes-classifier');
var classifier = new BayesClassifier();
var fs = require('fs');
const path = require('path');




AdPath = path.join(__dirname,'/data','/Ads')             //AD를 저장 해둔 경로
NotAdsPath = path.join(__dirname,'/data','/NotAds')      //Not AD를 저장 해둔 경로
HtmlPath = path.join(__dirname,'/data','/html')          //광고 여부를 분류할 html경로





var files = fs.readdirSync(AdPath);
for(i=0;i<files.length;i++)
{
  var string = fs.readFileSync(AdPath+'/'+files[i]).toString().split("\n")
  for(line=0;line<string.length;line++){
    classifier.addDocuments(string[line].replace(/[ㄱ-ㅎ|가-힣]/g,""), "Ad");   //한글을 공백으로 바꿔주는 코드
  }
}
console.log("ok")//AD adddoc실행 된것 확인





var files = fs.readdirSync(NotAdsPath);
for(i=0;i<files.length;i++)
{
  var string = fs.readFileSync(NotAdsPath+'/'+files[i]).toString().split("\n")
  for(line=0;line<string.length;line++){
    classifier.addDocuments(string[line].replace(/[ㄱ-ㅎ|가-힣]/g,""), "NotAd");
  }
  
}
console.log("ok")//Not AD adddoc실행 된것 확인





classifier.train();
console.log("ok")//train 확인()





var files = fs.readdirSync(HtmlPath);
var NumAds = 0 
for(i=0;i<files.length;i++)
{
  
  var string = fs.readFileSync(HtmlPath+'/'+files[i]).toString()
  string.replace(/[ㄱ-ㅎ|가-힣]/g,"")
  console.log(files[i]+classifier.classify(string.replace(/[ㄱ-ㅎ|가-힣]/g,"")))     
  // 파일 이름 , 분류결과 
  
}
console.log("ok")


//이 코드 에서는 Html은 라인 단위 분류가 우선적으로 페이지 전체를 단위로 분류 
