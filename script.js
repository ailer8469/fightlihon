const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('#startBtn');
const box = document.querySelector('.gameBox');

let lastHole;
// 若為true，則為時間到
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;


function pickRandomHole(holes){
    // 隨機選出一個洞
    const randomHole = Math.floor(Math.random() * holes.length);
    // 給hole賦予其洞之值
    const hole = holes[randomHole];

    // 若最後一個為選出來的洞，則會再選一次
    if (hole === lastHole){
        return pickRandomHole(holes);
    }
    lastHole = hole ;
    return hole ;
}

// 出現
function popOut(){
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);

    // css會使其top = 0並顯示
    hole.classList.add('up');
    
    setTimeout(function(){
        // 若無動作，過一段時間會再次藏下去
        hole.classList.remove('up');
        // 若時間尚未結束，則會再次隨機出現
        if(!timeUp) popOut();
    },time);
}

function startGame(){
    // 初始計算秒數 (20000 / 1000 = 20秒)
    countdown = timeLimit / 1000;
    // countdown進行統計
    scoreBoard.textContent = 0 ;
    countdownBoard.style.width = '100px';

    // 顯示剩下秒數
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    
    setTimeout(function(){
        timeUp = true;
    },timeLimit)

    // 讓數字遞減
    let startCountdown = setInterval(() => {
        countdown--;
        countdownBoard.textContent = countdown;

        // 數字歸零時進行cleartimeout
        if( countdown < 0){
            countdown = 0;
            clearTimeout(startCountdown);
            countdownBoard.style.width = 'auto';
            countdownBoard.textContent = '時間結束！你成功打擊了' + score + '次力宏！';
        }
    }, 1000);
}

startButton.addEventListener('click', startGame );

function whack(e){
    document.querySelector('#hitSuccess').play();
    score += 1;
    this.style.backgroundImage = 'url(img/lihon.png)';
    // 讓其點擊幾次都只記一次分數
    this.style.pointerEvents = 'none';
    box.style.cursor ='url("./img/hit.png"), default';
    
    // 更改回來
    setTimeout(() => {
        this.style.backgroundImage = 'url(img/lihongo.png)';
        this.style.pointerEvents = 'all';
    },800);
    setTimeout(() => {
        box.style.cursor = 'url("./img/bat.png"), default';
    },200);
    // 計算分數
    scoreBoard.textContent = score ;
}

// 所有moles都加上事件
moles.forEach(mole => mole.addEventListener('click' , whack , false));


let music = document.getElementById("music");
window.addEventListener('mousemove', function(){
    music.play();
})