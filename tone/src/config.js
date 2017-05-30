requirejs.config({
    paths: {
        d3: '../bower_components/d3/d3.min',
        text: '../bower_components/text/text',
        jquery: '../bower_components/jquery/dist/jquery.min',
        tone: '../bower_components/tone/build/Tone.min',
        controllers : 'app/controllers'
    },

    deps: ['./app']
});
