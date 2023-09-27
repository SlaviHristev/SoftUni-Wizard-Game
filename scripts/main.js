const gameStart = document.querySelector('.game-start');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gameScore = document.querySelector('.score');


let keys = {};

let game = {
    speed: 2,
    movingMultip: 4,
    fireballMultip:6
};

let player = {
    x: 100,
    y: 100,
    width: 0,
    height: 0
};

gameStart.addEventListener('click', onGameStart);

function onGameStart() {
    gameStart.classList.add('hide');
    const wizard = document.createElement('div');
    wizard.classList.add('wizard');
    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';
    gameArea.appendChild(wizard);
    player.width = wizard.offsetWidth;
    player.height = wizard.offsetHeight;
    
    window.requestAnimationFrame(gameAction);
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup',handleKeyUp);

function handleKeyDown(event) {
    keys[event.code] = true;
    
}

function handleKeyUp(event) {
    keys[event.code] = false;
    
}

function gameAction() {
    const wizard = document.querySelector('.wizard');
    let  fireballs = document.querySelectorAll('.fireball');
    fireballs.forEach(ball =>{
        ball.x += game.speed * game.fireballMultip;
        ball.style.left = ball.x + 'px'
        if(ball.x + ball.offsetWidth > gameArea.offsetWidth){
            ball.parentElement.removeChild(ball)
        }
    })
    if(keys['KeyW'] && player.y > 0){
        player.y -= game.speed * game.movingMultip;
    }
    if (keys['KeyS'] && player.y + player.height < gameArea.offsetHeight) {
        player.y += game.speed * game.movingMultip;
    }
    if(keys['KeyA'] && player.x > 0){
        player.x -= game.speed * game.movingMultip;
    }

    if (keys['KeyD'] && player.x + player.width < gameArea.offsetWidth) {
        player.x += game.speed * game.movingMultip;
    }

    if(keys['Space']){
        wizard.classList.add('cast')
        shootFireBall(player);
    }else{
        wizard.classList.remove('cast')
    }

    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';
    window.requestAnimationFrame(gameAction);
}

function shootFireBall(){
    let fireball = document.createElement('div');
    fireball.classList.add('fireball')
    fireball.style.top = (player.y + player.height / 3 - 5) + 'px';
    fireball.x = player.x + player.width;
    fireball.style.left = fireball.x + 'px'
    gameArea.appendChild(fireball)
}

