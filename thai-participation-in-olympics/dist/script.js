// set the dimensions and margins of the graph
var margin = {top: 10, right: 50, bottom: 30, left: 60},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/NateePanomchokpisal/Thai_Olympics_Anticipation/main/data_olympic.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d.Year,
            men:d.Men,
            women:d.Women,
            value : d.Total }
  },

  // Now I can use this dataset:
  function(data) {

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )
    // Add the line of men
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.men) })
        )
    // Add the line of women
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "pink")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.women) })
        )
  // Add text labels
svg.append("text")
		.attr("transform", "translate(" + (width+3) + "," + y(data[4].value) + ")")
		.attr("dy", ".05em")
		.attr("text-anchor", "start")
		.style("fill", "red")
		.text("Total");

	svg.append("text")
		.attr("transform", "translate(" + (width+3) + "," + y(data[0].men) + ")")
		.attr("dy", ".05em")
		.attr("text-anchor", "start")
		.style("fill", "steelblue")
		.text("Men");
  
  svg.append("text")
		.attr("transform", "translate(" + (width+3) + "," + y(data[15].women) + ")")
		.attr("dy", ".05em")
		.attr("text-anchor", "start")
		.style("fill", "pink")
		.text("Women");

})