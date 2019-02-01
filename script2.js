const screen = document.querySelector('#screen');
const text = document.querySelector('.text');
const text2 = document.querySelector('.text2');
const bottomText = document.querySelector('.bottomText').classList;
const tries = document.querySelector('.tries');
const triesSpan = document.createElement('span');
let scoreWrap = [];
let triesEm = document.createElement('em');
triesEm.textContent = scoreWrap.length;
const triesI = document.createElement('i');
let averageSpan = document.querySelector('.average span');
let averageI = document.querySelector('.average i');
const screenClass = screen.classList;
let startTime;
let endTime;
let timeout;
let score;
let averageValue;

screen.addEventListener('click', () => {
    if(screenClass.contains('waiting')){
        if(scoreWrap.length === 3){
            init();
        } else if(scoreWrap.length === 0){
            averageI.textContent = `평균 : `
        }
        else {
            averageSpan.textContent = `${averageValue} ms`
        }
        tries.textContent = '시도횟수 :';
        tries.appendChild(triesSpan);
        bottomText.remove('finish');
        screenClass.remove('waiting');
        screenClass.add('ready');
        text.textContent = "빨간화면에서 초록색 화면으로 넘어갈때 빠르게 화면을 클릭하세요."
        text2.textContent = "";
        timeout = setTimeout(() => {
            startTime = new Date();
            screen.click();
        }, Math.floor(Math.random() * 1000 + 2000)) // 2000~3000 사이의 수
    } else if(screenClass.contains('ready')){ //준비상태
        if(!startTime){ //부정 클릭
            clearTimeout(timeout);
            screenClass.remove('ready');
            screenClass.add('waiting');
            text.textContent = '너무 성급하시군요!'
            text2.textContent = '다시 클릭하고 시작하세요'
        } else {
            screenClass.remove('ready');
            screenClass.add('now');
            text.textContent = '지금 클릭하세요 !!!!!'
            text2.textContent = ""
        }
    } else if(screenClass.contains('now')){
        endTime = new Date();
        score = endTime - startTime;
        scoreWrap.push(score);
        triesEm.textContent = scoreWrap.length;
        getAverage();
        if(scoreWrap.length === 3){
            result('final');
        } else {
            result();
        }
    }
});

const result = (e) => {
    startTime = null;
    endTime = null;
    screenClass.remove('now');
    text.textContent = `${score} ms`;
    if(e === 'final'){
        screenClass.add('waiting','final');
        bottomText.add('finish');
        text2.textContent = `최종 결과는 ${averageValue} ms 입니다`
        averageI.textContent = `게임을 처음부터 다시 시작하시려면 클릭하세요 !`
        averageSpan.textContent = ``
        tries.textContent = '';
    } else {
        screenClass.add('waiting');
        text2.textContent = '클릭해서 다시 시작하세요';
        averageSpan.textContent = `${averageValue} ms`
    }
};

let getAverage = () => {
    let sum = 0;
    scoreWrap.forEach((i) => {
        sum += i;
        let averageValue2 = sum/scoreWrap.length;
        averageValue = averageValue2.toFixed(0);
        averageSpan.textContent = `${averageValue} ms`
    });
}

const init = () => {
    text.textContent = '화면을 클릭하면 게임이 시작됩니다.';
    tries.textContent = '시도횟수 :';
    tries.appendChild(triesSpan);
    triesSpan.appendChild(triesEm);
    triesSpan.appendChild(triesI);
    triesI.textContent = ' of 3';
    scoreWrap = [];
    triesEm.textContent = scoreWrap.length;
    averageI.textContent = '평균 : ';
    averageSpan.textContent = '';
    averageValue = '';
};

init();