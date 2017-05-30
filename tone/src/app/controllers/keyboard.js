define([
    'tone',
    'jquery',
    'app/data/keys'
], function (Tone,$, keys) {
    'use strict';

    var OCTAVE_MIN = 1;
    var OCTAVE_MAX = 8;

    var synth = null;
    var feedbackDelay = null;

    var keyboard = {

        note : null,
        octave: 4,

        init : function () {
            var me = this;

            var vol = new Tone.Volume(-6);

            feedbackDelay = new Tone.PingPongDelay({
                "delayTime" : "8n",
                "feedback" : 0.6,
                "wet" : 0.5
            }).chain(vol, Tone.Master);

            synth = new Tone.Synth({
                    "portamento" : 0.05,
                    "oscillator" : {
                        "type" : "sine"
                    }
                }).connect(feedbackDelay);




            $(window).keydown(function(e){
                if (keys.hasOwnProperty(e.keyCode)) {
                    me.note = keys[e.keyCode];
                    me.playNote();
                } else if (e.keyCode === 88) {
                    if (me.octave < OCTAVE_MAX) {
                        me.octave++;
                    }
                } else if (e.keyCode === 90) {
                    if(me.octave > OCTAVE_MIN) {
                        me.octave--
                    }
                }
            });

            $(window).keyup(function (e) {
                if (keys.hasOwnProperty(e.keyCode)) {
                    synth.triggerRelease();
                }
            });

        },

        playNote : function () {

            if (this.note !== null) {
                var _note = this.getNote();
                synth.triggerAttack(_note);
            }
        },

        getNote : function() {
            return this.note + this.octave;
        }
        

    };

    return keyboard;
});