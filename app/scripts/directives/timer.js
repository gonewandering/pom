'use strict';

/**
 * @ngdoc directive
 * @name pomApp.directive:timer
 * @description
 * # timer
 */
angular.module('pomApp')
  .directive('timer', function () {
    return {
      template: '<div id="{{ id }}"></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

	      	scope.id = "timer-" + Math.round(Math.random() * 10000000);

	      	scope.init = function () { 
				var width = 300,
			    height = 300,
			    radius = Math.min(width, height) / 2;

				var arc = d3.svg.arc()
				    .outerRadius(radius - 10)
				    .innerRadius(radius - 70);

				var pie = d3.layout.pie()
				    .value(function (d) { return d.value; });

				var svg = d3.select("body").append("svg")
				    .attr("width", width)
				    .attr("height", height)
				    .append("g")
				    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

				var data = [{ value: 20, color: "#FF3300" }, { value: 60, color: "#FFF" }];
				var data2 = [{ value: 50, color: "#FF3300" }, { value: 80, color: "#FFF" }];

				var g = svg.selectAll(".arc")
				    .data(pie(data))
				    .enter().append("g")
				    .attr("class", "arc");

				var path = g.append("path")
				    .attr("d", arc)
				    .style("fill", function (d) { return d.data.color; });
				    
				 path = path.data(pie(data2))
				 	.transition()
				    .duration(1000)
				    .attrTween("d", arcTween);

				function arcTween(a) {
					console.log(a);
				  // var i = d3.interpolate(this._current, a);
				  // this._current = i(0);
				  // return function(t) {
				  //   return arc(i(t));
				  // };
				}

			}

			scope.init();

      }
    };
  });

