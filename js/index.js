
const board = document.querySelector('.board')
const currentMove = document.querySelector('.current-move')
const newGameBtn = document.querySelector('.new-game')
const hardLevelBtn = document.querySelector('.hard-level')
let list;
const moveList = document.querySelector('.move-list')

let arrListMove = []
let boardArray = []
const arrWinner = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

let end = false
let nextMoveX = true
let moveIndex = 0
let randomIndex = false;
let arrayX = []
let arrayY = []
let winX = false
let hardLevel = false

createGame()

board.addEventListener('click', writeXO)
board.addEventListener('mouseover', mouseMoveOver)
board.addEventListener('mouseout', mouseMoveOut)
newGameBtn.addEventListener('click', newGame)
moveList.addEventListener('click', getBackToMove)
hardLevelBtn.addEventListener('click', hardLevelFunction)

function hardLevelFunction() {
  hardLevelBtn.classList.toggle('hard-level-color')
  if(hardLevelBtn.classList.contains('hard-level-color')) {
    hardLevel = true
  } else {
    hardLevel = false
  }
  
}

function random(number) {
  let random = Math.floor(Math.random() * number) 
  return random
}

function writeProgramO(ind) {
        boardArray[ind] = 'Y'
        document.querySelector(`.item-${ind}`).textContent = 'O'
        document.querySelector(`.item-${ind}`).style.backgroundColor = 'rgb(236, 217, 161)'
        nextMoveX = true
        currentMove.textContent = `Next move: X`
        arrayY.push(ind)
        addItemToList()
        arrListMove[moveIndex] = [...boardArray]
      //console.log('', arrListMove);      
        if (moveIndex > 3 ) {
          whoWin()
        }
        moveIndex++ 
}
function programsMove() {
  randomIndex = thirdNumberX(arrayY)
  console.log('randomIndex ', randomIndex);  
  if(randomIndex !== false) {
    writeProgramO(randomIndex)
  } else {
    randomIndex = thirdNumberX(arrayX)
    if(randomIndex !== false) {
      writeProgramO(randomIndex)
    }
  }

  while(!nextMoveX) {
    randomIndex = random(8)
    if(boardArray[randomIndex] == false){ 
      writeProgramO(randomIndex) 
        /*boardArray[randomIndex] = 'Y'
        document.querySelector(`.item-${randomIndex}`).textContent = 'O'
        document.querySelector(`.item-${randomIndex}`).style.backgroundColor = 'rgb(236, 217, 161)'
        nextMoveX = true
        currentMove.textContent = `Next move: X`
        arrayY.push(randomIndex)
      
      addItemToList()
      arrListMove[moveIndex] = [...boardArray]
      //console.log('', arrListMove);      
      if (moveIndex > 3 ) {
        whoWin()
      }
      moveIndex++  
      */
    }  
  }
}

function thirdNumberX (array) {
  let futureY= false
  if(hardLevel){
    if(boardArray[4] == false) {
    futureY = 4
    return futureY;
    } else {
    if(moveIndex == 1) {
      let arrRandom = [0,2,6,8]
      let randomNumber = random(3)
      console.log('random', randomNumber);      
      futureY = arrRandom[randomNumber]
      console.log('futureY ' , futureY);      
      return futureY
    }
    }
  }
  
  for(let i = 0; i < 8; i++) {
    let x = 0
    futureY = false
    for(let j = 0; j < 3; j++) {
      if(array.includes(arrWinner[i][j])) {
        x++        
        //console.log('x = ', x); 
        //if (x == 3) winX = true       
        //console.log('winx = ', winX); 
      } else {
          futureY = arrWinner[i][j]
          console.log('futureY ', futureY);
          
      }     
    }
    if (x == 2 && boardArray[futureY] == false) {
      return futureY
    }
  }
  return false
}
function mouseMoveOver(event) {
  let target = event.target.closest('.square')
  const index = +target.className.split(' ')[1].split('-')[1]
  if(!target) return
  if(boardArray[index] == false) {
    target.style.backgroundColor = nextMoveX ? 'rgb(183, 189, 243)' : 'rgb(236, 217, 161)'
  }
}
function mouseMoveOut(event) {
  let target = event.target.closest('.square')
  const index = +target.className.split(' ')[1].split('-')[1]
  if(!target) return
  if(boardArray[index] == false) {
    target.style.backgroundColor = ''
  }
}

/*function mouseMove(event) {
  const target = event.target.closest('.square')
  const relatedTarget = event.relatedTarget.closest('.square')
  const relatedIndex = +relatedTarget.className.split(' ')[1].split('-')[1]
  const index = +target.className.split(' ')[1].split('-')[1]
  if(boardArray[index] == false) {
    target.style.backgroundColor = nextMoveX ? 'rgb(183, 189, 243)' : 'rgb(236, 217, 161)'
  }
  if(boardArray[relatedIndex] == false) {
    relatedTarget.style.backgroundColor = ''
  }
} 
*/

