//primer lienzo donde irá el juego
const canvas = document.createElement('canvas')
canvas.id = 'game'
const contextArkanoid = canvas.getContext('2d')

//segundo lienzo donde irá el marcador, vidas, ya veremos
const canvas2 = document.createElement('canvas')
canvas2.id = 'hud'
const contextArkanoid2 = canvas2.getContext('2d')

//creamos elemento con las imagenes de las barras tanto horizontales como verticales
const sprites = document.createElement('img')
sprites.src = "./assets/images/sprites.png"

const sprites90 = document.createElement('img')
sprites90.src = "./assets/images/sprites_90.png"

//añadimos las tags canvas y canvas2 a la clase creada en html dentro del main .gamepong
document.querySelector('.games').appendChild(canvas)
document.querySelector('.games').appendChild(canvas2)

// constantes del juego

const WIDTH_GAME = 400
const HEIGHT_GAME = 400

canvas.width = WIDTH_GAME
canvas.height = HEIGHT_GAME

const heightAlert = 5

// datos pelota

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
let speedBar = 8

const barsSprites = {
    player1: {
        sprite : sprites,
        x : 48,
        y : 92,
        width : widthBar,
        height : heightBar,
        defaultPosition : {
            positionBarX: WIDTH_GAME / 2 - widthBar / 2,
            positionBarY: HEIGHT_GAME - heightBar - offSet,
        }
    },
    player2: {
        sprite : sprites,
        x : 48,
        y : 113,
        width : widthBar,
        height : heightBar,
        defaultPosition : {
            positionBarX: WIDTH_GAME / 2 - widthBar / 2,
            positionBarY: 0 + offSet,
        }
    },
    player3: {
        sprite : sprites90,
        x : 92,
        y : 116,
        width : heightBar,
        height : widthBar,
        defaultPosition : {
            positionBarX: 0 + offSet,
            positionBarY: HEIGHT_GAME / 2 - widthBar / 2,
        }
    },
    player4: {
        sprite : sprites90,
        x : 71,
        y : 116,
        width : heightBar,
        height : widthBar,
        defaultPosition : {
            positionBarX: WIDTH_GAME - offSet -heightBar,
            positionBarY: HEIGHT_GAME / 2 - widthBar / 2,
        }
    }
}

const commonInfoPlayer = {
    lives: 3,
    lost: false,
    alerts: false,
    moves: {
        keyPressedForward : false,
        keyPressedBackward : false
    }
}

// Creamos el objeto con los datos generales de cada jugador, será más fácil acceder a ellos

