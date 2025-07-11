//const gameboard = document.getElementById("game-board");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const audio = new Audio('./assets_audio.mp3')
const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")
let fimdjogo = false 
let velocidade = 100;

const size = 30;//tamanho de cada "coordenada"

let snake = [ //cada objeto define um quadrado do corpo dela
    { x: 300, y: 240},
    { x: 330, y: 240}, // Está é a cabeça!!
] // "coordenadas" do Corpo da cobrinha!! 

const incrementarScore = () =>{
    score.innerText = +score.innerText + 10
}

const randomNumber = (min, max) =>{
    return Math.round(Math.random()* (max - min) + min);
}//cria uma expressão de um numero aleatório

const randomPosition = () =>{
    const number = randomNumber(0, canvas.height - size);
    return Math.round(number/ 30) * 30
}//cria uma posição aleatória a partir do número aleatório





const food = {
    x: randomPosition(),
    y: randomPosition(), 
    color: "red",
};// cria a comida


let direction, loopId



const drawFood = () => {
     
    const { x, y, color} = food;
    
    ctx.shadowColor = color;
    ctx.shadowBlur = 50;
    ctx.fillStyle = food.color;
    ctx.fillRect(food.x, food.y, size, size);
    ctx.shadowBlur = 0;

}

const drawSnake = () =>{
    ctx.fillStyle = "white"//cor da cabeça 

    snake.forEach((position, index) => {

        if (index == snake.length -1){
            ctx.fillStyle = "green"
        }
        ctx.fillRect(position.x, position.y, size, size)
    })//cor do corpo
}// Criação do corpo da cobra  

const moveSnake = () => {
    if (fimdjogo == false) {       
        if(!direction) return

        const head = snake[snake.length -1]

        snake.shift()//remove o primeiro elemento do array(corpo da cobra)
        if (direction == "right" &&  direction !== "left"){
            snake.push({x: head.x + size, y: head.y })
        }//adiciona nova cabeça para a direita
        
        
        if (direction == "left" && direction !== "right"){
            snake.push({x: head.x - size, y: head.y })
        }// adiciona nova cabeça para a esquerda
        
        
        if (direction == "down" && direction !== "up"){
            snake.push({x: head.x, y: head.y + size })
        }//adiciona nova cabeça para baixa

        
        if (direction == "up"&& direction !== "down"){
            snake.push({x: head.x, y: head.y - size })
        }//adiciona nova cabeça para cima
        //Definindo as direções na qual a cobra precisa ir
    }                                                                   
} 


const checkEat = () => {
    const head = snake[snake.length -1]
    
    if (head.x == food.x && head.y == food.y){
        velocidade -= 2;
        incrementarScore()
        snake.push(head);
        audio.play();
        let x = randomPosition();
        let y = randomPosition();
        
        while (snake.find((position) =>  position. x == x && position.y == y )){
            x = randomPosition();
            y = randomPosition();
        }

        food.x = x
        food.y = y
        food.color = "red";

    }
    
    
}//Checa se a cobrinha comeu a comida


const checkCollision = () => {
    const head = snake[snake.length -1]
    const canvasLimit = canvas.height - size;
    const neckIndex = snake.length -2;
    
    const wallCollision = 
        head.x < 0  || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit
    
    const selfCollision = snake.find((position, index) => {
        return index < neckIndex &&  position.x == head.x && position.y == head.y;
})
    
    if (wallCollision || selfCollision){
        gameOver()
        
    } 
}//colisão da cobra 


const gameOver = () => {
    direction = undefined;
    fimdjogo = true;
    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(2px)"
}//ainda não fiz


const gameLoop = () =>{
    clearInterval(loopId)//impede erro de repetição de funcões
    ctx.clearRect(0, 0, 600, 600);//limpa o canvas
    //dessenha o grid
    drawFood();//crie a comida
    moveSnake();//move a cobrinha 
    drawSnake();//desenha a cobrinha
    checkEat();
    checkCollision();

    loopId = setTimeout(() => {
        gameLoop()
    }, velocidade)//velocidade da cobrinha
}//Vai fazer o jogo iniciar

gameLoop();

document.addEventListener("keydown", ({ key }) =>{

    if (key == "ArrowRight" && direction != "left" ) {
        direction = "right";
    }

    
    if (key == "ArrowLeft" && direction != "right") {
        direction = "left";
    }

    
    if (key == "ArrowDown" && direction != "up") {
        direction = "down";
    }

    
    if (key == "ArrowUp" && direction != "down") {
        direction = "up";
    }

})//Identifica as teclas do usuário

buttonPlay.addEventListener("click", () => {
    fimdjogo = false;
    velocidade = 100;
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"

    snake = [ 
    { x: 300, y: 240},
    { x: 330, y: 240},
    ] 
})
