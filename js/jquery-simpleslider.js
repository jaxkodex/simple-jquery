(function ($){
    $.fn.simpleSlider = function (options) {
        return this.each(function () {
            var intervalId = null;
            var running = true;
            if (options === 'stop' && intervalId !== null){
                clearInterval(intervalId);
                running = false;
                return;
            }
            if (options === 'start' && intervalId !== null){
                startSlider();
                clearInterval(intervalId);
                intervalId = setInterval(startSlider, 3000);
                running = true;
                return;
            }
            var defaults = {
                viewPort: {
                    width: 900,
                    height: 250
                },
                interval: 3000
            };
            var settings = $.extend(true, {}, defaults, options);
            var controls = $('<ul>')
                                .css('width', settings.viewPort.width+'px')
                                .css('margin', '0 auto')
                                .addClass('simpleslider-controls');
            var sliderDiv = $('<div>')
                                .css('width', settings.viewPort.width+'px')
                                .css('height', settings.viewPort.height+'px')
                                .css('margin', '0 auto')
                                .addClass('simpleslider-viewport-container');
            var controlsDiv = $('<div>').addClass('simpleslider-controls');
            var totalWidth = 0;
            var position = 0;
            var startSlider = function () {
                controls.find('a').removeClass('active');
                $(controls.find('a')[position]).addClass('active');
                sliderDiv.stop().animate({
                    left: (position*settings.viewPort.width)*-1+'px'
                });
                position++;
                if (position >= totalWidth) {
                    position = 0;
                }
            };
            $(this).find('div').each(function (key, value){
                var control = $('<a>').attr('href', 'javascript:void(0);').text(key+1);
                controls.append($('<li>').append(control));
                control.on('click', function (evt) {
                    evt.preventDefault();
                    clearInterval(intervalId);
                    position = key;
                    startSlider();
                    intervalId = setInterval(startSlider, settings.interval);
                });
                $(value).css('width', settings.viewPort.width+'px')
                        .css('height', settings.viewPort.height+'px')
                        .css('float', 'left')
                        .css('overflow', 'hidden')
                        .appendTo(sliderDiv)
                totalWidth++;
            });
            $(this).empty()
                    .append($('<div>').addClass('simpleslider-viewport')
                                .css('width', settings.viewPort.width+'px')
                                .css('height', settings.viewPort.height+'px')
                                .css('overflow', 'hidden')
                                .append(
                                    sliderDiv
                                    .css('width', totalWidth*settings.viewPort.width+'px')))
                    .append(controls);
            if (options === 'stop'){
                clearInterval(intervalId);
                intervalId = 0;
                running = false;
            }else{
                startSlider();
                clearInterval(intervalId);
                intervalId = setInterval(startSlider, settings.interval);
                running = true;
            }
        });
    }
}(jQuery));