const playerConst = {
    player1: {
        ...commonInfoPlayer,
        positionX: 0,
        positionY: HEIGHT_GAME - heightAlert,
        direction: 'right',
        bar : {
            positionBarX: barsSprites.player1.defaultPosition.positionBarX,
            positionBarY: barsSprites.player1.defaultPosition.positionBarY,
            isSameYasBar: (nextBallMove, positionBarY) => {
                return (nextBallMove > positionBarY) &&
                (nextBallMove < positionBarY + heightBar)
            },
            isBelowYasBar: (nextBallMove) => {
                return nextBallMove > HEIGHT_GAME - offSet
            },
            isSameAsWidthBar: (nextBallMove, positionBarX) => {
                return(nextBallMove > positionBarX) &&
                (nextBallMove < positionBarX + widthBar)
            },
        },
        moves : {
            forwardKeys: ['ArrowRight', 'Right'],
            backwardKeys: ['ArrowLeft', 'Left'],
        },
    },
    player2: {
        ...commonInfoPlayer,
        positionX: 0,
        positionY: 0,
        direction: 'right',
        bar : {
            positionBarX: barsSprites.player2.defaultPosition.positionBarX,
            positionBarY: barsSprites.player2.defaultPosition.positionBarY,
            isSameYasBar: (nextBallMove, positionBarY) => {
                return (nextBallMove < positionBarY + heightBar) &&
                (nextBallMove > positionBarY)
            },
            isBelowYasBar: (nextBallMove) => {
                return nextBallMove < offSet
            },
            isSameAsWidthBar: (nextBallMove, positionBarX) => {
                return(nextBallMove > positionBarX) &&
                (nextBallMove < positionBarX + widthBar)
            },
        },
        moves : {
            forwardKeys: ['d', 'D'],
            backwardKeys: ['a', 'A'],
        },
    },
    player3: {
        ...commonInfoPlayer,
        positionX:0,
        positionY:0,
        direction: 'down',
        bar : {
            positionBarX: barsSprites.player3.defaultPosition.positionBarX,
            positionBarY: barsSprites.player3.defaultPosition.positionBarY,
            isSameYasBar: (nextBallMove, positionBarX) => {
                return (nextBallMove < positionBarX + heightBar) &&
                (nextBallMove > positionBarX)
            },
            isBelowYasBar: (nextBallMove) => {
                return nextBallMove < offSet
            },
            isSameAsWidthBar: (nextBallMove, positionBarY) => {
                return(nextBallMove > positionBarY) &&
                (nextBallMove < positionBarY + widthBar)
            },
        },
        moves : {
            forwardKeys: ['ArrowDown', 'Down'],
            backwardKeys: ['ArrowUp', 'Up'],
        },
    },
    player4: {
        ...commonInfoPlayer,
        positionX: WIDTH_GAME - heightAlert,
        positionY: 0,
        direction: 'down',
        bar : {
            positionBarX: barsSprites.player4.defaultPosition.positionBarX,
            positionBarY: barsSprites.player4.defaultPosition.positionBarY,
            isSameYasBar: (nextBallMove, positionBarX) => {
                return (nextBallMove < positionBarX + heightBar) &&
                (nextBallMove > positionBarX)
            },
            isBelowYasBar: (nextBallMove) => {
                return nextBallMove < offSet
            },
            isSameAsWidthBar: (nextBallMove, positionBarY) => {
                return(nextBallMove > positionBarY) &&
                (nextBallMove < positionBarY + widthBar)
            },
        },
        moves : {
            forwardKeys: ['s', 'S'],
            backwardKeys: ['w', 'W'],
        },
    },

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
   Object.keys(playerConst).forEach((player) => {
    const playerInfo = playerConst[player]
    contextArkanoid.drawImage(
        barsSprites[player].sprite,
        barsSprites[player].x,
        barsSprites[player].y,
        barsSprites[player].width,
        barsSprites[player].height,
        playerInfo.bar.positionBarX,
        playerInfo.bar.positionBarY,
        barsSprites[player].width,
        barsSprites[player].height
    )
   })
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
    Object.keys(playerConst).forEach((player,index) => {
        const playerInfo = playerConst[player]

        if(index <= 1) {
            //alto de la barra
            const isSameYasBar = playerInfo.bar.isSameYasBar(next('y'),playerInfo.bar.positionBarY)
            // debajo de la barra
            const isBelowYasBar = playerInfo.bar.isBelowYasBar(next('y'))
            //ancho de la barra
            const isSameAsWidthBar = playerInfo.bar.isSameAsWidthBar(next('x'),playerInfo.bar.positionBarX)

            if ((isSameYasBar && isSameAsWidthBar )) {
                speedDirectionBallY = - speedDirectionBallY
            } else if ( isBelowYasBar && isSameAsWidthBar && offSet < radius * 2 ) {
                speedDirectionBallX = - speedDirectionBallX
                speedDirectionBallY = - speedDirectionBallY
            }
        } else {
            // alto barra
            const isSameYasBar = playerInfo.bar.isSameYasBar(next('x'),playerInfo.bar.positionBarX)
            // debajo de la barra
            const isBelowYasBar = playerInfo.bar.isBelowYasBar(next('x'))
            // ancho barra
            const isSameAsWidthBar = playerInfo.bar.isSameAsWidthBar(next('y'),playerInfo.bar.positionBarY)
            if ((isSameYasBar && isSameAsWidthBar )) {
                speedDirectionBallX = - speedDirectionBallX
            } else if ( isBelowYasBar && isSameAsWidthBar && offSet < radius * 2 ) {
                speedDirectionBallX = - speedDirectionBallX
                speedDirectionBallY = - speedDirectionBallY
            }
        }
    })
    // HORIZONTAL
    const rightBorder = positionBallX + speedDirectionBallX + radius > WIDTH_GAME
    const leftBorder = positionBallX + speedDirectionBallX -radius < 0
    if(rightBorder) {
        if(playerConst?.player4)playerConst.player4.lost = true
        speedDirectionBallX = -speedDirectionBallX
    } else if(leftBorder) {
        if(playerConst?.player3)playerConst.player3.lost = true
        speedDirectionBallX = -speedDirectionBallX
    }
    //VERTICAL
    const topBorder = positionBallY + speedDirectionBallY - radius < 0
    const bottomBorder = positionBallY +speedDirectionBallY + radius > HEIGHT_GAME
    if(topBorder) {
        if(playerConst?.player2)playerConst.player2.lost = true
        speedDirectionBallY = -speedDirectionBallY
    } else if (bottomBorder) {
        if(playerConst?.player1)playerConst.player1.lost = true
        speedDirectionBallY = -speedDirectionBallY
    }

    positionBallX += speedDirectionBallX
    positionBallY += speedDirectionBallY

}

// 7º ahora la función para mover la barra

