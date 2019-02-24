(function() {
    var container = document.querySelector('.streams_grid');
    // var IMAGE_TIMEOUT = 10000;
    var activeFilter = 'filter-all';
    var streams = [];
    var filteredStreams = [];
    var currentPage = 0;
    var PAGE_SIZE = 24;
    var scrollTimeOut;


    // var filters = document.querySelector('.stream-filters');
    // filters.addEventListener('click', function(evt) {
    //     var clickedElement = evt.target;
    //     if (clickedElement.classList.contains('stream-filter')) {
    //         setActiveFilter(clickedElement.id);
    //     } else {
    //         console.log('not a button');
    //     }

    // });


    window.addEventListener('scroll', function (evt) { 
        clearTimeout(scrollTimeOut);
        scrollTimeOut = setTimeout(function() {

            var footerCoordinates = document.querySelector('footer.footer').getBoundingClientRect();
            //var viewportSize = window.innerHeight;
            
            if (footerCoordinates.bottom - window.innerHeight <= footerCoordinates.height) {
                if (currentPage < Math.ceil(filteredStreams.length / PAGE_SIZE)) { 
                    renderStreams(filteredStreams, ++currentPage);
                }
            }
            console.log('scrollevent');
        }, 500);
    }, true);

    getStreams();

    function renderStreams(streams, pageNumber, replace) {
        if (replace) {
            container.innerHTML = '';
        }
        var fragment = document.createDocumentFragment();

        var from = pageNumber * PAGE_SIZE;
        var to = from + PAGE_SIZE;
        var pageStreams = streams.slice(from, to);

        
        pageStreams.forEach(function (stream) {
            var streamElement = new Stream(stream);
            streamElement.render();
            fragment.appendChild(streamElement.element);
            // streamElement.element.addEventListener('click', _onClick);
        });
        
        
        container.appendChild(fragment);
    }


    function getStreams() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/streams.json');
        xhr.onload = function (evt) {
            var rawData = evt.target.response;
            var loadedStreams = JSON.parse(rawData);
            streams = loadedStreams;
            filteredStreams = streams.slice(0);
            
            renderStreams(loadedStreams, 0);
        };

        xhr.send();
    }


}());