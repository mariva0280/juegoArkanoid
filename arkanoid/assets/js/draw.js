import {
    contextArkanoid,
    contextArkanoid2,
    WIDTH_GAME,
    HEIGHT_GAME,
    canvas2
} from './config.js'

import { playerConst, barsSprites } from './players.js'
import { positionBallX, positionBallY, ballMovement } from './ball.js'
import { barMovement } from './players.js'
import { renderHUD } from './hud.js'

// Limpia ambos contextos cada frame
export function cleanContext() {
    contextArkanoid.clearRect(0, 0, WIDTH_GAME, HEIGHT_GAME)
    contextArkanoid2.clearRect(0, 0, canvas2.width, canvas2.height)
}

// Pinta la pelota en el canvas
function drawBall() {
    contextArkanoid.beginPath()
    contextArkanoid.fillStyle = '#fff'
    contextArkanoid.arc(positionBallX, positionBallY, 6, 0, Math.PI * 2)
    contextArkanoid.fill()
    contextArkanoid.closePath()
}

// Pinta las barras de los jugadores
function drawBar() {
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

// Muestra alerta visual cuando se pierde una vida
function controlInfoPlayers() {
    for (const player in playerConst) {
        const info = playerConst[player]
        if (info.lost) {
            info.lives -= 1
            info.alerts = true
            info.lost = false
        }

        if (info.alerts) {
            contextArkanoid.fillStyle = '#ff0000'
            if (info.direction === 'right') {
                contextArkanoid.fillRect(info.positionX, info.positionY, WIDTH_GAME, 5)
            } else if (info.direction === 'down') {
                contextArkanoid.fillRect(info.positionX, info.bar.positionBarY, 5, HEIGHT_GAME)
            }
            setTimeout(() => {
                info.alerts = false
            }, 100)
        }
    }
}

// Muestra botón de reinicio si un jugador se queda sin vidas
function gameEnd() {
    const button = document.createElement('button')
    button.textContent = 'Game Over'

    button.addEventListener('click', () => {
        const someLost = Object.values(playerConst).some(p => p.lives === 0)
        if (someLost) {
            for (const player in playerConst) {
                const p = playerConst[player]
                p.lives = 3
                p.bar.positionBarX = barsSprites[player].defaultPosition.positionBarX
                p.bar.positionBarY = barsSprites[player].defaultPosition.positionBarY
            }
            draw()
        }
    })

    if (!document.querySelector('main button')) {
        document.querySelector('main').appendChild(button)
    }
}

// Bucle principal del juego
export function draw() {
    const someoneOut = Object.values(playerConst).some(p => p.lives === 0)

    if (someoneOut) {
        gameEnd()
        cleanContext()
        drawBall()
        drawBar()
        renderHUD()
        return
    }

    window.requestAnimationFrame(draw)

    cleanContext()
    controlInfoPlayers()
    renderHUD()

    drawBall()
    drawBar()

    ballMovement()
    barMovement()
}
