//primer lienzo donde irá el juego
const canvas = document.createElement('canvas')
canvas.id = 'arkanoid'
const contextArkanoid = canvas.getContext('2d')

//segundo lienzo donde irá el marcador, vidas, ya veremos
const canvas2 = document.createElement('canvas')
canvas2.id = 'arkanoid'
const contextArkanoid2 = canvas2.getContext('2d')

//creamos elemento con las imagenes de las barras y los corazones de las vidas
const sprites = document.createElement('img')
sprites.src = "./assets/images/sprites.png"

//añadimos las tags canvas y canvas2 al main
document.querySelector('main').appendChild(canvas)
document.querySelector('main').appendChild(canvas2)

//creamos las constantes de juego, como el ancho y el alto del tablero
// las variables que ponemos como false para saber si los botones izquierdo y derecho están pulsados en teoria se ponen despues
// según vayamos avanzando en el desarrollo del juego y según vayamos haciendo las funciones

const WIDTH_GAME = 400
const HEIGHT_GAME = 400

canvas.width = WIDTH_GAME
canvas.height = HEIGHT_GAME

let leftPressed = false
let rightPressed = false

// Creamos los datos de la pelota, el radio, la posición donde queremos que salga la pelota de inicio y la velocidad
// debemos recordar que como el juego es 2d los movimientos son tanto en el eje x como en el y, lo mismo pasa con la velocidad
// 2º despues de crear los valores fijos de la pelota vamos a hacer la función de pintar la pelota
const radius = 6
let positionBallX = WIDTH_GAME / 2 - radius
let positionBallY = HEIGHT_GAME / 2 - radius
let speedDirectionBallX = 4
//con el math.random hacemos que el inicio de la pelota no sea fijo
speedDirectionBallX = Math.random() > 0.5 ? -speedDirectionBallX : speedDirectionBallX
let speedDirectionBallY = 3
speedDirectionBallY = Math.random() > 0.5 ? -speedDirectionBallY : speedDirectionBallY

//Creamos los datos de la barra, el grosor, el largo, la posicion y la velocidad, hueco debajo de la barra

const widthBar = 64
const heightBar = 16
const offSet = 10
let positionBarX = WIDTH_GAME / 2 - widthBar
let positionBarY = HEIGHT_GAME - heightBar
let speedBar = 8
// Creamos el objeto con los datos generales de cada jugador, será más fácil acceder a ellos

const playerConst = {
    player1: {
        lives:3,
        lost: false,
        alerts: false,
        positionX: 0,
        positionY: HEIGHT_GAME - 5,
        direction: 'right'
    },
    player2: {
        lives:3,
        lost: false,
        alerts: false,
        positionX: 0,
        positionY: 0,
        direction: 'right'
    },
    player3: {
        lives:3,
        lost: false,
        alerts: false,
        positionX: 0,
        positionY: 0,
        direction: 'right'
    },
    player4: {
        lives:3,
        lost: false,
        alerts: false,
        positionX: 0,
        positionY: WIDTH_GAME - 5,
        direction: 'right'
    }

}

/* 1º  lo primero que hacemos depues de crear el lienzo con el tamaño que queremos que tenga es pensar la primera funcion que
necesitamos en este caso será la función de dibujar, esta función debe de pintarse y repintarse con cada movimiento que hace
la pelota, o sea que debe la imagen estar refactorizandose una vez por segundo, dentro de esta función vamos a tener todas las
llamadas al resto de funciones que vamos a necesitar, en vez de usar interval() para decirle cada cuando debe pintar y repintar
vamos a usar requestAnimationFrame que ya viene predefinido y es más rápido, debemos recordar que tenemos que crear una 
función que limpie el dibujo anterior porque si no lo que hará será pintarnos un trazo completo por el lugar por donde se mueve
la pelota*/

/*FUNCIONES DEL JUEGO*/

