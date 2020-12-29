
var monkey , monkey_running,gameover,gameoverimg;
var banana ,bananaImage, obstacle, obstacleImage,restart,gameover,gameoverimg,restartimg;
var FoodGroup, obstacleGroup
var survivalTime=0;
var Play=1,End=0,gameState=1;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameoverimg =loadImage("gameOver.png")
  restartimg=loadImage("restart.png");
}



function setup() {
createCanvas(600,600);  
monkey=createSprite(80,530,15,15)
 monkey.addAnimation("running",monkey_running); 
monkey.scale=0.129;
ground=createSprite(300,550,1200,10);
ground.velocityX=-4;
FoodGroup=createGroup();
obstacleGroup=createGroup();
gameover=createSprite(300,250,10,10);
gameover.addImage(gameoverimg);
gameover.scale=0.55;
restart=createSprite(300,300,10,10);
restart.addImage(restartimg);
restart.scale=0.55;
}


function draw() {
background("lightblue");
if(gameState===Play)
{if(keyDown("space")&&monkey.y>=450){
monkey.velocityY=-12;
}  
monkey.velocityY=monkey.velocityY+0.9;
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
restart.visible = false;
gameover.visible = false;
monkey.collide(ground);
createobstacles();
createbanana();
if(monkey.isTouching(FoodGroup)){
FoodGroup.destroyEach();
}
if(monkey.isTouching(obstacleGroup)){
gameState=End;
}}
if(gameState===End)
{
restart.visible = true;
gameover.visible = true;
 ground.velocityX=0;
monkey.collide(ground);
obstacleGroup.setVelocityXEach(0);
FoodGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);
FoodGroup.setLifetimeEach(-1);  
if(mousePressedOver(restart)){
gameState=Play;
FoodGroup.destroyEach();
obstacleGroup.destroyEach();
survivalTime=0;
}
}  

  
  
drawSprites();
stroke("black");
textSize(20);
fill("white");
text("Survival Time : "+ survivalTime,200,50);
survivalTime=Math.ceil(frameCount/frameRate())
}
function createobstacles(){
if(frameCount%300===0){
obstacle=createSprite(600,530,10,10);
obstacle.addImage(obstacleImage);
obstacle.scale=0.1;
obstacle.velocityX=-6;
obstacle.lifetime=100;
obstacleGroup.add(obstacle);
}
}
function createbanana(){
if(frameCount%100===0){
banana=createSprite(600,Math.round(random(370,420)),10,10);
banana.addImage(bananaImage);
banana.scale=0.08;
banana.velocityX=-6;
banana.lifetime=100;
FoodGroup.add(banana);
}
}



