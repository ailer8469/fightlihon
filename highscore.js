const highScoreBoard = document.querySelector('.highScore');
let score = 0;
// 第一次檢查是否為0或已經有高分存在
let highScore = localStorage.getItem('game1HighScore') || 0;
highScoreBoard.textContent = 'HIGH SCORE : ' + highScore ;

function checkHightScore(){
    // 分數比記錄的還高
    if( score > localStorage.getItem('game1HighScore')){
        localStorage.getItem('game1HighScore', score);
        highScore = score;
        highScoreBoard.textContent = 'HIGH SCORE : ' + highScore ;
    }
}