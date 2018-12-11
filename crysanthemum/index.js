var _ = require('lodash')
var d3 = require('d3')
var d3ScaleChromatic = require('d3-scale-chromatic')
var color = d3.scaleSequential(d3ScaleChromatic.interpolateRainbow)
var initializeMatrix = require('./matrix')

var canvas, context, torus, windowWidth

run({
  // n for an n x n matrix
  gridSize:  128,
  pixels: 4,
  // constants in the range [0,1000]
  Gain: 950,
  Coupling: 900,
  // control parameter, computed property coupled to Gain
  r: undefined,
  // number of iterations to strobe through per animation cycle
  iterations: 1,
  //color
  Color: 0.5
})

function updateR(params) {
  params.r = 4 * params.Gain/1000
  return params
}

// update the map
function step(torus, params) {
  params = updateR(params)
  var torusFreeze = torus
  return torus.map(function(row, i) {
    return row.map(function(x, j) {
      var c = (params.Coupling*(averageNeighbors(torusFreeze, params, i, j) - x)) / 1000
      return clip(dynamics(x, params.r, c))
    })
  })
}

// update the map N times
function stepN(n, torus, params) {
  if (n == 1) return step(torus, params)
  return stepN(n - 1, step(torus, params), params)
}


function dynamics(x, r, c) {
  return (r * x * (1 - x)) + c
}

// clip range to [0,1]
function clip(x) {
  if (x > 1) return 1
  if (x < 0) return 0
  return x
}

function averageNeighbors(torus, params, i, j) {
  // handle wrap around - array -> torus
  var up = ((i - 1) < 0) ? params.gridSize - 2 : (i - 1)
  var right = ((j + 1) > (params.gridSize - 1)) ? 0 : (j + 1)
  var down = ((i + 1) > (params.gridSize - 1)) ? 0 : (i + 1)
  var left = ((j - 1) < 0) ? params.gridSize - 2 : (j - 1)
  // return average
  return (
    torus[up][j] +
    torus[i][right] +
    torus[down][j] +
    torus[i][left]
  ) / 4
}

function draw(params) {
  // update torus
  torus = stepN(params.iterations, torus, params)

  //update canvas
  for(var i = 0; i < params.gridSize; i++) {
    for(var j = 0; j < params.gridSize; j++) {
      context.fillStyle = color(torus[i][j]*params.Color)
      context.fillRect(j*params.pixels, i*params.pixels, params.pixels, params.pixels)
    }
  }
  return

/*  var index = 0
  context.fillStyle = "black"
  context.fillRect(0, 0, params.gridSize, params.gridSize)

  var pix = context.createImageData(params.gridSize, params.gridSize)

  torus.map(function(row, i) {
    row.map(function(cell, j) {
      var rgb = color(cell).replace(/[^\d,]/g, '').split(',')

      pix.data[index++] = parseInt(rgb[0], 10)
      pix.data[index++] = parseInt(rgb[1], 10)
      pix.data[index++] = parseInt(rgb[2], 10)
      pix.data[index++] = 255
      return
    })
  })

  context.putImageData(pix, 0, 0, 0, 0, params.gridSize * params.pixels, params.gridSize * params.pixels)
  return*/
}


function run(params) {
  windowWidth = window.innerWidth

  canvas = document.createElement('canvas')
  if (windowWidth < 512) {
    params.pixels = 2
  }

  canvas.width = params.gridSize * params.pixels
  canvas.height = canvas.width

  context = canvas.getContext('2d')

  document.getElementById("chart").appendChild( canvas )

  // Register UI handlers
  window.changeHandler = function changeHandler(event) {

    params[event.id] = event.value
    //document.querySelector('#output-'+ event.id).value = event.value
  }

  window.reset = function reset(event) {
    torus = initializeMatrix(params)
  }

  window.addEventListener("resize", function resize(event) {
    if (windowWidth >= 512 && window.innerWidth < 512) {

      params.pixels = 2
      canvas.width = params.gridSize * params.pixels
      canvas.height = canvas.width
    }
    if (windowWidth < 512 && window.innerWidth >= 512) {
      params.pixels = 4
      canvas.width = params.gridSize * params.pixels
      canvas.height = canvas.width
    }
    windowWidth = window.innerWidth
  }
)

  // initialize torus
  torus = initializeMatrix(params)

  function animate () {
    window.requestAnimationFrame(animate)
    draw(params)
  }

  animate()

}
