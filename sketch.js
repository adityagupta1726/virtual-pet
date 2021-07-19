var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastfeed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed the dog"); feed.position(700,95); feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime=database.ref('fedTime')
  feedTime.on("value",function(data){
    lastfeed=data.val()
  }
  )
  fill (255,255,254)
  textSize(20)
  if(lastfeed>=12){
    text("lastfeed"+lastfeed%12+"pm",350,30)
  }
  else if(lastfeed==0){
    text("lastfeed:12am",350,30)
  }
  else{
    text("lastfeed"+lastfeed+"am",350,30)
  }
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
var foodvalue=foodObj.getFoodStock()
if(foodvalue<=0){
  foodObj.updateFoodStock(foodvalue*0)
}
else{
  foodObj.updateFoodStock(foodvalue-1)
}
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  fedTime:hour()
})

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
