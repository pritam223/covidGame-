var man , manImg;
var doctor , doctorImg ;
var clinic ;
var covid , covidImg ;
var gameState = 0 ;
var covidGroup ;
var database , position ;
var score =  0 ;

function preload(){
 manImg = loadImage ("boy.png") ;
 doctorImg = loadImage("download.jpg") ;
 covidImg = loadImage("covidImg.jpeg") ;
 illMan = loadImage("illMan.jpg") ;
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  man = createSprite(50, displayHeight-100, 50, 50);
  man.addImage(manImg) ;
  man.scale = 0.06 ;
  man.setCollider("circle",0,0,400) ;

 database = firebase.database() ;
 var manPositionRef = database.ref("man/position") ;
 manPositionRef.on("value", readPosition,showError) ;


  clinic = createSprite(displayWidth-100,20,100,100) ;
  clinic.shapeColor = "white" ;

  doctor = createSprite(displayWidth-100,50,20,20) ;
  doctor.addImage(doctorImg) ;
  doctor.scale = 0.5 ;

  ground = createSprite(displayWidth/2,displayHeight-20,displayWidth*2,20) ;
  ground.shapeColor = "brown" ;
  ground.velocityX = -3 ;
  ground.x = ground.width/2 ;

  covidGroup = new Group() ;
  
}

function draw() {
  background(0);  
  stroke("white") ;
  fill("white")
  textSize(20) ;
 text("Score : "+score,50,50) ;

  if(gameState === 0){
     if(ground.x<0){
    ground.x = ground.width/2 ;
  }
  score=score+Math.round(frameRate()/60) ;
// man.x = World.mouseX ;
// man.y = World.mouseY ;
  if(keyDown("w")){
    writePosition(0,-5) ;
  }

  if(keyDown("s")){
    writePosition(0,5) ;
  }

  if(keyDown("d")){
  writePosition(5,0);
  }

  if(keyDown("a")){
   writePosition(-5,0);
  } 
  spawnCovid() ;
  console.log(covidGroup) ;
  if(man.collide(covidGroup)){
   gameState = 1 ;
   console.log(gameState) ;
  }
  }

  if(gameState===1){
   ground.velocityX = 0 ;
   man.addImage(illMan) ;
   man.scale = 0.52 ;
   man.x = displayWidth-220;
   man.y = 50 ;
  }

  

man.collide(ground) ;
man.debug = true ;

 
  drawSprites();
}

function spawnCovid(){
  if(frameCount%100===0){
    covid = createSprite(displayWidth,displayHeight-20,20,20) ;
    covid.addImage(covidImg) ;
    covid.setLifetime = 267 ;

    covid.scale = 0.04;
    covid.velocityX = -3 ;
    covid.y = Math.round(random(90,displayHeight-20)) ;
    if(score%100===0){
       covid.velocityX = -6 ;
    }
    covidGroup.add(covid) ;

  }
  

}

function readPosition(data){
  position = data.val() ;
  console.log(data.val()) ;
  man.x = position.x ;
  man.y = position.y ;

}

function writePosition(x,y){
  database.ref("man/position").set({
    'x' : man.x+x,
    'y' : man.y+y
  })
}

function showError(){
  console.log("error in reading and writing in database") ;
}