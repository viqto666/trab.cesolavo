const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");

let snake = [];
grid = 40;
direction = "right";
snake[0] = {
    x: 10 * grid,
    y: 10 * grid
};
/*criar a cobra e detecção de tecla */
function create_snake () {
    for (i = 0; i < snake.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(snake[i].x, snake[i].y, grid, grid) ;}
};


    

document.addEventListener('keydown', function(tecla) {
    if (tecla.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    } else if (tecla.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    } else if (tecla.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    } else if (tecla.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    }
    } );

    function startgame () { 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        create_snake();
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction == 'right') snakeX += grid ;
        if (direction == 'left') snakeX -= grid;
        if (direction == 'up') snakeY -= grid;
        if (direction == 'down') snakeY += grid;
        
        snake.unshift ({x : snakeX, y: snakeY});
        snake.pop();
        
    ;}
let game = setInterval(startgame, 100);



