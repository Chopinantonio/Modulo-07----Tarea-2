// Isolated data array to a different file

let margin = null,
    width = null,
    height = null;

let svg = null;
let tooltip = null;
let x, y = null; // scales

setupCanvasSize();
appendSvg("body");
appendTooltip("body");
setupXScale();
setupYScale();
appendXAxis();
appendYAxis();
appendLineCharts();
appendPointCharts();


// 1. let's start by selecting the SVG Node

function setupCanvasSize() {
  margin = {top: 20, left: 80, bottom: 20, right: 30};
  width = 960 - margin.left - margin.right;
  height = 520 - margin.top - margin.bottom;
}

function appendSvg(domElement) {
  svg = d3.select(domElement).append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform",`translate(${margin.left}, ${margin.top})`);

}


function appendTooltip(domElement){
  tooltip=d3.select(domElement)
    .append('div')	
    .attr('class', 'tooltip')				
    .style('opacity', 0);
}

// X and Y axis

function setupXScale()
{

  x = d3.scaleTime()
      .range([0, width])
      .domain(d3.extent(totalSales, function(d) { return d.month}));
}

function setupYScale()
{
  var maxSales = d3.max(totalSales, function(d, i) {
    return d.sales;
  });

  y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, maxSales]);

}

function appendXAxis() {
  // Add the X Axis
  svg.append("g")
    .attr("transform",`translate(0, ${height})`)
    .call(d3.axisBottom(x));
}

function appendYAxis() {
  // Add the Y Axis
  svg.append("g")
  .call(d3.axisLeft(y));
}

function appendLineCharts()
{
  // define the line
  var valueline = d3.line()
                    .x(function(d) { return x(d.month); })
                    .y(function(d) { return y(d.sales); });

  // Add the valueline path.
  svg.append("path")
  .data([totalSales])
  .attr("class", "line")
  .attr("d", valueline);
}

function appendPointCharts(){
  svg.selectAll('dot')
    .data(totalSales)
    .enter().append('circle')
    .style('fill','darkblue')
    .attr('r', 4.5)
    .attr('cx', d => x(d.month))
    .attr('cy', d =>y(d.sales))
    .on('mouseover',d=>{

      //Show the tooltip
      tooltip.transition()		
        .duration(200)		
        .style('opacity', .9);

      // Add context to tooltip
      tooltip.html(`<span>${d.sales}</span>`)	
        .style('left', (d3.event.pageX) + 'px')		
        .style('top', (d3.event.pageY - 28) + 'px');

    }).on('mouseout',d=>{
      //Hide the tooltip
      tooltip.transition()		
        .duration(500)
        .style('opacity', 0);
    });
}

 