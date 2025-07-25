import { radius, WIDTH_GAME, HEIGHT_GAME, offSet } from './config.js'
import { playerConst } from './players.js'

export let positionBallX = WIDTH_GAME / 2 - radius
export let positionBallY = HEIGHT_GAME / 2 - radius

export let speedDirectionBallX = Math.random() > 0.5 ? 4 : -4
export let speedDirectionBallY = Math.random() > 0.5 ? 3 : -3

export function ballMovement() {
    
    const next = (type) => {
        if (type == 'x') {
            let lops = positionBallX + speedDirectionBallX
            lops = speedDirectionBallX > 0 ? lops + radius : lops - radius
            return lops
        }
        if (type == 'y') {
            let lops = positionBallY + speedDirectionBallY
            lops = speedDirectionBallY > 0 ? lops + radius : lops - radius
            return lops
        }
    }
    Object.keys(playerConst).forEach((player, index) => {
        const playerInfo = playerConst[player]

        if (index <= 1) {
            //alto de la barra
            const isSameYasBar = playerInfo.bar.isSameYasBar(next('y'), playerInfo.bar.positionBarY)
            // debajo de la barra
            const isBelowYasBar = playerInfo.bar.isBelowYasBar(next('y'))
            //ancho de la barra
            const isSameAsWidthBar = playerInfo.bar.isSameAsWidthBar(next('x'), playerInfo.bar.positionBarX)

            if ((isSameYasBar && isSameAsWidthBar)) {
                speedDirectionBallY = - speedDirectionBallY
            } else if (isBelowYasBar && isSameAsWidthBar && offSet < radius * 2) {
                speedDirectionBallX = - speedDirectionBallX
                speedDirectionBallY = - speedDirectionBallY
            }
        } else {
            // alto barra
            const isSameYasBar = playerInfo.bar.isSameYasBar(next('x'), playerInfo.bar.positionBarX)
            // debajo de la barra
            const isBelowYasBar = playerInfo.bar.isBelowYasBar(next('x'))
            // ancho barra
            const isSameAsWidthBar = playerInfo.bar.isSameAsWidthBar(next('y'), playerInfo.bar.positionBarY)
            if ((isSameYasBar && isSameAsWidthBar)) {
                speedDirectionBallX = - speedDirectionBallX
            } else if (isBelowYasBar && isSameAsWidthBar && offSet < radius * 2) {
                speedDirectionBallX = - speedDirectionBallX
                speedDirectionBallY = - speedDirectionBallY
            }
        }
    })
    // HORIZONTAL
    const rightBorder = positionBallX + speedDirectionBallX + radius > WIDTH_GAME
    const leftBorder = positionBallX + speedDirectionBallX - radius < 0
    if (rightBorder) {
        if (playerConst?.player4) playerConst.player4.lost = true
        speedDirectionBallX = -speedDirectionBallX
    } else if (leftBorder) {
        if (playerConst?.player3) playerConst.player3.lost = true
        speedDirectionBallX = -speedDirectionBallX
    }
    //VERTICAL
    const topBorder = positionBallY + speedDirectionBallY - radius < 0
    const bottomBorder = positionBallY + speedDirectionBallY + radius > HEIGHT_GAME
    if (topBorder) {
        if (playerConst?.player2) playerConst.player2.lost = true
        speedDirectionBallY = -speedDirectionBallY
    } else if (bottomBorder) {
        if (playerConst?.player1) playerConst.player1.lost = true
        speedDirectionBallY = -speedDirectionBallY
    }

    positionBallX += speedDirectionBallX
    positionBallY += speedDirectionBallY

}