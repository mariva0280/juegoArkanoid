import { playerConst } from './players.js'

export function initEvents() {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)

    function keyDownHandler(event) {
        const key = event.key
        Object.keys(playerConst).forEach((player) => {
            const playerInfo = playerConst[player]
            if (playerInfo.moves.backwardKeys.includes(key)) {
                playerInfo.moves.keyPressedBackward = true
            } else if (playerInfo.moves.forwardKeys.includes(key)) {
                playerInfo.moves.keyPressedForward = true
            }
        })
    }

    function keyUpHandler(event) {
        const key = event.key
        Object.keys(playerConst).forEach((player) => {
            const playerInfo = playerConst[player]
            if (playerInfo.moves.backwardKeys.includes(key)) {
                playerInfo.moves.keyPressedBackward = false
            } else if (playerInfo.moves.forwardKeys.includes(key)) {
                playerInfo.moves.keyPressedForward = false
            }
        })
    }
}