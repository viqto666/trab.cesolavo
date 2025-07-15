//Objetos HTML //
const canvas = document.querySelector("canvas"); //Pega o canvas do HTML e cria um objeto moldável para js
const ctx = canvas.getContext("2d"); // Seleciona o contexto no qual o jogo ocorre, sendo o escolhido um contexto 2d
const audio = new Audio('./assets_audio.mp3')
const score = document.querySelector(".score--value") //chama o valor inicial dos scores, para que ele possa ser mudado posteriormente no js
const finalScore = document.querySelector(".final-score > span") //define a quantidade final de scores que irá aparecer na tela
const menu = document.querySelector(".menu-screen") //define o menu de reinício do jogo
const buttonPlay = document.querySelector(".btn-play")//botão de reinício
//////////////////////////////////////////////////////////////////////////////////////
let fimdjogo = false  
let velocidade = 100;

const size = 30;//tamanho de cada "coordenada"

let snake = [ //cada objeto corresponde a uma parte do corpo da cobra
    { x: 300, y: 240}, //coordenadas do corpo(o resto)
    { x: 330, y: 240}, // Está é a cabeça!!
]

const incrementarScore = () =>{
    score.innerText = +score.innerText + 10 //aumenta em 10 unidades os scores, para cada fruta consumida
}

const randomNumber = (min, max) =>{
    return Math.round(Math.random()* (max - min) + min); // gera um número aleatório para servir de coordenada posteriormente 


const randomPosition = () =>{
    const number = randomNumber(0, canvas.height - size);
    return Math.round(number/ 30) * 30
}//Pega o número aleatório e cria a coordenada baseada nele





const food = {
    x: randomPosition(),
    y: randomPosition(), 
    color: "red",
};// cria a comida, utiliza das coordenadas criadas acima


let direction, loopId



const drawFood = () => {
     
    const { x, y, color} = food;
    
    ctx.shadowColor = color;
    ctx.shadowBlur = 50;
    ctx.fillStyle = food.color;
    ctx.fillRect(food.x, food.y, size, size);
    ctx.shadowBlur = 0;
//desenho da comida, ou seja, a forma como ela aparece na tela
}

const drawSnake = () =>{
    ctx.fillStyle = "white"//cor do corpo

    snake.forEach((position, index) => {

        if (index == snake.length -1){
            ctx.fillStyle = "green" //cor da cabeça
        }
        ctx.fillRect(position.x, position.y, size, size)
    })
}// Desenha a cobra 

    //Dinâmica de movimentação da cobra
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
/////////////////////////////////////////////////////////////////////
    //Reconhecimento das teclas de movimento da cobra
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
////////////////////////////////////////////////////////
    
    //Dinâmica da comida, oq acontece quando ela come, e onde ela não pode nascer
const checkEat = () => {
    const head = snake[snake.length -1] 
    
    if (head.x == food.x && head.y == food.y){
        velocidade -= 2;
        incrementarScore()
        snake.push(head);
        audio.play();
        let x = randomPosition();
        let y = randomPosition();
        //Define que a cobra comeu
        
        while (snake.find((position) =>  position. x == x && position.y == y )){ //permite com que a comida não apareça dentro da cobra
            x = randomPosition();
            y = randomPosition();
        }

        food.x = x
        food.y = y
        food.color = "red";

    }
    ///////////////////////////////////////////////////////////
    
}

//Colisão da cobra 
    
const checkCollision = () => {
    const head = snake[snake.length -1]
    const canvasLimit = canvas.height - size;
    const neckIndex = snake.length -2;
    //na parede
    const wallCollision = 
        head.x < 0  || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit
    //em si mesma
    const selfCollision = snake.find((position, index) => {
        return index < neckIndex &&  position.x == head.x && position.y == head.y;
})
    
    if (wallCollision || selfCollision){
        gameOver()
        
    } 
}
/////////////////////////////////////////////////////////////////

    //Dinâmica de game-over
const gameOver = () => {
    direction = undefined;
    fimdjogo = true;
    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(2px)"
}
//////////////////////////////////////

    //Roda o jogo em intervalos definidos pela variável "velocidade"
const gameLoop = () =>{
    clearInterval(loopId)//impede erro de repetição de funcões
    ctx.clearRect(0, 0, 600, 600);//limpa o canvas
    drawFood();//crie a comida
    moveSnake();//move a cobrinha 
    drawSnake();//desenha a cobrinha
    checkEat();
    checkCollision();

    loopId = setTimeout(() => {
        gameLoop()
    }, velocidade)//velocidade da cobrinha
}

gameLoop(); // faz o jogo iniciar
///////////////////////////////////////////////////////////////////
    //Reconhecimento das teclas de movimento da cobra
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
})
/////////////////////////////////////////////////////////////////

    //Função que define a dinâmica do botão de reiniciar
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
