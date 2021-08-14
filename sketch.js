var runner,trex_running
var ground,groundImage ,invisibleGround
var gameOver,gameoverImg

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  groundImage=loadImage("ground2.png")
  
   
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  gameoverImg = loadImage("gameover.png");
}

function setup() {
  createCanvas(600,200);
 
 runner = createSprite(50, 180, 20, 50);
 ground = createSprite(100,180,800,20);
 gameOver = createSprite(300,100,100,100);

 ground.addImage("ground",groundImage);
 runner.addAnimation("running",trex_running);
 runner.scale=0.5
 gameOver.addImage("gameover", gameoverImg)
 gameOver.scale = 0.1
 gameOver.visible =  false;

 invisibleGround = createSprite(200,190,400,10);
 invisibleGround.visible = false;

 obstaclesGroup = new Group();

 count = 0;
}

function draw() {
  background(255,225,255)
 
   ground.velocityX=-4
   ground.velocityX = -(6 + 3*count/100);
  runner.collide(invisibleGround)

 
  if(keyDown("space")){
runner.velocityY=-12
  }

  runner.velocityY=runner.velocityY+0.8;

  if(ground.x<0){
  ground.x=ground.width/2
  }
  

 spawnObstacles();

 if(obstaclesGroup.bounceOff(runner)){
  
  gameOver.visible = true;
  runner.visible = false;
  
  
  
  
}

  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(200,160,10,50);
    
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}