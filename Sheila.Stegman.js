

let clockFont;
let temperature,weatherType,hiTemp,lowTemp,rainChance;
let heartRate,heartAvg,steps,stepAvg,cal,calAvg;
let currentWeight,weekHigh,weekLow;
let currentNewsTitle,currentNewsDate,currentNewsDesc,
    trendingNewsTitle,trendingNewsDate,trendingNewsDesc,
    politicalNewsTitle,politicalNewsDate,politicalNewsDesc;
let smsNotifAmount,text1From,text1Message,text1Timestap,
    text2From,text2Message,text2Timestap,
    twitterNotifAmount,twit1From,
    twit1Interaction,twit1description,twit1TimeStamp;
let weatherColor,healthColor,weightColor,newsColor,socialColor,basicColor;

//flags for opening a widget
let fBasic,fWeather,fHealth,fWeight,fNews,fSocial =false;
let bBasic,bHealth,bWeight,bNews,bSocial;
var bWeather;



function preload() {
  imgPerson = loadImage('MMperson.png');

  iconWeather = loadImage('MMiconWeather.jpg');
  iconCal = loadImage('MMiconCal.jpg');
  iconHeart = loadImage('MMiconHeart.jpg');
  iconSteps = loadImage('MMiconSteps.jpg');
  iconWeight = loadImage('MMiconWeight.jpg');
  iconNews = loadImage('MMiconnEWS.jpg');
  iconTwitter = loadImage('MMiconTwitter.jpg');
  iconSMS = loadImage('MMiconSMS.jpg');

  imgMirror = loadImage('mirror2_fit.jpg');
}

 function setup() {
  createCanvas(1500, 1100);
  clockFont = loadFont("digital-7.ttf");
  getWeatherData();
  getHealthData();
  getWeightData();
  getnewsData();
  getSocialData();

  bWeather = new Clickable();
  bWeather.locate(268, 196);
  bWeather.resize(35, 35);
  bWeather.textSize=25;
  bWeather.text="+";
  bWeather.onPress = function(){
    fWeather=true;
  }

  bHealth = new Clickable();
  bHealth.locate(268, 345);
  bHealth.resize(35, 35);
  bHealth.textSize=25;
  bHealth.text="+";
  bHealth.onPress = function(){
    fHealth=true;
  }

  bWeight = new Clickable();
  bWeight.locate(268, 726);
  bWeight.resize(35, 35);
  bWeight.textSize=25;
  bWeight.text="+";
  bWeight.onPress = function(){
    fWeight=true;
  }

  bNews = new Clickable();
  bNews.locate(1450, 16);
  bNews.resize(35, 35);
  bNews.textSize=25;
  bNews.text="+";
  bNews.onPress = function(){
    fNews=true;
  }

  bSocial = new Clickable();
  bSocial.locate(1450, 456);
  bSocial.resize(35, 35);
  bSocial.textSize=25;
  bSocial.text="+";
  bSocial.onPress = function(){
    fSocial=true;
  }
  /*bWeather=new Button({
    x:268,y:345,width:35,height:35,align_x: 0,align_y: 0,content: '+',
    on_press() {expandInfo();}
  })

  
  bWeather = createButton("+");
  bWeather.position(268,195);
  bWeather.size(35,35)
  bWeather.mousePressed(fill(255));

  bHealth = createButton("+");
  bHealth.position(268,345);
  bHealth.size(35,35)
  bHealth.mousePressed(fill(255));

  bWeight = createButton("+");
  bWeight.position(268,725);
  bWeight.size(35,35)
  bWeight.mousePressed(fill(255));

  bNews = createButton("+");
  bNews.position(1449,16);
  bNews.size(35,35)
  bNews.mousePressed(fill(255));

  bSocial = createButton("+");
  bSocial.position(1449,456);
  bSocial.size(35,35)
  bSocial.mousePressed(fill(255));*/
}

function expandInfoWeather(){
  fill(221,237,248);
  rect(400, 10, 600, 400, 20);
  fill(0);
  text("Todays forcast: "+weatherType,410,20);
  //textSize(30);
  text("High: "+hiTemp+"º",410,150);
  text("Low: "+lowTemp+"º",410,210);
  text("Chance of rain: "+rainChance+"%",410,350);

}

function expandInfoHealth(){
  fill(247,148,148);
  rect(400, 10, 600, 400, 20);
  fill(0);
  text("Average bpm: "+heartAvg,410,20);
  text("Weekly avg steps: "+stepAvg,410,170);
  text("Weekly calories burned: "+calAvg,410,290,500,500);
}