function barMovement() {

    Object.keys(playerConst).forEach((player,index) => {
        const playerInfo = playerConst[player]

        if(index <= 1) {
            if(playerInfo.moves.keyPressedBackward && playerInfo.bar.positionBarX > 0) {
                playerInfo.bar.positionBarX -= speedBar
            } else if (playerInfo.moves.keyPressedForward && playerInfo.bar.positionBarX < WIDTH_GAME - widthBar) {
                playerInfo.bar.positionBarX += speedBar
            }
        } else {
            if(playerInfo.moves.keyPressedBackward && playerInfo.bar.positionBarY > 0) {
                playerInfo.bar.positionBarY -= speedBar
            } else if(playerInfo.moves.keyPressedForward && playerInfo.bar.positionBarY < HEIGHT_GAME - widthBar) {
                playerInfo.bar.positionBarY += speedBar
            }
        }
    })
}   

/* 4º creamos la funcion para limpiar el context porque si no la pelota deja solo trazos dibujados
por donde va pasando */

function cleanContext () {
    contextArkanoid.clearRect(0, 0, WIDTH_GAME, HEIGHT_GAME)
    contextArkanoid2.clearRect(0, 0, canvas2.width, canvas2.height)
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
        Object.keys(playerConst).forEach((player) => {
            const playerInfo = playerConst[player]
            if(playerInfo.moves.backwardKeys.includes(key)) {
                playerInfo.moves.keyPressedBackward = true
            } else if (playerInfo.moves.forwardKeys.includes(key)) {
                playerInfo.moves.keyPressedForward = true
            }
        })
    }

    function keyUpHandler (event) {
        const key = event.key
        Object.keys(playerConst).forEach((player) => {
            const playerInfo = playerConst[player]
            if(playerInfo.moves.backwardKeys.includes(key)) {
                playerInfo.moves.keyPressedBackward = false
            } else if (playerInfo.moves.forwardKeys.includes(key)) {
                playerInfo.moves.keyPressedForward = false
            }
        })
    }
}
/* funcion gameOver para crear un botón de game over, reseteara el juego cuando alguno de los
jugadores haya dejado sus vidas a 0
*/
function gameEnd() {
    const buttoGameEnd = document.createElement('button')
    buttoGameEnd.innerHTML = 'Game Over'
    buttoGameEnd.addEventListener('click', () => {
        const playerLiveLost = Object.keys(playerConst).some((player) => {
            return playerConst[player].lives === 0
        })

        if(playerLiveLost) {
            speedDirectionBallY = Math.random() > 0.5 ? -speedDirectionBallY : speedDirectionBallY

            for(const player in playerConst) {
                playerConst[player].lives = 3
                playerConst[player].bar.positionBarX = barsSprites[player].defaultPosition.positionBarX
                playerConst[player].bar.positionBarY = barsSprites[player].defaultPosition.positionBarY

            }

            draw()
        }
                
    })
    
    if (!document.querySelector('main button')) {
        document.querySelector('main').appendChild(buttoGameEnd)
    }
}
// función para pintar las vidas y llevar el control para saber cuando algun jugador llega a 0 vidas
function drawBoard() {
    /*contextArkanoid2.fillStyle = '#fff'*/
    contextArkanoid2.font = `20px 'Ubuntu '` 
   Object.keys(playerConst).forEach((player, index) => {
        const playerInfo = playerConst[player]
        contextArkanoid2.fillText(`Player ${index + 1}: `, 10, 30 + (25 * index))
        for (let i = playerInfo.lives; i > 0; i--) {
            let positionLive = (24 * i) + 100
            contextArkanoid2.drawImage(
                sprites,
                120,
                135,
                11,
                11,
                positionLive,
                16 + (24 * index),
                24,
                22
            )
        }
   })
}

function controlInfoPlayers() {
   for (const player in playerConst) {
    const playerInfo = playerConst[player]
    if ( playerInfo.lost) {
        playerInfo.lives -= 1
        playerInfo.alerts = true
        playerInfo.lost = false
    }
    if (playerInfo.alerts) {
        contextArkanoid.fillStyle = '#ff0000'
        if(playerInfo.direction === 'right') {
            contextArkanoid.fillRect(playerInfo.positionX, playerInfo.positionY, WIDTH_GAME, heightAlert) 
        } else if (playerInfo.direction === 'down') {
            contextArkanoid.fillRect(playerInfo.positionX,playerInfo.positionBarY,heightAlert,HEIGHT_GAME)
        }
        setTimeout(() => {
            playerInfo.alerts = false
        }, 100)
    }
   }
}

function draw(){
   const playerLiveLost = Object.keys(playerConst).some((player) =>{
    return playerConst[player].lives === 0
   })

   if(playerLiveLost) {
    
    gameEnd()
    cleanContext()
    drawBall()
    drawBar()

    drawBoard()
    return
   }

   window.requestAnimationFrame(draw)

   cleanContext()
   drawBoard()
   controlInfoPlayers()

   drawBall()
   drawBar()

   ballMovement()
   barMovement()
}
draw()
initEvents()











