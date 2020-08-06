var trex,trex_running,trex_collided;
var ground,invisibleGround,groundImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var cloudImage;
var obstaclesGroup,cloudsGroup;
var score;
var PLAY,END,gameState;
var gameOver,restart;
var gameOverImage,restartImage
function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage=loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  cloudImage = loadImage("cloud.png");
  trex_collided=loadImage("trex_collided.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");

}
function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,20,20);
  trex.addAnimation("running",trex_running);
  trex.addImage("collided",trex_collided);
  trex.scale = 0.5;
  ground = createSprite(300,180,600,20);
  ground.addImage(groundImage);
  ground.x = ground.width/2;
  invisibleGround = createSprite(300,185,600,5);
  invisibleGround.visible = false;
  obstaclesGroup=new Group();
  cloudsGroup=new Group();
  score = 0;
  PLAY=1;
  END=0;
  gameState=PLAY;
  gameOver = createSprite(300,100);
  restart = createSprite(300,140);
  gameOver.addImage(gameOverImage);
  restart.addImage(restartImage);
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;
}
function draw() {
  background("darkGray");
  
  text("score"+score,300,50);
  if(gameState === PLAY){
  if(keyDown("space") && trex.isTouching(ground)){
      trex.velocityY = -12 ;
    }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    score = score+Math.round(getFrameRate()/60);
    ground.velocityX = -5
     trex.velocityY = trex.velocityY + 0.8;
  trex.collide(invisibleGround);
    spawnObstacles();
  spawnClouds();
    if(obstaclesGroup.isTouching(trex)){
    gameState = END;
      
    }
  }
  else if(gameState === END){
  ground.velocityX= 0;
  trex.velocityY=0;
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  trex.changeAnimation("collided",trex_collided);
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
    reset();
    }
  }
  drawSprites();
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
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
        default:break;
    }
  
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.addImage(cloudImage);
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function reset() {
 gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  score = 0;
}