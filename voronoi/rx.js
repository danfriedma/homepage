function run () {
  function eventToValue (event) { return event.target.value }

  var inputNames = ['angle','angleFactor','iterations','zoom']

  var width = 700
  var height = 700

  function composeStreams (inputNames) {
    var parameters = {}
    parameters.startPoint = [width/2, height/2]
    inputNames.map(function(inputName) {
      parameters[inputName] = $('#'+inputName)
        .asEventStream("input")
        .map(eventToValue)
    })
    return parameters
  }

  var parameterStream = Bacon.combineTemplate( composeStreams( inputNames ) )

  parameterStream
    .map(spiralGenerator)
    .subscribe(draw)

  function spiralGenerator (parameters) {
    var points = []
    var currentPoint = parameters.startPoint
    for (i = 0; i < parameters.iterations; i++) {
      var newPoint = calculateNextPoint(
        currentPoint,
        parameters.angle * parameters.angleFactor * i,
        parameters.zoom * i
      )
      points.push(newPoint)
      currentPoint = newPoint
    }
    return points
  }

  function draw (parameters) {

  }
}

$(document).ready(run)