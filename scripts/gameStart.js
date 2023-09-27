const gameStart = document.querySelector('.game-start');
const gameArea = document.querySelector('.game-area');

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