function drawBall() {

    contextArkanoid.beginPath() //iniciamos el trazo, ponemos el pincel
    contextArkanoid.fillStyle = '#fff' // ponemos el color
    contextArkanoid.arc(positionBallX, positionBallY, radius, 0, Math.PI * 2) // pintamos el arco de la pelota
    contextArkanoid.fill() // rellenamos
    contextArkanoid.closePath() // levantamos el pincel
}

// 5º dibujamos la barra

function drawBar () {
    contextArkanoid.drawImage (
        sprites,
        48,
        92,
        widthBar,
        heightBar,
        positionBarX,
        positionBarY,
        widthBar,
        heightBar
    )
}
// 3º el movimiento de la pelota
// 8º pintar el rebote de la pelota sobre la barra dentro de la funcion de movimiento de la pelota

function ballMovement() {
    // declaramos un funcion tipo arrow llamada next, con un argumento type
    //verifica si el tipo de movimiento en en x o en y dependiendo de donde sea
    //calcula la proxima posicion de la pelota sumando la posicion y la velocidad
    //con la operacion ternaria ajustamos la posicion de la pelota, le decimos
    // si la velocidad es > 0 a lops que es la nueva posicion de la pelota le sumamos el radio
    // si no es > 0 a la nueva posicion de la pelota le restamos el radio.
    // devolvemos la proxima posicion de la pelota tanto en el eje x como en el y
    const next = (type) => {
        if(type == 'x') {
            let lops = positionBallX + speedDirectionBallX
            lops = speedDirectionBallX > 0 ? lops + radius : lops - radius
            return lops
        }
        if(type == 'y') {
            let lops = positionBallY + speedDirectionBallY
            lops = speedDirectionBallY > 0 ? lops + radius : lops - radius
            return lops
        }
    }

    //rebote sobre la barra
    const isSameYasBar = 
        (next('y') > positionBarY) && 
        (next('y') < positionBarY + heightBar)
    
    const isBelowYasBar = next('y') > HEIGHT_GAME - offSet

    const isSameAsWidthBar = 
        (next('x') > positionBarX) && 
        (next('x') < positionBarX + widthBar)

    if(isSameYasBar && isSameAsWidthBar){
        speedDirectionBallY = -speedDirectionBallY
    } else if (isBelowYasBar && isSameAsWidthBar && offSet < radius * 2) {
        speedDirectionBallX = - speedDirectionBallX
        speedDirectionBallY = - speedDirectionBallY
    }
    //movimiento pelota horizontal eje x
    const rightBorder = positionBallX + speedDirectionBallX + radius > WIDTH_GAME
    const leftBorder = positionBallX + speedDirectionBallX - radius < 0

    if( rightBorder){
        speedDirectionBallX = -speedDirectionBallX
    } else if (leftBorder) {
        speedDirectionBallX = -speedDirectionBallX
    }

    //movimiento pelota vertical eje y
    const topBorder = positionBallY + speedDirectionBallY - radius < 0
    const bottomBorder = positionBallY + speedDirectionBallY + radius > HEIGHT_GAME

    if( topBorder) {
        speedDirectionBallY = -speedDirectionBallY
    } else if (bottomBorder){
        speedDirectionBallY = -speedDirectionBallY
    }

    positionBallX += speedDirectionBallX
    positionBallY += speedDirectionBallY
}

// 7º ahora la función para mover la barra

function barMovement() {

    if(leftPressed && positionBarX > 0) {
        positionBarX -= speedBar
    } else if (rightPressed && positionBarX < WIDTH_GAME - widthBar) {
        positionBarX += speedBar
    }
}   

/* 4º creamos la funcion para limpiar el context porque si no la pelota deja solo trazos dibujados
por donde va pasando */

function cleanContext () {
    contextArkanoid.clearRect(0, 0, WIDTH_GAME, HEIGHT_GAME)
}

/*6º vamos a hacer los eventos del teclado, con esta función definimos el 
evento de keydown y keyup para las flechas de direccion de izquierda a derecha
que de momento serán las teclas que vamos a usar para mover la barra, tambien
se pueden usar las teclas awsd para los movimientos igual que las flechas*/

