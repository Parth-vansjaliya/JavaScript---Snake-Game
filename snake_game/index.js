let inputDir = {x:0, y:0};
const foodSound = new Audio('./music/food.mp3');
const moveSound = new Audio('./music/move.mp3');
const musicSound = new Audio('./music/music.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
var speed = 7;
var lastPaintTime = 0;
var snakeArr = [
    {x:12, y: 13}
]
var food ={
    x: 5, y: 6
}
var score = 0;

// Game Functions

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr){

    for(let i=1; i < sarr.length; i++){
        if(sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y){
            return true;
        }
    }

    if(sarr[0].x >= 18 || sarr[0].x <=0 || sarr[0].y >= 18 || sarr[0].y <=0){
        return true;
    }
}

function gameEngine(){
    // update the snake
    if (isCollide(snakeArr)){
        // musicSound.pause();
        gameOverSound.play();
        inputDir = {x:0, y:0};
        alert('Game over, Please any key to restart the game.');
        snakeArr = [{x:12, y: 13}];
        score = 0;
    }

    // if you eaten the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        // console.log('before', snakeArr)
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y
        });
        // console.log('after', snakeArr)
        foodSound.play()
        var a = 2;
        var b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round((a + (b-a)*Math.random()))};
    }

    // Move the snake

    for (let i=snakeArr.length -2; i>=0; i--){
        // console.log('this is i', i)
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y

    // Display the snake
    document.querySelector('#board').innerHTML = '';
    snakeArr.forEach((el, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = el.y;
        snakeElement.style.gridColumnStart = el.x;
        if (index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        document.querySelector('#board').appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    document.querySelector('#board').appendChild(foodElement);

}


// Start all game main logic here

window.requestAnimationFrame(main);
document.addEventListener('keydown', (e)=>{
    inputDir = {x:0, y:1};
    // musicSound.play();
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            inputDir.x = 0;
            inputDir.y = -1;
            break;
    
        case 'ArrowDown':
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case 'ArrowRight':
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case 'ArrowLeft':
            inputDir.x = -1;
            inputDir.y = 0;
            break;        
        default:
            break;
    }
})

