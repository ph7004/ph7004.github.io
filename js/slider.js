

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
        // перед тем, как зайти в новый элемент, курсор всегда выходит из предыдущего
        //
        // если мы еще не вышли, значит это переход внутри элемента, отфильтруем его
        if (cursorIsOn) {
            return;
        }

        // посмотрим, куда пришёл курсор
        target = evt.target;
        // уж не на TD ли?
        // да, элемент перешёл внутрь TD!
        while (target != this) {
            if (target.tagName == 'HTML') return;
            if (target.classList.contains('slider_game')) { break;} 
            target = target.parentNode;
        }

        cursorIsOn = target;
        gameCounterElement = cursorIsOn.parentNode;
        gameCounterElement = gameCounterElement.nextSibling;
        gameCounterElement = gameCounterElement.nextSibling;
        console.log('onmouseover work');
        // cursorIsOn.parentNode.setAttribute("data-after", gameCounter);
        animateGames(cursorIsOn);
    }, 50);
};
    //____________________________________________________________________________________________________________________



flex_slider.onmouseout = function (event) {
    clearTimeout(mouseTimeOut);

    scrollTimeOut = setTimeout(function () {
        // если курсор и так снаружи - игнорируем это событие
        if (!cursorIsOn) return;

        // произошёл уход с элемента - проверим, куда, может быть на потомка?
        var relatedTarget = event.relatedTarget;
        if (relatedTarget) { // может быть relatedTarget = null
            while (relatedTarget) {
                // идём по цепочке родителей и проверяем,
                // если переход внутрь currentElem - игнорируем это событие
                if (relatedTarget == cursorIsOn) return;
                relatedTarget = relatedTarget.parentNode;
            }
        }

        // произошло событие mouseout, курсор ушёл
        console.log('onmouseout work')
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
        // element.parentNode.setAttribute("data-after", gameCounter);
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
    // setInterval(function() {
        // bolean = bolean || true;
        if(delInfo) {
            element.textContent = "";
            delInfo = false;
            return;
        }
        var games = Math.random();
        var streams = Math.random();
        gameCounter = 'СТРИМЫ: '+ streams.toFixed(1)*100 + ' ИГРЫ: ' + games.toFixed(1)*100;
        // }, 1000);
        if(!element) return;
        element.textContent = gameCounter;
}













  
  var el = document.getElementsByClassName('flex_slider')[0].firstChild;
      i = 2;
  
  console.group('Siblings of div-1:');
  
  while (el) {
    console.log(i + '. '+ el.nodeName);
    el = el.nextSibling;
    i++;
  };