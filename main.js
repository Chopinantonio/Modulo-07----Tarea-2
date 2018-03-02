// Isolated data array to a different file

let margin = null,
    width = null,
    height = null;

let svg = null;
let x, y = null; // scales

setupCanvasSize();
appendSvg("body");
setupXScale();
setupYScale();
appendXAxis();
appendYAxis();
appendLineCharts();


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

// Now on the X axis we want to map totalSales values to
// pixels
// in this case we map the canvas range 0..350, to 0...maxSales
// domain == data (data from 0 to maxSales) boundaries
function setupXScale()
{

  x = d3.scaleTime()
      .range([0, width])
      .domain(d3.extent(totalSales, function(d) { return d.month}));
}

// Now we don't have a linear range of values, we have a discrete
// range of values (one per product)
// Here we are generating an array of product names
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

  var expenseline = d3.line()
                    .x(function(d) { return x(d.month); })
                    .y(function(d) { return y(d.expense); });

  // Add the valueline path.
  svg.append("path")
  .data([totalExpenses])
  .attr("class", "lineB")
  .attr("d", expenseline);

}

 //Binds the data to the line
 var drawline = svg.append("path")
 .datum(data)
 .attr("class", "line")
 .attr("d", line);    	

//Tooltips
var focus = svg.append("g")
   .attr("class", "focus")
   .style("display", "none");

//Adds circle to focus point on line
focus.append("circle")
   .attr("r", 4);

//Adds text to focus point on line    
focus.append("text")
   .attr("x", 9)
   .attr("dy", ".35em");    

//Creates larger area for tooltip   
var overlay = svg.append("rect")
   .attr("class", "overlay")
   .attr("width", width)
   .attr("height", height)
   .on("mouseover", function() { focus.style("display", null); })
   .on("mouseout", function() { focus.style("display", "none"); })
   .on("mousemove", mousemove);

//Tooltip mouseovers            
function mousemove() {
 var x0 = xScale.invert(d3.mouse(this)[0]),
     i = bisectDate(data, x0, 1),
     d0 = data[i - 1],
     d1 = data[i],
     d = x0 - d0.date > d1.date - x0 ? d1 : d0;
 focus.attr("transform", "translate(" + xScale(d.date) + "," + yScale(d.num) + ")");
 focus.select("text").text(d.num);
}; 
  