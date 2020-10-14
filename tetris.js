const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20);

context.fillStyle = '#00000';
context.fillRect(0,0, canvas.width, canvas.height);
//for random block getting
const blocks=["t","z","s","o","i","l","j"];
//Block matrixes
const tBlock = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
];
const zBlock = [
    [0,0,0],
    [1,1,0],
    [0,1,1],
];
const sBlock = [
    [0,0,0],
    [0,1,1],
    [1,1,0],
];
const oBlock = [
    [1,1],
    [1,1],
];
const iBlock = [
  [1,0,0,0],
  [1,0,0,0],
  [1,0,0,0],
  [1,0,0,0],
];
const lBlock = [
    [0,0,0],
    [1,0,0],
    [1,1,1],
];
const jBlock = [
    [0,0,0],
    [0,0,1],
    [1,1,1],
];
//Game matrix, 0 = empty, 1= has block
var gameMatrix =[
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]
];
var level=0;
var score;
var currentBlockX;
var currentBlockY;
var currentBlockT;
var timer = 10000/(level+1);
var gameOn=true;
var interval;
/*
* Main game function, gives random block after block is set
*/
function newBlock(){
    currentBlockT= giveType(blocks[(Math.floor(Math.random() * 6))]);
    currentBlockX=5;
    currentBlockY=5;
    return currentBlockT;
}

drawMatrix(newBlock(),5,5,'white')
if(currentBlockT!==null){
  resetTimer();
  console.log("tiemr");
}
//drawMatrix(gameMatrix,0,0,'white')
/*
* called everytime the counter ends, checks if the block should be set or go down
*/
function dropByTimer(){
  if(!checkColisionDown()){
    moveDown();
  }
  //setBlock();
  //resetTimer();
}
/*
*moves blocks right, checks nothing
*/
function moveRight(){
  drawMatrix(currentBlockT, currentBlockX,currentBlockY,"black");
  currentBlockX=currentBlockX+1
  drawMatrix(currentBlockT, currentBlockX,currentBlockY, "white");
  drawMatrix(gameMatrix, 0,0);
}
/*
* moves block right, checks nothing
*/
function moveLeft(){
  drawMatrix(currentBlockT, currentBlockX,currentBlockY,"black");
  currentBlockX=currentBlockX-1
  drawMatrix(currentBlockT, currentBlockX,currentBlockY, "white");
  drawMatrix(gameMatrix, 0,0);
}
/*
* moves block down, checks nothing
*/
function moveDown(){
  drawMatrix(currentBlockT, currentBlockX,currentBlockY,"black");
  currentBlockY=currentBlockY+1
  drawMatrix(currentBlockT, currentBlockX,currentBlockY, "white");
  drawMatrix(gameMatrix, 0,0);
}

/*
* Updates timer and restarts interval
*/
function resetTimer(){
  timer = 1000/(level+1);
  clearInterval(interval);
  interval = setInterval(dropByTimer(), timer);
}
/*
* With left or right input checks colision, if true theres a block or wall blocking movement
*/
function colisionSides(direction){
  if(direction=="right"){
    if(currentBlockY+1!==0 || currentBlockY+1==9){
      return false;
    }else{
      return true;
    }
  }
  if(direction=="left"){
    if(currentBlockY-1!==0|| currentBlockY-1==0){
      return false;
    }else{
      return true;
    }
  }
}

/*
* Checks if there a block down, returns true if thats the case
*/
function checkColisionDown(){
  if(gameMatrix[currentBlockX][currentBlockY+1]==1){
    return true;
  }else{
    return false;
  }
}

function checkColision(block, gMatrix){
  return false
}

/*
* Updates gameMatrix grafically
*/
function updateBoard(){
  drawMatrix(gameMatrix, 0,0, "white");
}
/*
* user controls
*/
document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
      //left
        moveLeft();
        updateBoard();
    } else if (event.keyCode === 39) {
      //if(colisionSides("right")){
          moveRight();
          updateBoard();
      //}
    } else if (event.keyCode === 40) {
        //down
        dropByTimer();
    } else if (event.keyCode === 81) {
      //q???
        console.log(81);
    } else if (event.keyCode === 38||event.keyCode === 18) {
        console.log("hola");
        if(true){
          drawMatrix(currentBlockT,currentBlockX,currentBlockY,"black");
          currentBlockT=rotate(currentBlockT, 1);
          drawMatrix(currentBlockT,currentBlockX,currentBlockY,"white");
        }else{

        }
        updateBoard();
    }
});

/*
* returns a block array given the letter
*/
function giveType(foo){
  if(foo=="t"){
    return tBlock;
  }
  if(foo=="z"){
    return zBlock;
  }
  if(foo=="s"){
    return sBlock;
  }
  if(foo=="o"){
    return oBlock;
  }
  if(foo=="i"){
    return iBlock;
  }
  if(foo=="l"){
    return lBlock;
  }
  if(foo=="j"){
    return lBlock;
  }
}


/*
* Rotates a given block (it doesnt check if it can rotate)
*/
function rotate(matrix){
  var newMatrix= [];
    for(i=0; i<matrix[0].length; i++){
      let row = matrix.map(e => e[i]).reverse();
      newMatrix.push(row);
    }
  return newMatrix;
}

function drawMatrix(matrix, xi, yi, color){
  matrix.forEach((row, y) =>{
    row.forEach((value, x) =>{
      if(value == 1){
        context.fillStyle = color;
        context.fillRect(x+xi, y + yi, 1, 1);
      }

  });
  });
}
