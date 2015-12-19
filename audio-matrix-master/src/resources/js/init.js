/**
 * @name: Audio-Matrix
 * @author: Nemanja Lazic <nemanja.lazic87@gmail.com>
 * @date: 08/2015
 */
var StepSequencer = StepSequencer || {};

// GLOBAL PARAMETERS:
StepSequencer.ROWS = 16;
StepSequencer.COLUMNS = 16;
StepSequencer.BPM = 80;
StepSequencer.MATRIX_GRID_DIV = "matrixgrid";
StepSequencer.INTERVAL = null;
StepSequencer.GRID = null;
StepSequencer.EVENTS = null;
StepSequencer.SCALES = {
    Pentatonic: ['C', 'A', 'G', 'E', 'D'],
    Minor: ['D', 'C', 'B', 'A', 'G', 'F', 'E', 'D']
};
StepSequencer.CURRENTSCALE = "Pentatonic";
StepSequencer.STARTING_SCALE_NUM = 2;
StepSequencer.AudioContext = new AudioContext();

StepSequencer.namespace = function (namespaceString) {
    var parts = namespaceString.split('.'),
        parent = StepSequencer,
        i, max;

    if (parts[0] === "StepSequencer") {
        parts = parts.slice(1);
    }
    for (i = 0, max = parts.length; i < max; i++) {
        if (typeof parent[parts[i]] == 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

// Enables class inherance 
StepSequencer.inherits = function (child, parent) {
    for (var property in parent) {
        if (parent.hasOwnProperty(property)) {
            child[property] = parent[property];
        }
    }
    function Ghost() { this.constructor = child; }
    Ghost.prototype = parent.prototype;
    child.prototype = new Ghost();
    child._super = parent.prototype;
    return child;
};

StepSequencer.main = function() {
    StepSequencer.GRID = new StepSequencer.MatrixGrid();
    StepSequencer.EVENTS = new StepSequencer.Events();

    StepSequencer.GRID.genereteGrid();
    StepSequencer.EVENTS.registerClickEvents();


    StepSequencer.startLoop();
}

StepSequencer.toggleLed = function(target) {
    var led;
    if ( target.hasClass( "note" ) ) {
        led = target.children();
    }
    else
        led = target;

    if ( led.hasClass( "active" ) ) {
        StepSequencer.GRID.setGridTriger(target.data("row"),target.data("column"),false);
        led.removeClass( "active" )
    }
    else {
        StepSequencer.GRID.setGridTriger(target.data("row"),target.data("column"),true);
        led.addClass( "active" );
    }

    
}

StepSequencer.stringFormat = function (format) {
    if (typeof format === "undefined") return;

    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

StepSequencer.startLoop = function ()
{
    var mm = new StepSequencer.MusicMath();

    clearInterval(StepSequencer.INTERVAL);
    StepSequencer.INTERVAL = setInterval( function() { StepSequencer.loop() }, mm.bpmToMilliseconds( StepSequencer.BPM ,16 ) );
};

StepSequencer.loop = function() {
    StepSequencer.GRID.setCurrentStep();
}