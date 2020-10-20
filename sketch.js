//Creating sprite using sprite sheets for animation

let museum;
let bgX = 0, bgY = 0;
let pX = 250, pY = 250;
let pW = 200, pH = 200;
let speed = 5;
let inform;

class Painting{
  loadedImage;
  paintX;
  paintY;
  analysis;
  constructor(img, x, y, s){
    this.loadedImage = img;
    this.paintX = x;
    this.paintY = y;
    this.analysis = s;
  }
  placeOnWall(){
    image(this.loadedImage, this.paintX, this.paintY);
  }
  moveWithWall(amount){
    this.paintX = this.paintX + amount;
  }
  displayBigArt(){
    image(this.loadedImage, 250, 100, 272, 272);
    textSize(24);
    fill(0, 0, 0);
    text(this.analysis, 50, 450, 500, 500); 
  }
  displayBigStatue(){
    image(this.loadedImage, 250, 100, 272, 544);
    textSize(24);
    fill(0, 0, 0);
    text(this.analysis, 50, 400, 500, 500); 
  }
}

function preload() {
  // Load the json for the tiles sprite sheet
  museum = loadImage("assets/museumP.png");
  guy_stand = loadImage("assets/guy_stand.png");
  guy_standL = loadImage("assets/standL.png");
  guy_back = loadImage("assets/viewWall.png");
  objective1 = loadImage("assets/objective.png");
  walk_right_sheet = loadSpriteSheet('assets/walk_right.png', 200, 200, 5);
  walk_left_sheet = loadSpriteSheet('assets/walk_left.png', 200, 200, 5);
  walkingAnimationR = loadAnimation(walk_right_sheet);
  walkingAnimationL = loadAnimation(walk_left_sheet);

  img1 = loadImage("assets/painting1.png");
  painting1 = new Painting(img1, 400, 140, "It is definitely forboding, but I'm not sure what I'm looking at. I'll find something else.");
  img2 = loadImage("assets/umbrellaPainting.png")
  painting2 = new Painting(img2, 1000, 140, "This umbrella seems sad and... thats all I've got. I'll find something else.");
  img3 = loadImage("assets/belly.png")
  painting3 = new Painting(img3, 1600, 140, "This is too painful right now. I'll find something else.");
  img4 = loadImage("assets/lombo.png")
  sculpt1 = new Painting(img4, 2200, 110, "This guy looks wierd. Like he doesnt know what he is doing, and is afraid he will suck the life out of everything. Wait, im projecting. I'll find something else.");
  img5 = loadImage("assets/sculpture.png")
  sculpt2 = new Painting(img5, 2800, 110, "I'm not old enough to speak to the nostalgia this collection of toys invokes. I'll find something else.");

  allart = [painting1, painting2, painting3, sculpt1, sculpt2];
  
}

function setup() {
  createCanvas(704, 512);
  inform = document.createElement("h1");


}

function movePlayer(){
  //MOVE RIGHT
  if (keyIsDown(68)){
      if  (bgX > -3392 && pX >= 250){
        bgX = bgX - speed;
        relocateArts(-1 * speed);
        animation(walkingAnimationR, pX + 100, pY + 100);

    } else if ( pX < 550){
        pX = pX + speed;
        animation(walkingAnimationR, pX + 100, pY + 100);
    } else {
      image(guy_stand, pX, pY);
    }
  }
  //MOVE LEFT
  else if (keyIsDown(65)){
    if (bgX < 0 && pX <= 250){
      bgX = bgX + speed;
      relocateArts(speed);
      animation(walkingAnimationL, pX + 100, pY + 100);
    } else if (pX > -20){
      pX = pX - speed;
      animation(walkingAnimationL, pX + 100, pY + 100);
    } else {
      image(guy_standL, pX, pY);
    }
  }
  //MOVE DOWN
  else if (keyIsDown(83)){
    if (pY <= 370){
      pY = pY + speed;
      animation(walkingAnimationL, pX + 100, pY + 100);
    } else {
      image(guy_stand, pX, pY);
    }
    //MOVE Up
  } else if (keyIsDown(87)){
    if (pY >= 200){
      pY = pY - speed;
      animation(walkingAnimationL, pX + 100, pY + 100);
    } else {
      image(guy_stand, pX, pY);
    }
  } else if(keyIsDown(32)){
      //Turn around
      image(guy_back, pX, pY);
      if(0 >= bgX && bgX >= -200){
        allart[0].displayBigArt();
      } else if(-600 >= bgX && bgX >= -825){
        allart[1].displayBigArt();
      } else if(-1220 >= bgX && bgX >= -1430){
        allart[2].displayBigArt();
      } else if(-1840 >= bgX && bgX >= -1995){
        allart[3].displayBigStatue();
      } else if(-2450 >= bgX && bgX >= -2585){
        allart[4].displayBigStatue();
      }

  }else{
    //Foolish way to make person stand in door correctly. Stretch goal : Fix this
    if(pX <= 0){
      image(guy_standL, pX, pY)
    } else {
      image(guy_stand, pX, pY);
    }
  }
  return false;
}



function displayObjective(){
  image(objective1, 100, 10);
}

function relocateArts(speed){
  painting1.moveWithWall(speed);
  painting2.moveWithWall(speed);
  painting3.moveWithWall(speed);
  sculpt1.moveWithWall(speed);
  sculpt2.moveWithWall(speed);
}

function displayArts(){
  painting1.placeOnWall();
  painting2.placeOnWall();
  painting3.placeOnWall();
  sculpt1.placeOnWall();
  sculpt2.placeOnWall(speed);
}
  

function draw() {
  clear();
  image(museum, bgX, bgY);
  displayObjective();
  displayArts();
  movePlayer();
  //console.log(bgX);
}

