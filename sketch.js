var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var guys,guys1,guys2,guys3,guys4,ball,ballimg,ball1,ball1img;

var guysimg1,guysimg2,guysimg3,guysimg4;
var spring1,spring1img,spring2,spring2img;
function preload(){
  track = loadImage("images/track.jpg");
  guysimg1 = loadImage("images/man1.png");
  guysimg2 = loadImage("images/man2.png");
  guysimg3 = loadImage("images/man3.png");
  guysimg4 = loadImage("images/man4.png");
  ground = loadImage("images/ground.png");
  spring1img = loadAnimation("images/f1.png","images/f2.png","images/f3.png","images/f4.png","images/f5.png"
  ,"images/f6.png","images/f7.png");
  spring2img = loadAnimation("images/p1.png","images/p2.png","images/p3.png","images/p4.png","images/p5.png"
  ,"images/p6.png","images/p7.png");
  ballimg = loadImage("images/ball.png");
  ball1img = loadImage("images/ball1.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
 
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  background("white")
  
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
    spring1 = createSprite(displayWidth/2,600,200,200);
    guys1.bounce(guys2);
    guys1.bounce(guys3);
    guys1.bounce(guys4);
    guys2.bounce(guys3);
    guys2.bounce(guys4);
    guys3.bounce(guys4);
        
         if(guys1.isTouching(spring1)){
          guys1.bounceOff(spring1);
          }
          if(guys2.isTouching(spring1)){
            guys2.bounceOff(spring1);
            }
            if(guys3.isTouching(spring1)){
        //      guys3.bounceOff(spring1);
        guys3.x = 800;
              }
          if(guys4.isTouching(spring1)){
            guys4.bounceOff(spring1);
            }
    
  }
  if(gameState === 2){
    game.end();
  }
}
