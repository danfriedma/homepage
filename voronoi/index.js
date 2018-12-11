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

