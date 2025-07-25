import { HEIGHT_GAME, WIDTH_GAME, widthBar, heightBar, offSet, sprites, sprites90, speedBar, heightAlert } from './config.js'

export const barsSprites = {
    player1: {
        sprite: sprites,
        x: 48,
        y: 92,
        width: widthBar,
        height: heightBar,
        defaultPosition: {
            positionBarX: WIDTH_GAME / 2 - widthBar / 2,
            positionBarY: HEIGHT_GAME - heightBar - offSet,
        }
    },
    player2: {
        sprite: sprites,
        x: 48,
        y: 113,
        width: widthBar,
        height: heightBar,
        defaultPosition: {
            positionBarX: WIDTH_GAME / 2 - widthBar / 2,
            positionBarY: 0 + offSet,
        }
    },
    player3: {
        sprite: sprites90,
        x: 92,
        y: 116,
        width: heightBar,
        height: widthBar,
        defaultPosition: {
            positionBarX: 0 + offSet,
            positionBarY: HEIGHT_GAME / 2 - widthBar / 2,
        }
    },
    player4: {
        sprite: sprites90,
        x: 71,
        y: 116,
        width: heightBar,
        height: widthBar,
        defaultPosition: {
            positionBarX: WIDTH_GAME - offSet - heightBar,
            positionBarY: HEIGHT_GAME / 2 - widthBar / 2,
        }
    }
}

const commonInfoPlayer = {
    lives: 3,
    lost: false,
    alerts: false,
    moves: {
        keyPressedForward: false,
        keyPressedBackward: false
    }
}

export const playerConst = {
    player1: {
        ...commonInfoPlayer,
        positionX: 0,
        positionY: HEIGHT_GAME - heightAlert,
        direction: 'right',
        bar: {
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
                return (nextBallMove > positionBarX) &&
                    (nextBallMove < positionBarX + widthBar)
            },
        },
        moves: {
            forwardKeys: ['ArrowRight', 'Right'],
            backwardKeys: ['ArrowLeft', 'Left'],
        },
    },
    player2: {
        ...commonInfoPlayer,
        positionX: 0,
        positionY: 0,
        direction: 'right',
        bar: {
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
                return (nextBallMove > positionBarX) &&
                    (nextBallMove < positionBarX + widthBar)
            },
        },
        moves: {
            forwardKeys: ['d', 'D'],
            backwardKeys: ['a', 'A'],
        },
    },
    player3: {
        ...commonInfoPlayer,
        positionX: 0,
        positionY: 0,
        direction: 'down',
        bar: {
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
                return (nextBallMove > positionBarY) &&
                    (nextBallMove < positionBarY + widthBar)
            },
        },
        moves: {
            forwardKeys: ['ArrowDown', 'Down'],
            backwardKeys: ['ArrowUp', 'Up'],
        },
    },
    player4: {
        ...commonInfoPlayer,
        positionX: WIDTH_GAME - heightAlert,
        positionY: 0,
        direction: 'down',
        bar: {
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
                return (nextBallMove > positionBarY) &&
                    (nextBallMove < positionBarY + widthBar)
            },
        },
        moves: {
            forwardKeys: ['s', 'S'],
            backwardKeys: ['w', 'W'],
        },
    },

}

export function barMovement() {

    Object.keys(playerConst).forEach((player, index) => {
        const playerInfo = playerConst[player]

        if (index <= 1) {
            if (playerInfo.moves.keyPressedBackward && playerInfo.bar.positionBarX > 0) {
                playerInfo.bar.positionBarX -= speedBar
            } else if (playerInfo.moves.keyPressedForward && playerInfo.bar.positionBarX < WIDTH_GAME - widthBar) {
                playerInfo.bar.positionBarX += speedBar
            }
        } else {
            if (playerInfo.moves.keyPressedBackward && playerInfo.bar.positionBarY > 0) {
                playerInfo.bar.positionBarY -= speedBar
            } else if (playerInfo.moves.keyPressedForward && playerInfo.bar.positionBarY < HEIGHT_GAME - widthBar) {
                playerInfo.bar.positionBarY += speedBar
            }
        }
    })
}   