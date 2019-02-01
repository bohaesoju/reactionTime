var bigScreen = document.querySelector('#screen');
var text = document.querySelector('.text');
var text2 = document.querySelector('.text2');
var bottomText = document.querySelector('.bottomText').classList;
var tries = document.querySelector('.tries');
var triesSpan = document.createElement('span');
var scoreWrap = [];
var triesEm = document.createElement('em');
triesEm.textContent = String(scoreWrap.length);
var triesI = document.createElement('i');
var averageSpan = document.querySelector('.average span');
var averageI = document.querySelector('.average i');
var screenClass = bigScreen.classList;
var startTime;
var endTime;
var timeout;
var score;
var averageValue;
bigScreen.addEventListener('click', function () {
    if (screenClass.contains('waiting')) {
        if (scoreWrap.length === 3) {
            init();
        }
        else if (scoreWrap.length === 0) {
            averageI.textContent = "\uD3C9\uADE0 : ";
        }
        else {
            averageSpan.textContent = averageValue + " ms";
        }
        tries.textContent = '시도횟수 :';
        tries.appendChild(triesSpan);
        bottomText.remove('finish');
        screenClass.remove('waiting');
        screenClass.add('ready');
        text.textContent = "빨간화면에서 초록색 화면으로 넘어갈때 빠르게 화면을 클릭하세요.";
        text2.textContent = "";
        timeout = setTimeout(function () {
            startTime = Number(new Date());
            bigScreen.click();
        }, Math.floor(Math.random() * 1000 + 2000)); // 2000~3000 사이의 수
    }
    else if (screenClass.contains('ready')) { //준비상태
        if (!startTime) { //부정 클릭
            clearTimeout(timeout);
            screenClass.remove('ready');
            screenClass.add('waiting');
            text.textContent = '너무 성급하시군요!';
            text2.textContent = '다시 클릭하고 시작하세요';
        }
        else {
            screenClass.remove('ready');
            screenClass.add('now');
            text.textContent = '지금 클릭하세요 !!!!!';
            text2.textContent = "";
        }
    }
    else if (screenClass.contains('now')) {
        endTime = Number(new Date());
        score = endTime - startTime;
        scoreWrap.push(score);
        triesEm.textContent = String(scoreWrap.length);
        getAverage();
        if (scoreWrap.length === 3) {
            result('final');
        }
        else {
            result('notfinal');
        }
    }
});
var result = function (e) {
    startTime = null;
    endTime = null;
    screenClass.remove('now');
    text.textContent = score + " ms";
    if (e === 'final') {
        screenClass.add('waiting', 'final');
        bottomText.add('finish');
        text2.textContent = "\uCD5C\uC885 \uACB0\uACFC\uB294 " + averageValue + " ms \uC785\uB2C8\uB2E4";
        averageI.textContent = "\uAC8C\uC784\uC744 \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uC791\uD558\uC2DC\uB824\uBA74 \uD074\uB9AD\uD558\uC138\uC694 !";
        averageSpan.textContent = "";
        tries.textContent = '';
    }
    else {
        screenClass.add('waiting');
        text2.textContent = '클릭해서 다시 시작하세요';
        averageSpan.textContent = averageValue + " ms";
    }
};
var getAverage = function () {
    var sum = 0;
    scoreWrap.forEach(function (i) {
        sum += i;
        var averageValue2 = sum / scoreWrap.length;
        averageValue = Number(averageValue2.toFixed(0));
        averageSpan.textContent = averageValue + " ms";
    });
};
var init = function () {
    text.textContent = '화면을 클릭하면 게임이 시작됩니다.';
    tries.textContent = '시도횟수 :';
    tries.appendChild(triesSpan);
    triesSpan.appendChild(triesEm);
    triesSpan.appendChild(triesI);
    triesI.textContent = ' of 3';
    scoreWrap = [];
    triesEm.textContent = String(scoreWrap.length);
    averageI.textContent = '평균 : ';
    averageSpan.textContent = '';
    averageValue = 0;
};
init();
