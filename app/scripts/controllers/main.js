'use strict';

/**
 * @ngdoc function
 * @name pomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pomApp
 */
angular.module('pomApp')
  .controller('MainCtrl', ['$scope', '$interval', function ($scope, $interval) {
    
    $scope.poms = [{
    	interval: 25 * 60000
    }];

    $scope.start = function (pom) { 

    	var time = (new Date()).getTime();
    	var end = time + pom.interval;
    	pom.startTime = time;
    	pom.end = end;
    	pom.percent = 0;
        pom.paused = false;
        pom.break = { 
            interval: pom.interval * .2,
            percent: 0
        };

        var s = 0, m = 0;

    	pom.timing = $interval(function () { 

    		time = (new Date()).getTime();
    		pom.time = time;


            // if (s == 1000) { 
            //     var audio = new Audio('sounds/tick.m4a');
            //     audio.play();
            //     s = 0;              
            // } s = s + 100;

            pom.remaining = (pom.end - pom.time);
    		pom.percent = (100 * (pom.time - pom.startTime) / (pom.end - pom.startTime));

    		if (time >= end) { 
				var audio = new Audio('sounds/tick.m4a');
				audio.play();
    			$interval.cancel(pom.timing);
                pom.breakStart();
    		}
    	}, 100);

        pom.breakStart = function () { 

            var time = (new Date()).getTime();
            var end = time + pom.break.interval;
            pom.break.end = time + pom.break.interval;
            pom.break.percent = 0;
            pom.break.startTime = time;

            pom.break.timing = $interval(function () { 

                time = (new Date()).getTime();
                pom.break.time = time;


                // if (s == 1000) { 
                //     var audio = new Audio('sounds/tick.m4a');
                //     audio.play();
                //     s = 0;              
                // } s = s + 100;

                pom.break.remaining = (pom.break.end - pom.break.time);
                pom.break.percent = (100 * (pom.break.time - pom.break.startTime) / (pom.break.end - pom.break.startTime));

                if (time >= end) { 
                    var audio = new Audio('sounds/tick.m4a');
                    audio.play();
                    $interval.cancel(pom.break.timing);
                }
            }, 100);
        }
    }

    $scope.pause = function (pom) { 
        pom.paused = true;
        $interval.cancel(pom.timing);
        pom.interval = pom.remaining;
    }

    $scope.formatTime = function (interval) { 
    	if (interval > 0) { 
    	var time = {
	    	minutes: Math.floor(interval / 60000),
	    	seconds: Math.floor(interval % 60000 / 1000),
	    	milli: Math.floor(interval % 60000 % 1000)
    	}

    	return pad(time.minutes, 2) + ":" + pad(time.seconds, 2) + ":" + pad(time.milli, 3);
    	} else { return null; }
    }

	function pad(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}


  }]);
