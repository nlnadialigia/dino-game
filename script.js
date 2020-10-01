const dino = document.querySelector('.dino')
const background = document.querySelector('.background')


let position = 0
let isJumping = false
let isGameOver = false



function handelKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump()
        }
    }
}

function jump() {
    isJumping = true

    let upInterval = setInterval(() =>{
        if (position >=150) {
            //descendo
            clearInterval(upInterval)
            
            let downInterval = setInterval(()=>{
                if (position <= 0) {
                    clearInterval(downInterval)
                    isJumping = false
                } else {
                    position -= 20
                    dino.style.bottom = `${position}px`
                }
            }, 30)
        } else {
            //subindo
            position += 20
            dino.style.bottom = `${position}px`
        }
    }, 30)
}

function createCactus() {
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    let randomTime = Math.random()*6000

    if (isGameOver) return

    cactus.classList.add('cactus')
    background.appendChild(cactus)
    cactus.style.left = `${cactusPosition}px`

    let leftInterval = setInterval(()=>{
        if (cactusPosition < -60) {
            //saiu da tela
            clearInterval(leftInterval)
            background.removeChild(cactus)
        } else if (cactusPosition>0 && cactusPosition<60 && position<60) {
            //GAME OVER
            clearInterval(leftInterval)
            isGameOver = true
            document.body.innerHTML = `
            <div class="game-over">
                <img src="/assets/game-over.jpg" alt="Game Over">
            </div>
            `
        }else{
            cactusPosition -= 10
            cactus.style.left = `${cactusPosition}px`
        }
    }, 30)

    setTimeout(createCactus, randomTime)
}

createCactus()
document.addEventListener('keyup',handelKeyUp)  

