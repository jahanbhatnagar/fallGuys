class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    guys1 = createSprite(100,200);
    guys1.addImage("guys1",guysimg1);
    guys1.scale = 0.3;
    guys2 = createSprite(300,200);
    guys2.addImage("guys2",guysimg2);
    guys2.scale = 0.3;
    guys3 = createSprite(500,200);
    guys3.addImage("guys3",guysimg3);
    guys3.scale = 0.3;
    guys4 = createSprite(700,200);
    guys4.addImage("guys4",guysimg4);
    guys4.scale = 0.3;
    guys = [guys1, guys2, guys3, guys4];
    spring2 = createSprite(displayWidth/2,200,200,200)
    spring2.addAnimation("spring2",spring2img);
    spring2.scale = 1;
    ball = createSprite(displayWidth/2,700);
    ball.addImage("ball",ballimg);
    ball.velocityX= 6;
    ball.scale = 0.08;
    ball1 = createSprite(displayWidth/2,400);
    ball1.addImage("ball1",ball1img);
    ball1.velocityX = -6;
    ball1.scale = 0.08;
  console.log(ball.x);
   
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarAtEnd();
    if(allPlayers !== undefined){
      background("pink");
      image(track, 100,-displayHeight*4,displayWidth-200, displayHeight*7);
      
 
      if(guys1.x<150){
        text("you are eliminated"+player.name,displayWidth/2,guys1.y)
      }else if(guys2.x<150){
        text("you are eliminated"+player.name,displayWidth/2,guys2.y)
      }else if(guys3.x<150){
        text("you are eliminated"+player.name,displayWidth/2,guys3.y)
      }else if (guys4.x<150){
        text("you are eliminated"+player.name,displayWidth/2,guys4.y)
      }
      if(guys1.x>750){
        text("you are eliminated"+player.name,displayWidth/2,guys1.y)
      }else if(guys2.x>750){
        text("you are eliminated"+player.name,displayWidth/2,guys2.y)
      }else if(guys3.x>750){
        text("you are eliminated"+player.name,displayWidth/2,guys3.y)
      }else if (guys4.x>750){
        text("you are eliminated"+player.name,displayWidth/2,guys4.y)
      }
      //index of the array
      var index = 0;

      //x and y position of the guys
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the guys a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the guys in y direction
        y = displayHeight - allPlayers[plr].distance;
        guys[index-1].x = x;
        guys[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          guys[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = guys[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW)&&player.index !==null){
      player.x = player.x+5;
    }
    if(keyIsDown(LEFT_ARROW)&&player.index !==null){
      player.x = player.x-5;
    }
    if(keyIsDown(DOWN_ARROW)&&player.index !==null){
      player.distance -= 10;
    }
    if(player.distance > 3800){
      gameState = 2;
      player.rank+=1
      Player.updateCarAtEnd(player.rank);
      textSize(25);
      text("your Rank:"+player.rank,displayWidth/2-50,y-120)
    }
   
    drawSprites();
    
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank)
  }
}
