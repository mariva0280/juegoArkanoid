export const WIDTH_GAME = 400
export const HEIGHT_GAME = 400
export const heightAlert = 5
export const radius = 6
export const widthBar = 64
export const heightBar = 16
export const offSet = 10
export const speedBar = 8

export const canvas = document.createElement('canvas')
canvas.id = 'game'
canvas.width = WIDTH_GAME
canvas.height = HEIGHT_GAME

export const canvas2 = document.createElement('canvas')
canvas2.id = 'hud'
canvas2.width = WIDTH_GAME
canvas2.height = HEIGHT_GAME

export const contextArkanoid = canvas.getContext('2d')
export const contextArkanoid2 = canvas2.getContext('2d')

export const sprites = document.createElement('img')
sprites.src = "./assets/images/sprites.png"

export const sprites90 = document.createElement('img')
sprites90.src = "./assets/images/sprites_90.png"

// Insertar solo un canvas en el DOM
document.querySelector('.games').appendChild(canvas)

// Esperar a que se carguen los sprites antes de iniciar
sprites.onload = checkReady
sprites90.onload = checkReady

let imagesLoaded = 0

function checkReady() {
    imagesLoaded++
    console.log(`Imagen cargada (${imagesLoaded}/2)`)
    if (imagesLoaded === 2) {
        console.log("Sprites cargados, arrancando juego")
        import('./main.js')
            .then(() => console.log("main.js importado y ejecutado"))
            .catch(err => console.error("Error al importar main.js:", err))
    }
}