function expandInfoWeight(){
  fill(180,190,229);
  rect(400, 10, 600, 400, 20);
  fill(0);
  text("Your heaviest weight this month: "+weekHigh+" lbs",410,20,500,500);
  text("Your lightest weight this month: "+weekLow+" lbs",410,280,500,500);

}

function expandInfoNews(){
  fill(187,228,210);
  rect(400, 10, 600, 400, 20);
  fill(0);
  
  textFont('Georgia');
  textSize(30);
  text("Top Trending: "+trendingNewsTitle,410,20,590,500);
  textFont('Helvetica');
  textSize(25);
  text(trendingNewsDesc,410,100,590,500);

  textFont('Georgia');
  textSize(30);
  text("Top Political: "+politicalNewsTitle,410,230,590,500);
  textFont('Helvetica');
  textSize(25);
  text(politicalNewsDesc,410,310,590,350);
  textSize(50);

}

function expandInfoSocial(){
  fill(245,226,210);
  textFont('Georgia');
  rect(400, 10, 600, 400, 20);
  fill(0,40,0);
  textSize(45);
  text(text1From,410,20);
  textSize(20);
  text(text1Timestap,550,40);
  textSize(35);
  text(text1Message,410,70,800,150);
  
  textSize(45);
  text(text2From,410,150);
  textSize(20);
  text(text2Timestap,720,170);
  textSize(35);
  text(text2Message,410,200,800,150);
  
  fill(10,10,60);
  text(twit1From+" "+twit1Interaction+" \""+twit1description+"\" "+twit1TimeStamp
      ,410,300,500,300)


}

async function getWeatherData(){
  const response = await fetch('./weatherInfo.json');
  let weatherData = await response.json()
  temperature = weatherData[0].main.temp;
  weatherType = weatherData[0].weatherType[0].main;
  hiTemp=weatherData[0].main.temp_max;
  lowTemp=weatherData[0].main.temp_min;
  rainChance=weatherData[0].rain.h;
  return temperature,weatherType,hiTemp,lowTemp,rainChance;
}

async function getHealthData(){
  const response = await fetch('./healthInfo.json');
  let healthData = await response.json()
  heartRate = healthData[0].heart.current;
  heartAvg = healthData[0].heart.avg;
  steps = healthData[0].steps.current;
  stepAvg=healthData[0].steps.avg;
  cal = healthData[0].cal.burned;
  calAvg=healthData[0].cal.avg;
  return heartRate,heartAvg,steps,stepAvg,cal,calAvg;
}

async function getWeightData(){
  const response = await fetch('./weightInfo.json');
  let weightData = await response.json()
  currentWeight = weightData[0].weight.current;
  weekHigh = weightData[0].weight.weekHi;
  weekLow = weightData[0].weight.weekLow;
  return currentWeight,weekHigh,weekLow;
}

async function getnewsData(){
  const response = await fetch('./newsInfo.json');
  let newsData = await response.json()
  currentNewsTitle = newsData[0].mostRecent.title;
  currentNewsDate = newsData[0].mostRecent.date;
  currentNewsDesc = newsData[0].mostRecent.description;

  trendingNewsTitle = newsData[0].trending.title;
  trendingNewsDate = newsData[0].trending.date;
  trendingNewsDesc = newsData[0].trending.description;
  
  politicalNewsTitle = newsData[0].political.title;
  politicalNewsDate = newsData[0].political.date;
  politicalNewsDesc = newsData[0].political.description;
  
  return currentNewsTitle,currentNewsDate,currentNewsDesc,
  trendingNewsTitle,trendingNewsDate,trendingNewsDesc,
  politicalNewsTitle,politicalNewsDate,politicalNewsDesc;
}

async function getSocialData(){
  const response = await fetch('./socialInfo.json');
  let socialData = await response.json()
  smsNotifAmount = socialData[0].SMSNotificationAmount;
  text1From = socialData[0].SMS[0].from;
  text1Message = socialData[0].SMS[0].message;
  text1Timestap = socialData[0].SMS[0].timeStamp;
  text2From = socialData[0].SMS[1].from;
  text2Message = socialData[0].SMS[1].message;
  text2Timestap = socialData[0].SMS[1].timeStamp;

  twitterNotifAmount=socialData[0].TwitterNotificationAmount;
  twit1From=socialData[0].Twitter[0].from;
  twit1Interaction=socialData[0].Twitter[0].interaction;
  twit1description=socialData[0].Twitter[0].description;
  twit1TimeStamp=socialData[0].Twitter[0].timeStamp;

  return smsNotifAmount,text1From,text1Message,text1Timestap,
    text2From,text2Message,text2Timestap,
    twitterNotifAmount,twit1From,twit1Interaction,twit1description;
}