function initEvents () {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)

    function keyDownHandler (event) {
        const key = event.key
        if(key === 'ArrowLeft' || key === 'Left'){
            leftPressed = true
        } else if (key === 'ArrowRight' || key === 'Right') {
            rightPressed = true
        }
    }

    function keyUpHandler (event) {
        const key = event.key
        if(key === 'ArrowLeft' || key === 'Left') {
            leftPressed = false
        } else if (key === 'ArrowRight' || key === 'Right') {
            rightPressed = false
        }
    }
}
/* funcion gameOver para crear un botón de game over, reseteara el juego cuando alguno de los
jugadores haya dejado sus vidas a 0
*/
function gameEnd() {
    const buttoGameEnd = document.createElement('button')
    buttoGameEnd.innerHTML = 'Game Over'
    buttoGameEnd.addEventListener('click', () => {
        if(playerConst.player1.lives === 0 || playerConst.player2.lives === 0 ||
            playerConst.player3.lives === 0 || playerConst.player4.lives === 0) {
            
            positionBarX = WIDTH_GAME / 2 - widthBar / 2 
            positionBarY = HEIGHT_GAME - heightBar - offSet
            
            positionBallX = WIDTH_GAME / 2 - radius
            positionBallY = HEIGHT_GAME / 2 - radius

            speedDirectionBallY = Math.random() > 0.5 ? -speedDirectionBallY : speedDirectionBallY

            playerConst.player1.lives = 3
            playerConst.player2.lives = 3
            playerConst.player3.lives = 3
            playerConst.player4.lives = 3
                
        }
    })
    if(!document.querySelector('main button')){
        document.querySelector('main').appendChild(buttoGameEnd)
    }
    draw()
}
// función para pintar las vidas y llevar el control para saber cuando algun jugador llega a 0 vidas
function board() {
    /*contextArkanoid2.fillStyle = '#fff'*/
    contextArkanoid2.font = `20px 'Ubuntu '` 
    contextArkanoid2.fillText(`Player 1: `, 10, 30)
    contextArkanoid2.fillText(`Player 2: `, 10, 55)
    contextArkanoid2.fillText(`Player 3: `, 10, 80)
    contextArkanoid2.fillText(`Player 4: `, 10, 105)

    for(let i=playerConst.player1.lives; i > 0; i--){
        let positionHeart = (24 * i) + 100
        contextArkanoid2.drawImage (
            sprites,
            120,
            135,
            11,
            11,
            positionHeart,
            16,
            24,
            22
        )
    }
    for(let i=playerConst.player2.lives; i > 0; i--){
        let positionHeart = (24 * i) + 100
        contextArkanoid2.drawImage (
            sprites,
            120,
            135,
            11,
            11,
            positionHeart,
            40,
            24,
            22
        )
    }
    for(let i=playerConst.player3.lives; i > 0; i--){
        let positionHeart = (24 * i) + 100
        contextArkanoid2.drawImage (
            sprites,
            120,
            135,
            11,
            11,
            positionHeart,
            66,
            24,
            22
        )
    }
    for(let i=playerConst.player4.lives; i > 0; i--){
        let positionHeart = (24 * i) + 100
        contextArkanoid2.drawImage (
            sprites,
            120,
            135,
            11,
            11,
            positionHeart,
            90,
            24,
            22
        )
    }
}



function draw(){
    if(playerConst.player1.lives === 0 || playerConst.player2.lives === 0 ||
        playerConst.player3.lives === 0 || playerConst.player4.lives === 0){
        
        gameEnd()
        cleanContext()
        drawBall()
        drawBar()
        board()
        return
            
    }

    window.requestAnimationFrame(draw)

    cleanContext()
    board()

    // elementos del juego
    drawBall()
    drawBar()

    //eventos del juego
    ballMovement()
    barMovement()
}
draw()
initEvents()











