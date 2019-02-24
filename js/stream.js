(function() {
    /**
     * 
     * @param {Object} data
     * @constructor 
     */
    function Stream(data) {
        this._data = data;
    }

    Stream.prototype.render = function () {
        var template = document.querySelector('#stream-template');

        if ('content' in template) {
            this.element = template.content.children[0].cloneNode(true);
        } else {
            this.element = template.children[0].cloneNode(true);
        }

        this.element.querySelector('.streamName').textContent = this._data.streamName;
        this.element.querySelector('.channelName').textContent = this._data.channelName;
        this.element.querySelector('.viewers').textContent = this._data.view;
        this.element.querySelector('.gameName').textContent = this._data.gameName;
        this._BG = this.element.querySelector('.stream');

        var backgroundImage = new Image();
        var IMAGE_TIMEOUT = 10000;

        var imageLoadTimeout = setTimeout(function () {
            backgroundImage.src = '';
        }, IMAGE_TIMEOUT);

        backgroundImage.onload = function () {
            clearTimeout(imageLoadTimeout);
            this._BG.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
            this._BG.style.backgroundRepeat = 'round';
        }.bind(this);

        backgroundImage.onerror = function () {
            this._BG.classList.add('stream-nophoto');
            this._BG.style.backgroundRepeat = 'round';
        }.bind(this);

        backgroundImage.src = this._data.preview;

        // return element;
    }

    window.Stream = Stream;
})();