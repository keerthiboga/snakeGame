let inDirection={x:0,y:0};//here we are using it to track direction
let snakePosArr=[{x:6,y:13}];
let board=document.querySelector('.board');
const gameMusic=new Audio('./audios/music-for-game.mp3');
const foodMusic=new Audio('./audios/food.mp3');
const gameOver=new Audio('./audios/game-over.mp3');
const scoreDiv=document.querySelector(".score");
const hiscoreDiv=document.querySelector(".highScore");
const feedback=document.querySelector(".feedback"); 
let prevPaint=0;
const speed=7;
let a=1,b=19;
let food={x:3,y:6};
let score=0,highscore=0;
window.addEventListener('keydown',(event)=>
{
    //here event.key returns the key value which is pressed 
    switch(event.key)
    {
       case "ArrowUp":
            inDirection.x=-1;
            inDirection.y=0;
            break; 
       case "ArrowDown":
            inDirection.x=1;
            inDirection.y=0;
            break; 
       case "ArrowLeft":
            inDirection.x=0;
            inDirection.y=-1;
            break; 
       case "ArrowRight":
            inDirection.x=0;
            inDirection.y=1;
            break; 
        default:
            break;
    }
});
//here the main logic of game starts
function main(curr)
{
    window.requestAnimationFrame(main);
    if(((curr-prevPaint)/1000) < (1/speed))
    {
        return ;
    }
    prevPaint=curr;
    game();
}
//the game collided
function collided()
{
    gameOver.play();
    gameOver.currentTime=0;
    snakePosArr=[{x:10,y:12}];
    inDirection={x:0,y:0};
    if(score>highscore)
    {
        highscore=score;
        hiscoreDiv.innerText=`High Score: ${highscore}`;
        feedback.innerText='You have done a great job!Keep going.';
    }
    food={x:Math.floor(a+(b-a)*Math.random()),y:Math.floor(a+(b-a)*Math.random())};
}
//here the game starts 
function game()
{
     //if snake cross boundary then we need to quit the game
    if(snakePosArr[0].x>=20 || snakePosArr[0].y>=20 || snakePosArr[0].x<=0 || snakePosArr[0].y<=0)
    {
        collided();
        score=0;
        scoreDiv.innerText=`score: ${score}`;
        feedback.innerText="let's beat the highscore now!";
    }
    for(let i=1;i<snakePosArr.length;i++)
    {
        if(snakePosArr[i].x===snakePosArr[0].x && snakePosArr[i].y===snakePosArr[0].y)
        {
            collided();
            score=0;
            scoreDiv.innerText=`score: ${score}`;
            feedback.innerText="let's beat the highscore now!";
        }
    }
    //movement of snake
    for(let i=snakePosArr.length-2;i>=0;i--)
    {
        snakePosArr[i+1]={...snakePosArr[i]};
    }
    snakePosArr[0].x+=inDirection.x;
    snakePosArr[0].y+=inDirection.y;
     //update snake if it eats its food----we have increase the size of snake and we have generate food and score to be incremented
     if(snakePosArr[0].x===food.x && snakePosArr[0].y===food.y)
        {
            foodMusic.play();
            foodMusic.currentTime=0;//reset audio to begining
            score+=5;
            scoreDiv.innerText=`score: ${score}`
            snakePosArr.unshift({x:snakePosArr[0].x+inDirection.x,y:snakePosArr[0].y+inDirection.y});
            food={x:Math.floor(a+(b-a)*Math.random()),y:Math.floor(a+(b-a)*Math.random())};
        }
    //displaying the snake after updates
    board.innerHTML=""
    snakePosArr.forEach((snakePos,idx)=>
    {
        let snakeExtend=document.createElement('div');
        snakeExtend.style.gridRow=snakePos.x;
        snakeExtend.style.gridColumn=snakePos.y;
        if(idx==0)
        {
            snakeExtend.classList.add('head');
        }
        else
        {
            snakeExtend.classList.add('body');
        }
        board.appendChild(snakeExtend);
        gameMusic.play();
    })
    //displaying food
    let foodRandom=document.createElement('div');
    foodRandom.style.gridRow=food.x;
    foodRandom.style.gridColumn=food.y;
    foodRandom.classList.add('food');
    board.appendChild(foodRandom);
}

//this is used to frequently render the screen which is updated
window.requestAnimationFrame(main);
