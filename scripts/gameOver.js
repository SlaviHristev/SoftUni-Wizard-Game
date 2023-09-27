const gameOver = document.querySelector('.game-over');

function gameOverScreen(){
    scene.isActiveGame = false;
    gameOver.classList.remove('hide');
}