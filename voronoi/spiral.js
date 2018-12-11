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

