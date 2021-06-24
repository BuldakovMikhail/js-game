const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
};

function getQuantityElementElements(height){
    return document.documentElement.clientHeight / height + 1;
}


function startGame(){
    start.classList.add('hide');
    gameArea.innerHTML = '';
    for (let i = 0; i < getQuantityElementElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = (i * 100);
        gameArea.appendChild(line);
    }
    for (let i = 0; i < getQuantityElementElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i+1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px'
        enemy.style.top = enemy.y + 'px';
        gameArea.appendChild(enemy);
    }
    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2 + 'px';
    car.style.top = 'auto';
    car.style.bottom = '15px';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop
    requestAnimationFrame(playGame);
}

function playGame(){
    if (setting.start){
        setting.score += setting.speed;
        score.innerHTML ="SCORE: <br>" + setting.score;
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x > 0){
            setting.x-=setting.speed;
        }
        if (keys.ArrowRight && setting.x < 250){
            setting.x+=setting.speed;
        }
        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight-car.offsetHeight-15)){
            setting.y+=setting.speed;
        }
        if (keys.ArrowUp && setting.y > 15){
            setting.y-=setting.speed;
        }
        console.log(keys);
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }  
}

function startRun(event){
    event.preventDefault();
    if (keys.hasOwnProperty(event.key)){
        keys[event.key] = true;
    }
}

function stopRun(event){
    event.preventDefault();
    if (keys.hasOwnProperty(event.key)){
        keys[event.key] = false;
    }
}


function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(item){
        item.y += setting.speed;
        item.style.top = item.y + 'px'

        if(item.y > document.documentElement.clientHeight){
            item.y = -100;
        }
    })
}

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(enemy){
        let carRect = car.getBoundingClientRect();
        let enemyRect = enemy.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom &&
        carRect.right >= enemyRect.left &&
        carRect.left <= enemyRect.right &&
        carRect.bottom >= enemyRect.top){
            setting.start = false;
            start.classList.remove('hide');
        }
        enemy.y += setting.speed / 2;
        enemy.style.top = enemy.y + 'px'

        if(enemy.y > document.documentElement.clientHeight){
            enemy.y = -100 * setting.traffic - 200;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px'
        }
    })
}