function clock()
{
 fill(30,30,30);
 textSize(50);
  textFont(clockFont);
  textAlign(LEFT, TOP);
  let Hour = hour();
  let min = minute();
  let noon = Hour >= 12? " PM" : " AM"
  if(min < 10)
    min = "0"+min
  Hour%=12
  text(Hour+":"+min+noon, 30, 30); 
}

function date()
{
 fill(30,30,30);
 textSize(50);
  textFont(clockFont);
  textAlign(LEFT, TOP);
  var currentYear = year();
  var currentMonth = month();
  var currentDay = day();
  var currentDate = currentMonth + '/' + nf(currentDay, 2) + '/' + nf(currentYear, 2);
  text(currentDate, 30, 100);
}


function draw() {
  
  background(60,60,60);
  image(imgMirror,0,0);
  image(imgPerson, 0, 0);
  
  fill(221,237,248);
  rect(10, 190, 300, 120, 20);
  image(iconWeather, 30, 200);
  fill(0);
  text(temperature+"º",180,230);
  
  healthColor = fill(247,148,148);
  healthColor;
  rect(10, 340, 300, 340, 20);
  image(iconHeart, 30, 350);
  image(iconSteps, 30, 460);
  image(iconCal, 30, 570);
  fill(0);
  text(heartRate+" bpm",140,380);
  text(steps,170,490);
  text(cal,170,600);


  weightColor = fill(180,190,229);
  weightColor;
  rect(10, 720, 300, 120, 20);
  image(iconWeight, 30, 730);
  fill(0);
  text(currentWeight,150,730);
  text("lbs",180,780)

  newsColor = fill(187,228,210);
  newsColor;
  rect(1090, 10, 400, 400, 20);
  image(iconNews, 1100, 30);
  fill(0);
  
  textSize(30);
  text(currentNewsTitle,1220,35,100,150);
  textFont('Helvetica');
  textSize(25);
  text(currentNewsDesc,1105,150,410,500);
  textFont('Georgia');
  textSize(50);

  socialColor = fill(245,226,210);
  socialColor;
  rect(1090, 450, 400, 530, 20);
  image(iconSMS, 1100, 460);
  fill(0);
  textSize(45);
  text(smsNotifAmount+" new notifications",1210,460,150,150);
  fill(0,40,0);
  textSize(30);
  text(text1From,1105,580)
  textSize(35);
  text(text1Message,1105,620,370,150)

  textSize(45);
  image(iconTwitter, 1100, 730);
  fill(0);
  text(twitterNotifAmount+" new notification",1210,730,150,150);
  fill(10,10,60);
  textSize(30);
  text(twit1From+" "+twit1Interaction+" "+twit1description,1105,850,370,150)

  textSize(50);
  basicInfoColor = fill(250);
  basicInfoColor;
  rect(10, 10, 300, 155, 20);
  clock();
  date();
  
  
  bWeather.draw();
  bHealth.draw();
  bWeight.draw();
  bNews.draw();
  bSocial.draw();
  if(fWeather)//checks if weather button was pressed
  {
    expandInfoWeather();
  }
  if(fHealth)//checks if weather button was pressed
  {
    expandInfoHealth();
  }
  if(fWeight)//checks if weather button was pressed
  {
    expandInfoWeight();
  }
  if(fNews)//checks if weather button was pressed
  {
    expandInfoNews();
  }
  if(fSocial)//checks if weather button was pressed
  {
    expandInfoSocial();
  }
  
  //whites
  noStroke();
  fill(255);
  circle(630,660,60);
  circle(750,660,60);
  //iris
  let xc =constrain(mouseX, 610, 645);
  let xs = constrain(mouseY, 640,675);
  let xd =constrain(mouseX, 730, 765);
  let xt = constrain(mouseY, 640,675);
  fill(0);
  circle(xc,xs,20);
  circle(xd,xt,20);
  //glare
  //fill(255);
  //circle(xc+20,xs-20,20);
}

