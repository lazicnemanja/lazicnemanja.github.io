/**
 * @name: Audio-Matrix
 * @author: Nemanja Lazic <nemanja.lazic87@gmail.com>
 * @date: 08/2015
 */
StepSequencer.namespace("StepSequencer.MatrixGrid");
StepSequencer.MatrixGrid = function (rows, columns) {
    if (!(this instanceof StepSequencer.MatrixGrid)) {
        return new StepSequencer.MatrixGrid(rows, columns);
    }

    this.rows = rows || 16;
    this.columns = columns || 16;
    this.currentStep = 0;
    this.grid = [];
};

/**
 * @name genereteGrid
 * @return void 
 */
StepSequencer.MatrixGrid.prototype.genereteGrid = function () {
	
	var grid = $( "#" + StepSequencer.MATRIX_GRID_DIV );

	for ( i = 0; i < this.rows; i++ ) {
		this.grid[i] = [];
        var row = StepSequencer.stringFormat('<div id="row" data-row="{0}">', i);
        for (j = 0; j < this.columns; j++) {
        	this.grid[i].push(false);
            row += StepSequencer.stringFormat('<div id="{0}{1}"class="note" data-row="{0}" data-column="{1}"><div class="led" data-row="{0}" data-column="{1}"></div></div>', i, j);
        }
        row += '</div>';
        grid.append(row);
	}
};

StepSequencer.MatrixGrid.prototype.setCurrentStep = function() {
	
	$(".note").removeClass("current-step");

	var step =  $( "#0" + this.currentStep);
	step.addClass("current-step");


	for (var i = 0; i < StepSequencer.COLUMNS; i++)
	{
		if (this.grid[i][this.currentStep] == 1)
		{

			var scaleLength = StepSequencer.SCALES[StepSequencer.CURRENTSCALE].length
			var noteNum = i % scaleLength;
			var scale = scaleLength - parseInt( i / scaleLength );
			var note = StepSequencer.SCALES[StepSequencer.CURRENTSCALE][noteNum];

			var synth = new StepSequencer.Synth(StepSequencer.AudioContext);
			synth.start(StepSequencer.stringFormat("{0}{1}", note, scale));			
		}
	}


	this.currentStep++;
	if (this.currentStep > 15) {
		this.currentStep = 0;
	}

}

StepSequencer.MatrixGrid.prototype.setGridTriger = function(i, j, value) {
	this.grid[i][j] = value;
}

