/**
 * Created by nemanja.lazic on 5/30/2017.
 */
define([
    'jquery',
    'app/data/keys'
], function ($,keys) {
    'use strict';

    var canvas = null;
    var context = null;
    var requestAnimationFrame = null;
    var requestId;
    var angle = 0;

    var getRandomColor = function() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }



    var drawCircle = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);

        var centerX = canvas.width / 2 * Math.random();
        var centerY = canvas.height / 2 * Math.random();
        var radius = 25 + 150 * Math.abs(Math.cos(angle));

        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = getRandomColor();
        context.fill();

        angle += Math.PI / 16;
    };


    var web = {

        init: function () {
            canvas = document.getElementById("canvas");
            context = canvas.getContext("2d");

            window.addEventListener('resize', resizeCanvas, false);
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resizeCanvas();

            $(window).keydown(function (e) {
                if (keys.hasOwnProperty(e.keyCode)) {
                    drawCircle();
                    count += 10;
                    console.log(count);
                    requestId = window.requestAnimationFrame(drawCircle);
                }
            });

            $(window).keyup(function (e) {
                if (keys.hasOwnProperty(e.keyCode)) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    window.cancelAnimationFrame(requestId);
                    requestId = undefined;
                }
            });



        }
    };

    return web;
});