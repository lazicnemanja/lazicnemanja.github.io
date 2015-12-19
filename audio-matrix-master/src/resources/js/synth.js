/**
 * @name: Audio-Matrix
 * @author: Nemanja Lazic <nemanja.lazic87@gmail.com>
 * @date: 08/2015
 */
StepSequencer.namespace("StepSequencer.Synth");
StepSequencer.Synth = function (audioContext) {
    if (!(this instanceof StepSequencer.Synth)) {
        return new StepSequencer.Synth(audioContext);
    }

	this.attack = 0;
	this.decay = 20;
	this.sustain = 1;
	this.release = 20; 

	this.context = audioContext;
	this.vca = null;

	this.oscillatorTypes = ["sine","square","sawtooth","triangle"];
	this.oscillators = [];
	

};

StepSequencer.Synth.prototype.start = function( note ) {
	var mm = new StepSequencer.MusicMath();
	freq = mm.pitchFromStringNote( note );
	
	var vco = this.context.createOscillator();
	vco.type = this.oscillatorTypes[0];
	vco.frequency.value = freq;

	this.vca = this.context.createGain();
	this.vca.gain.value = 0.3;

	vco.connect(this.vca);
	this.vca.connect(this.context.destination);

	vco.start(0);
	this.oscillators.push(vco);

	var synthInstance = this;
	setTimeout(function(){
		synthInstance.oscillators.forEach(function(oscillator, _) {
			synthInstance.stop();
		});
	}, 120); 

StepSequencer.Synth.prototype.stop = function() {
	
	var now = this.context.currentTime;
	var release = now + (this.release / 10.0);

	this.vca.gain.cancelScheduledValues(now);
	this.vca.gain.setValueAtTime(this.vca.gain.value, now);
	this.vca.gain.setTargetAtTime(0.0, now, (this.release / 100));

}




}