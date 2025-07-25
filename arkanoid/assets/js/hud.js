import { playerConst } from './players.js'

// HUD en HTML externo al canvas
export function renderHUD() {
    const hud = document.getElementById('hud-ui')
    if (!hud) return

    hud.innerHTML = ''

    Object.keys(playerConst).forEach((playerKey, index) => {
        const player = playerConst[playerKey]

        const playerDiv = document.createElement('div')
        playerDiv.classList.add('player-info')

        const label = document.createElement('span')
        label.textContent = `Player ${index + 1}:`
        playerDiv.appendChild(label)

        const livesDiv = document.createElement('div')
        livesDiv.classList.add('lives')

        for (let i = 0; i < player.lives; i++) {
            const heart = document.createElement('img')
            heart.src = 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path fill="red" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
          2 5.41 4.41 3 7.5 3c1.74 0 3.41.81 4.5 2.09
          C13.09 3.81 14.76 3 16.5 3
          19.59 3 22 5.41 22 8.5
          c0 3.78-3.4 6.86-8.55 11.54
          L12 21.35z"/>
        </svg>
      `)
            heart.alt = '❤️'
            livesDiv.appendChild(heart)
        }

        playerDiv.appendChild(livesDiv)
        hud.appendChild(playerDiv)
    })
}

