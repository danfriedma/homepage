(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var width, height
var points = []
var big = 700
var small = 350
var windowWidth = big

function isBigWindow() {
  return window.innerWidth < 512
}

var spiralGenerator = require('./spiral')

var svg = d3.select("div#display").append("svg")
    .attr("width", big)
    .attr("height", big)
    .on("mousemove", function() { var point = d3.mouse(this); redraw(point); });

var path = svg.append("g").selectAll("path")

function polygon(d) {
  return "M" + d.join("L") + "Z"
}

var voronoi = d3.geom.voronoi()
    .clipExtent([[0, 0], [big, big]])

var parameters = {
  startPoint: [big/2, big/2],
  angle: 24,
  step: 0.8,
  zoom: 0.5,
  iterations: 600
}

function resize () {
  if (windowWidth >= 512 && window.innerWidth < 512) {
    svg.attr("width", small)
        .attr("height", small)
    voronoi = d3.geom.voronoi()
      .clipExtent([[0, 0], [small, small]])
    parameters.startPoint = [small/2, small/2]
    redraw()
  }
  if (windowWidth < 512 && window.innerWidth >= 512) {
    svg.attr("width", big)
        .attr("height", big)
    voronoi = d3.geom.voronoi()
      .clipExtent([[0, 0], [big, big]])
    parameters.startPoint = [big/2, big/2]
    redraw()
  }
  windowWidth = window.innerWidth
}

function redraw (point) {
  if (point) {
    points = [point].concat(spiralGenerator(parameters))
  } else {
    points = spiralGenerator(parameters)
  }

  path = path
      .data(voronoi(points), polygon);

  var exit = path.exit()
  //console.log(exit)
  exit.remove()

  path.enter().append("path")
      .attr("class", function(d, i) { return "q" + (i % 9) + "-9"; })
      .attr("d", polygon)

  path.order()
}
resize()
redraw()

window.changeHandler = function changeHandler (event) {
  parameters[event.id] = event.value
  document.querySelector('#output-'+ event.id).value = event.value
  redraw()
}

 window.addEventListener("resize", resize)


},{"./spiral":2}],2:[function(require,module,exports){
/*
parameters
  startPoint
  angle
  step
  zoom
*/

module.exports = function generate (parameters) {
  var points = []

  var currentPoint = parameters.startPoint

  for (i = 0; i < parameters.iterations; i++) {
    var newPoint = calculateNextPoint(
      currentPoint,
      parameters.angle * parameters.step * i,
      parameters.zoom * i
    )
    points.push(newPoint)
    currentPoint = newPoint
  }

  return points
}

var radianConstant = Math.PI/180

function calculateNextPoint (point, angle, distance) {
  return [
    point[0] + (distance * Math.sin(angle * radianConstant)),
    point[1] + (distance * Math.cos(angle * radianConstant))
  ]
}




/*hexagons*/
/*var numPoints = 10
var data = []
for (i = 0; i < numPoints; i++) {
  for (j = 0; j < numPoints; j++) {
    if (i%2 === 0) {
      data.push([i*(width/numPoints),j*(height/numPoints)])
    } else {
      data.push([i*(width/numPoints), (0.5*(height/numPoints))+(j*(height/numPoints))])
    }
  }
}*/


},{}]},{},[1]);
