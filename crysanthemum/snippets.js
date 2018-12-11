// Helper identity function
var ident = function(d) { return d }

var table = d3.select('table')

function updateTable(torus) {
  var rows = table.selectAll('tr')
    .data(torus)

  var cells = rows.selectAll('td')
    .data(ident)
    .style("background-color", function(d) {
      return color(d)
    })

  cells.exit().remove()

  var cells_in_new_rows = rows
    .enter().append('tr')
    .selectAll('td')
    .data(ident)

  cells_in_new_rows
    .enter()
    .append('td')
    .attr('class', 'cell')
    .style("background-color", function(d) {
      return color(d)
    })

  rows.exit().remove()

  return
}