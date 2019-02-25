var _ = require('lodash')
var d3 = require('d3')

function randomMatrix(params) {
  // randomized initialization
 return  _.map(_.range(params.gridSize),
  function(i) {
    return _.map(_.range(params.gridSize),
      function(j) {
        return Math.random()
      })
  })
}

function circleMatrix(params) {
  // circular disk initialization
  var center = (params.gridSize/2) - 0.5
  var radius = params.gridSize/8

  function distance(center, i, j) {
    return Math.sqrt(Math.pow(center - i, 2) + Math.pow(center - j, 2))
  }

  function isInCircle(i,j) {
    return radius < distance(center, i, j)
  }

  return torus = _.map(_.range(params.gridSize),
    function(i) {
      return _.map(_.range(params.gridSize),
        function(j) {
          return isInCircle(i,j) ? 0.22 : 0.05
        })
    })
}

function hexagonMatrix(params) {
  var points = [
    [(params.gridSize/2) + 1, 0],
    [params.gridSize*0.06698, params.gridSize*.25],
    [params.gridSize*0.06698, params.gridSize*.75],
    [params.gridSize/2, params.gridSize - 1],
    [params.gridSize - (params.gridSize*0.06698), params.gridSize*.75],
    [params.gridSize - (params.gridSize*0.06698), params.gridSize*0.25],
    [(params.gridSize/2) + 1, 0]
  ]
  var hull = d3.polygonHull(points)

  return torus = _.map(_.range(params.gridSize),
    function(i) {
      return _.map(_.range(params.gridSize),
        function(j) {
          return !d3.polygonContains(hull,[i,j])
        })
    })
}

module.exports = function initializeMatrix(params) {
  if (params.matrixType == 'random') return randomMatrix(params)
  return circleMatrix(params)
  //return hexagonMatrix(params)
}