function getBackToMove(event) {
  end = false
  const target = event.target.closest('.item')
  const number = +target.className.split(' ')[0].split('-')[1]
  console.log('', target);
  console.log('number', number);
  console.log('moveIndex', moveIndex);

  for(let i = 0; i < moveIndex - number - 1; i++){
    list.lastElementChild.remove()
    console.log('i ', i);    
    arrListMove.pop()
  }
  moveIndex =  number + 1
  console.log('moveIndex', moveIndex);
  

  const currentArray =[...arrListMove[moveIndex-1]]
  console.log('', currentArray);
  nextMoveX =  moveIndex % 2 == 0 ? true : false
  currentMove.textContent = nextMoveX ? 'Next move : X' : 'Next move : Y'
  boardArray = [...currentArray]  
  arrayX = []
  arrayY = []
  for(let i = 0; i < 9; i++) {
    if(currentArray[i] == false) { 
     // boardArray[i] = false
      document.querySelector(`.item-${i}`).textContent = ``
      document.querySelector(`.item-${i}`).style.backgroundColor = ``
    } else {
      if (currentArray[i] == 'X') {
        document.querySelector(`.item-${i}`).style.backgroundColor = `rgb(183, 189, 243)`
        arrayX.push(i)
      } else {
        document.querySelector(`.item-${i}`).style.backgroundColor = `rgb(236, 217, 161)`
        arrayY.push(i)
      }
    }
  }
}

function whoWin() {
  
  for(let i = 0; i < 8; i++) {
    let x = 0
    let y = 0
    for(let j = 0; j < 3; j++) {
      if(arrayX.includes(arrWinner[i][j])) {
        x++
        //console.log('x = ', x); 
        //if (x == 3) winX = true       
        //console.log('winx = ', winX); 
      }
      if(arrayY.includes(arrWinner[i][j])) {
        y++
      }
    }
    if (x == 3) {
      winnerStyle(i)
      end = true; 
      return currentMove.textContent = 'Winner X'
    }
    if (y == 3)  {
      winnerStyle(i)
      end = true
      return currentMove.textContent = 'Winner Y'
    }

    if(i == 7 && x < 3 && y < 3 & moveIndex > 7){
      end = true
      currentMove.textContent = 'Draw'
    }
  }
}

function winnerStyle(i) {
  for( let j = 0; j < 3; j++) {
    document.querySelector(`.item-${arrWinner[i][j]}`).style.backgroundColor = 'gold'
  }
}
function addItemToList() {
  const item = `
    <button class="it-${moveIndex} item"> Go to move : ${moveIndex+1}</button>
  `
  list.insertAdjacentHTML('beforeend', item)
}

function writeXO(event) {
  if(end) {
    return
  }
  const target = event.target.closest('.square')
  const index = +target.className.split(' ')[1].split('-')[1]
 // console.log(target);
  //target.textContent = 'kjkbkhb'
 // console.log(index);
  if(boardArray[index] == false){  
    if(nextMoveX) {
      boardArray[index] = 'X'
      target.textContent = 'X'
      target.style.backgroundColor = 'rgb(183, 189, 243)'
      //document.querySelector(`item-${index}`).textContent = 'X'
      nextMoveX = false
      currentMove.textContent = `Next move: O`
      arrayX.push(index)
    } else {
      boardArray[index] = 'Y'
      target.textContent = 'O'
      target.style.backgroundColor = 'rgb(236, 217, 161)'
      //document.querySelector(`item-${index}`).textContent = 'Y'
      nextMoveX = true
      currentMove.textContent = `Next move: X`
      arrayY.push(index)
    }
    addItemToList()
    //arrListMove.push(boardArray)
    arrListMove[moveIndex] = [...boardArray]
    //console.log('', arrListMove);
    
    if (moveIndex > 3 ) {
      whoWin()
    }
    moveIndex++
  }
  if(end) {
    return
  }
  if(!nextMoveX) {
    programsMove()
  }
}

function newGame() {
  //futureY = false
  arrayX = []
  arrayY = []
  moveIndex = 0
  nextMoveX = true
  currentMove.textContent = 'Next move : X'
  list.remove()
  moveList.insertAdjacentHTML('afterbegin', `<div class="list"> </div`)
  list = document.querySelector('.list')
  for(let i = 0; i < 9; i++) {
    boardArray[i] = false
    document.querySelector(`.item-${i}`).textContent = ``
    document.querySelector(`.item-${i}`).style.backgroundColor = ``
  }
  //console.log('new game');
  end = false
}

function createGame() {
  moveIndex = 0
  for( let i = 0; i < 9; i++) {
    const el = `
      <div class="square item-${i}"></div>
    `
    //boardArray.push(null)
    boardArray[i] = false
    board.insertAdjacentHTML('beforeend', el)
  }
  moveList.insertAdjacentHTML('afterbegin', `<div class="list"> </div`)
  list = document.querySelector('.list')
  console.log('board ', boardArray);
  
}