var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;

  ghost = createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;

 // spookySound.loop();

  
}

function draw() {
  background(200);
  
  if(gameState == "play"){
  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("space")){
    ghost.velocityY = -5;
  }

  ghost.velocityY = ghost.velocityY + 0.8;

  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }

  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }

  

  if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
  }

  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
  }

    spawnDoor();

    drawSprites();
}

  if (gameState == "end"){
    textSize(30);
    fill("red");
    text("Game Over", 230, 250);

  }

}

function spawnDoor(){
  if(frameCount % 160 == 0){
    door = createSprite(200,50);
    door.x = Math.round(random(120,400));
    door.addImage(doorImg);
    door.velocityY = 3;
    doorsGroup.add(door);
    door.lifetime = 800;

    climber = createSprite(200,120);
    climber.x = door.x;
    climber.addImage(climberImg);
    climber.velocityY = 3;
    climbersGroup.add(door);
    climber.lifetime = 800;

    invisibleBlock = createSprite(200,120);
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 3;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.lifetime = 800;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.visible = false;

    

    ghost.depth = door.depth;

    ghost.depth += 1;
  }
}
