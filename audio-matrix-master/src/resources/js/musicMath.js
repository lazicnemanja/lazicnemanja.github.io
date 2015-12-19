/**
 * @name: Audio-Matrix
 * @author: Nemanja Lazic <nemanja.lazic87@gmail.com>
 * @date: 08/2015
 */
StepSequencer.namespace("StepSequencer.MusicMath");
StepSequencer.MusicMath = function () {
    if (!(this instanceof StepSequencer.MusicMath)) {
        return new StepSequencer.MusicMath();
    }

    // Class Properties:
    this.noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

};

/**
 * @name noteFromPitch
 * @param (int) note frequency
 * @return (int) midi note 
 */
StepSequencer.MusicMath.prototype.midiNoteFromPitch = function ( frequency ) {
    var midiNote = 12 * ( Math.log( frequency / 440 ) / Math.log( 2 ) );
    return Math.round( midiNote ) + 69; 
};

/**
 * @name frequencyFromMidiNote
 * @param (int) midi note
 * @return (int) note frequency
 */
StepSequencer.MusicMath.prototype.frequencyFromMidiNote = function ( midiNote ) {
    return 440 * Math.pow( 2, ( midiNote - 69 ) / 12) * 2;
}

/**
 * @name stringNoteFromMidiNote
 * @param (int)  midi note
 * @return (array) note, octave
 */
StepSequencer.MusicMath.prototype.stringNoteFromMidiNote = function ( midiNote ) {
    octave = parseInt( midiNote / 12);
    note = (midiNote % 12);
    return [this.noteStrings[note],octave]; 
}

/**
 * @name stringNoteFromPitch
 * @param (int)  note frequency
 * @return (array (int)) note, octave
 */
StepSequencer.MusicMath.prototype.stringNoteFromPitch = function ( frequency ) {
    var midiNote = this.midiNoteFromPitch( frequency );
    return this.stringNoteFromMidiNote( midiNote );
}

StepSequencer.MusicMath.prototype.pitchFromStringNote = function ( StringNote ) {
    var midiNote = this.midiNoteFromStringNote( StringNote );
    return this.frequencyFromMidiNote(midiNote);
}

/**
 * @name midiNoteFromStringNote
 * @param (string)  note
 * @return (int) midi note
 */
StepSequencer.MusicMath.prototype.midiNoteFromStringNote = function ( StringNote ) {
    
    var note = StringNote.substring(0, StringNote.length - 1);
    var scale = StringNote[StringNote.length - 1];

    midiNote = this.getKeyByValue(note) + 12 * scale;

    return midiNote;
}

/**
 * @name stringNoteFromPitch
 * @param (int)  bpm, (int) noteDivision
 * @return (int) delay between two notes in ms
 */
StepSequencer.MusicMath.prototype.bpmToMilliseconds = function ( bpm, noteDivision ) {
    if ( bpm <= 20 || bpm > 999 ) {
        throw "Wrong bpm";
    }
    return (60000 / bpm * 4) / noteDivision
}


StepSequencer.MusicMath.prototype.getKeyByValue = function( value ) {

    for (var i =  this.noteStrings.length - 1; i >= 0; i--) {
        if (  this.noteStrings[i] == value ) {
            return i;
        }
    }
}