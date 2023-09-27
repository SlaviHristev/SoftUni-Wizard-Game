const gameStart = document.querySelector('.game-start');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gameScore = document.querySelector('.score');


let keys = {};

let game = {
    speed: 2,
    movingMultip: 4,
    fireballMultip:6,
    fireInterval: 1000,
    cloudpawnInterval: 2500
};

let player = {
    x: 100,
    y: 100,
    width: 0,
    height: 0,
    lastTimeFired: 0
};

let scene = {
    score:0,
    lastcloudpawn: 0
}
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

function gameAction(timestamp) {
    scene.score++;
    if(timestamp - scene.lastcloudpawn > game.cloudpawnInterval + 20000 * Math.random()){

        let cloud = document.createElement('div');
        cloud.classList.add('cloud');
        cloud.x = gameArea.offsetWidth - 200;
        cloud.style.left = cloud.x + 'px';
        cloud.style.top = (gameArea.offsetHeight - 200) * Math.random() + 'px';
        gameArea.appendChild(cloud); 
        scene.lastcloudpawn = timestamp;
    }
    let clouds = document.querySelectorAll('.cloud');
    clouds.forEach(cloud =>{
        cloud.x -= game.speed;
        cloud.style.left = cloud.x + 'px';
        if(cloud.x + clouds.offsetWidth <= 0){
            cloud.parentElement.removeChild(cloud);
        }
    })


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

    if(keys['Space'] && timestamp - player.lastTimeFired > game.fireInterval){
        wizard.classList.add('cast')
        shootFireBall(player);
        player.lastTimeFired = timestamp;
    }else{
        wizard.classList.remove('cast')
    }

    wizard.style.top = player.y + 'px';
    wizard.style.left = player.x + 'px';

    gameScore.textContent = scene.score + ' pts.'
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

