

var flex_slider = document.querySelector('.flex_slider');
var cursorIsOn = null;
var mouseTimeOut;
var time;
var time_delay = 0;
var gameCounter;
var gameCounterElement;
var delInfo = true;



_gameCounter(gameCounterElement);

flex_slider.onmouseover = function (evt) {

    clearTimeout(mouseTimeOut);

    scrollTimeOut = setTimeout(function () {

        if (cursorIsOn) {
            return;
        }

        target = evt.target;

        while (target != this) {
            if (target.tagName == 'HTML') return;
            if (target.classList.contains('slider_game')) { break;} 
            target = target.parentNode;
        }

        cursorIsOn = target;
        gameCounterElement = cursorIsOn.parentNode;
        gameCounterElement = gameCounterElement.nextSibling;
        gameCounterElement = gameCounterElement.nextSibling;

        
        animateGames(cursorIsOn);
    }, 50);
};
    //____________________________________________________________________________________________________________________



flex_slider.onmouseout = function (event) {
    clearTimeout(mouseTimeOut);

    scrollTimeOut = setTimeout(function () {
  
        if (!cursorIsOn) return;


        var relatedTarget = event.relatedTarget;
        if (relatedTarget) { 
            while (relatedTarget) {

                if (relatedTarget == cursorIsOn) return;
                relatedTarget = relatedTarget.parentNode;
            }
        }



        antiAnimateGames(cursorIsOn);
        cursorIsOn = null;
    }, 50);
} 

//________________________________________________________________________________________________________________________



  function animateGames (element) {
    var classes = ['activeGame', 'secondGame', 'theirdGame', 'otherGame', 'otherGame', 'otherGame',];
    var activeGame = element;

    _gameCounter(gameCounterElement);
    time = setInterval(function tick() {

        _gameCounter(gameCounterElement);    
    }, 1000);
    
    for (i=0; 6; ++i) {
        activeGame.classList.add(classes[i]);
        activeGame = activeGame.parentNode;
        activeGame = activeGame.parentNode;
        activeGame = activeGame.parentNode;
        activeGame = activeGame.previousElementSibling;
        if (!activeGame) break;
        activeGame = activeGame.childNodes[1];
        activeGame = activeGame.childNodes[1];
        activeGame = activeGame.childNodes[0];
    }
    var activeGame = element;
    for (i=0; 6; ++i) {
        activeGame.classList.add(classes[i]);
        activeGame = activeGame.parentNode;
        activeGame = activeGame.parentNode;
        activeGame = activeGame.parentNode;
        activeGame = activeGame.nextElementSibling;
        if (!activeGame) break;
        activeGame = activeGame.childNodes[1];
        activeGame = activeGame.childNodes[1];
        activeGame = activeGame.childNodes[0];
    }
} 



function antiAnimateGames (element) {
    var classes = ['activeGame', 'secondGame', 'theirdGame', 'otherGame', 'otherGame', 'otherGame',];
    var activeGame = element;
    clearInterval(time);

    _gameCounter(gameCounterElement, true);

    for (i=0; 6; ++i) {
        if (!activeGame) break;
        activeGame.classList.remove(classes[i]);
        activeGame = activeGame.parentNode;
        activeGame = activeGame.parentNode;
        activeGame = activeGame.parentNode;
        activeGame = activeGame.previousElementSibling;
        if (!activeGame) break;
        activeGame = activeGame.childNodes[1];
        activeGame = activeGame.childNodes[1];
        activeGame = activeGame.childNodes[0];
        
    }
    var activeGame = element;
    for (i=0; 6; ++i) {
        if (!activeGame) break;
        activeGame.classList.remove(classes[i]);
        activeGame = activeGame.parentNode;
        activeGame = activeGame.parentNode;
        activeGame = activeGame.parentNode;
        activeGame = activeGame.nextElementSibling;
        if (!activeGame) break;
        activeGame = activeGame.childNodes[1];
        activeGame = activeGame.childNodes[1];
        activeGame = activeGame.childNodes[0];
    }
} 



function _gameCounter(element, delInfo) {

        if(delInfo) {
            element.textContent = "";
            delInfo = false;
            return;
        }
        var games = Math.random();
        var streams = Math.random();
        gameCounter = 'СТРИМЫ: '+ streams.toFixed(1)*100 + ' ИГРЫ: ' + games.toFixed(1)*100;
        if(!element) return;
        element.textContent = gameCounter;
}
