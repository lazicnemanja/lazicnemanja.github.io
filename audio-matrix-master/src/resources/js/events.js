/**
 * @name: Audio-Matrix
 * @author: Nemanja Lazic <nemanja.lazic87@gmail.com>
 * @date: 08/2015
 */
StepSequencer.namespace("StepSequencer.Events");
StepSequencer.Events = function () {
    if (!(this instanceof StepSequencer.Events)) {
        return new StepSequencer.Events();
    }

    this.lastTarget = null;

};

StepSequencer.Events.prototype.registerClickEvents = function() {
	
	var clicking = false;

	$( "#" + StepSequencer.MATRIX_GRID_DIV ).click(function(e) {
		this.lastTarget = $(e.target);
		StepSequencer.toggleLed(this.lastTarget);
		
	});
	
	$( "#" + StepSequencer.MATRIX_GRID_DIV ).mousedown(function(){ clicking = true; });
	$( document ).mouseup(function(){ clicking = false; }); 

	$( "#" + StepSequencer.MATRIX_GRID_DIV ).mousemove(function( e ){
	    if( clicking == false ) return;
	    var target = $( e.target );

	    if (this.lastTarget == null)
	    	this.lastTarget = target;

	    if ( this.lastTarget[0] != target[0] ) {
			this.lastTarget = target;
			StepSequencer.toggleLed(this.lastTarget);

	    }
	});
}
