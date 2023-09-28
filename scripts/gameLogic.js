const gameScore = document.querySelector('.score');
let keys = {};

let game = {
    speed: 2,
    movingMultip: 4,
    fireballMultip:6,
    fireInterval: 1000,
    cloudpawnInterval: 2500,
    bugsSpawnInterval: 1000,
    bugKillBonus:2000
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
    lastcloudpawn: 0,
    lastBugSpawn: 0,
    isActiveGame: true,
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup',handleKeyUp);

function handleKeyDown(event) {
    keys[event.code] = true;
    
}

function handleKeyUp(event) {
    keys[event.code] = false;
    
}
//fireball function
function shootFireBall(){
    let fireball = document.createElement('div');
    fireball.classList.add('fireball')
    fireball.style.top = (player.y + player.height / 3 - 5) + 'px';
    fireball.x = player.x + player.width;
    fireball.style.left = fireball.x + 'px'
    gameArea.appendChild(fireball)
}
//main function
function gameAction(timestamp) {
    const wizard = document.querySelector('.wizard');
    scene.score++;
    
    //generate clouds
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
    //generate bugs
    if(timestamp - scene.lastBugSpawn > game.bugsSpawnInterval + 5000 * Math.random()){

        let bug = document.createElement('div');
        bug.classList.add('bug');
        bug.x = gameArea.offsetWidth - 60;
        bug.style.left = bug.x + 'px';
        bug.style.top = (gameArea.offsetHeight - 60) * Math.random() + 'px';
        gameArea.appendChild(bug); 
        scene.lastBugSpawn = timestamp;
    }
    let bugs = document.querySelectorAll('.bug');
    bugs.forEach(bug =>{
        bug.x -= game.speed *3;
        bug.style.left = bug.x + 'px';
        if(bug.x + bug.offsetWidth <= 0){
            bug.parentElement.removeChild(bug);
            
        }
    })
    
    //create fireballs movement
    let  fireballs = document.querySelectorAll('.fireball');
    fireballs.forEach(ball =>{
        ball.x += game.speed * game.fireballMultip;
        ball.style.left = ball.x + 'px'
        if(ball.x + ball.offsetWidth > gameArea.offsetWidth){
            ball.parentElement.removeChild(ball)
        }
    })
    //killing bugs with collision and game over logic
    bugs.forEach(bug =>{
        if(collision(wizard,bug)){
            gameOverScreen();
        }
        fireballs.forEach(fireball =>{
            if(collision(fireball,bug)){
                bug.parentElement.removeChild(bug);
                fireball.parentElement.removeChild(fireball)
                scene.score += game.bugKillBonus;
            }
        })
    })


    //movement logic
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
    if(scene.isActiveGame === true){
        window.requestAnimationFrame(gameAction);

    }
}