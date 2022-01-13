var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');
let particlesArray = [];
let ballArray =[];

// 共多少粒子在循環
const numberOfParticle = 200;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 1;
        this.weight = Math.random() * 2 + 1; // 墜落加速度(between 1~2)
        this.directionX =  - (Math.random() * 0.1 + 1) ;
        this.directionY = -1;
    }

    // 降落更新
    update(){
        // 若流到了底部
        if (this.y > canvas.height){
            // 重新開始
            this.y = 0 - this.size;
            this.weight = 2;
            // 從隨機x位置進行繪製(多留一些空間讓最右邊也平均有)
            this.x = Math.random() * canvas.width * 1.3;
        }
        this.weight += 0.005;
        this.y += this.weight + this.directionY;
        // 讓其偏移方向墜落
        this.x += this.directionX;

    }

    // draw methods
    draw(){
        context.fillStyle='rgba(255,255,255,0.5)';
        context.beginPath();
        context.arc( this.x , this.y , this.size , 0 , Math.PI * 2 );
        context.closePath();

        context.fill();
    }
}
// create this first particle from class Particle
// 初始座標(100,10)
// const particle1 =new Particle(400,900);
// 重複設值太麻煩直接使用init製作隨機座標並加入陣列，再用循環讓其都運作

// 點擊產生更多雪球
canvas.addEventListener('click',function( event ){
    const x = event.x;
    const y = event.y;
    // drawCircle();
    for(let i = 0 ; i < 1 ; i++){
        particlesArray.push(new Particle(x,y));
    }
});

function init(){
    // risize時重新置放
    particlesArray = [];

    // 製造出300個隨機座標製造出particle放進particlesArray
    for(let i = 0 ; i < numberOfParticle ; i ++){
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x,y));
    }
}
init();

// create function to loop our animation
function animate(){
    // 重新繪製背景
    context.clearRect(0, 0, canvas.width , canvas.height); 

    // 讓particlesArray裡每個點都進行update()和draw()
    for( let i = 0 ; i < particlesArray.length; i ++ ){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    // 執行動畫循環
    requestAnimationFrame(animate);
}
animate();

// resize時重新計算value
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})