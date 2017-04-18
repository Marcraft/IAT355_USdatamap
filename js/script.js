var map = new Datamap({
  scope: 'usa',
  element: document.getElementById('container1'),

  projection: 'mercator',
  height: 500,
  fills: {
    defaultFill: '#006d2c',
    low: '#fee8c8',
    midLow: '#fdcc8a',
    midHi: '#fc8d59',
    hi: '#d7301f'
  },

  //OnClick event on the states
  done: function(datamap) {
      datamap.svg.selectAll('.datamaps-subunit').on('click', mapClick);
  },

  data: {
    WA: {fillKey: 'low', death: 19, total: 2.3 },
    OR: {fillKey: 'midLow', death: 17, total: 3.8 },
    CA: {fillKey: 'midLow', death: 205, total: 4.9 },
    MT: {fillKey: 'midLow', death: 4, total: 3.9 },
    ID: {fillKey: 'midLow', death: 8, total: 4.3 },
    WY: {fillKey: 'hi', death: 6, total: 10.3 },
    NV: {fillKey: 'midHi', death: 19, total: 6.7 },
    UT: {fillKey: 'midLow', death: 10, total: 3.4 },
    AZ: {fillKey: 'midHi', death: 40, total: 6.2 },
    ND: {fillKey: 'low', death: 0, total: 1.4 },
    SD: {fillKey: 'midLow', death: 1, total: 3.5 },
    NE: {fillKey: 'midLow', death: 9, total: 4.3 },
    CO: {fillKey: 'midHi', death: 30, total: 5.4 },
    KS: {fillKey: 'midLow', death: 11, total: 3.1 },
    NM: {fillKey: 'hi', death: 21, total: 9.6 },
    OK: {fillKey: 'hi', death: 37, total: 8.3 },
    TX: {fillKey: 'midLow', death: 109, total: 3.6 },
    MN: {fillKey: 'low', death: 12, total: 2.2 },
    IA: {fillKey: 'low', death: 5, total: 1.6 },
    MO: {fillKey: 'midLow', death: 21, total: 3.5 },
    AR: {fillKey: 'low', death: 5, total: 1.7 },
    LA: {fillKey: 'midHi', death: 25, total: 5.8 },
    WI: {fillKey: 'low', death: 12, total: 1.9 },
    IL: {fillKey: 'low', death: 22, total: 1.6 },
    MS: {fillKey: 'low', death: 12, total: 2.7 },
    MI: {fillKey: 'low', death: 20, total: 1.6 },
    IN: {fillKey: 'low', death: 21, total: 2.9 },
    OH: {fillKey: 'low', death: 36, total: 2.5 },
    KY: {fillKey: 'midLow', death: 18, total: 3.6 },
    TN: {fillKey: 'midLow', death: 20, total: 3.1 },
    AL: {fillKey: 'midLow', death: 2, total: 3.5 },
    FL: {fillKey: 'low', death: 71, total: 3.0 },
    ME: {fillKey: 'low', death: 2, total: 1.5 },
    VT: {fillKey: 'low', death: 1, total: 1.6 },
    NH: {fillKey: 'low', death: 3, total: 2.3 },
    NY: {fillKey: 'low', death: 27, total: 1.0 },
    MA: {fillKey: 'low', death: 10, total: 1.3 },
    CT: {fillKey: 'low', death: 4, total: 0.6 },
    RI: {fillKey: 'low', death: 1, total: 0.1 },
    PA: {fillKey: 'low', death: 22, total: 1.4 },
    NJ: {fillKey: 'low', death: 23, total: 1.7 },
    WV: {fillKey: 'midHi', death: 10, total: 5.4 },
    MD: {fillKey: 'low', death: 17, total: 2.5 },
    DE: {fillKey: 'midLow', death: 4, total: 3.2 },
    VA: {fillKey: 'low', death: 22, total: 2.2 },
    NC: {fillKey: 'low', death: 26, total: 2.3 },
    SC: {fillKey: 'midLow', death: 21, total: 3.9 },
    GA: {fillKey: 'low', death: 38, total: 2.9 },
    AK: {fillKey: 'midLow', death: 19, total: 5.4 },
    HI: {fillKey: 'low', death: 5, total: 1.4 }
  },

  geographyConfig: {
      highlightBorderColor: '#bada55',
      highlightFillColor: '#3584D4',
      highlightBorderWidth: 3,
      popupTemplate: function(geo, data) {
          return ['<div class="hoverinfo">',
              '<strong>', geo.properties.name, '</strong>',
              '<br>Total Police killing: <strong>', data.death, '</strong>', '<br><strong>', data.total, ' </strong>per million people',
              '</div>'].join('');
      }
  }

});

//legend and labels plugin
map.legend();
map.labels();


//Event handler: state is clicked on
function mapClick(geography) {
d3.selectAll('.dot')
  .style('opacity', 0);
d3.selectAll('.dot')
  .filter(function(d) {return geography.id == d.state;})
  .style('opacity', 0.5);
// alert(geography.properties.name);
// alert(geography.id);

}

function resetData() {
  d3.selectAll('.dot')
    .style('opacity', 0.5);
}

//MARGINS of graph
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//SCATTERPLOT
//parse date/time
var parseDate = d3.time.format("%d-%b-%y").parse;

//set ranges with scale
var x = d3.time.scale().range([20, width-150]);
var y = d3.scale.linear().range([height, 0])

//define axis
var xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(12);

var yAxis =d3.svg.axis().scale(y)
  .orient("left").ticks(10);

//append svg object to Container 2 of page
//append group element to 'svg'
//moves 'group' element to top left margin
//New SVG in second container of
var svg = d3.select("#container2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Data for Individuals Killed by Police in USA 2015
d3.csv("http://www.sfu.ca/~sytsui/2015USA_PoliceKillings.csv", function(error, data) {
  //format Date data
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.age = +d.age;
  }) ;

  //Scale the range of data
  x.domain(d3.extent(data, function(d) {return d.date}));
  y.domain([0, d3.max(data, function(d) {return d.age; })]);

  //Add x Axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  //Add Y axis
  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + 20 + ", 0)")
    .call(yAxis);

    // Add the text label for the x axis
    svg.append("text")
        .attr("transform", "translate(" + ((width / 2) - 40) + " ," + ((height-20) + margin.bottom) + ")")
        .style("text-anchor", "middle")
        .text("Date (2015)");

    // Add the text label for the Y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 10 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Age at time of Death");

  //attach colour to race with category function
  var colour = d3.scale.category10();
  //attach data to circles (class dot)
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle") //draw the circle
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function(d) {return x(d.date); })
        .attr("cy", function(d) {return y(d.age); })
        .style("fill", function(d) {return colour(d.race); })
        .style("opacity", 0.5);
  //draw legend
  var legend = svg.selectAll(".legend")
        .data(colour.domain())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0, " + i * 20 + ")"; })

  legend.append("rect")
    .attr("x", width - 20)
    .attr("width", 15)
    .attr("height", 15)
    .style("fill", colour)
    .style("opacity", 0.5);

  legend.append("text")
    .attr("class", "legend")
    .attr("x", width - 26)
    .attr("y", 9)
    .attr("dy", ".35em")
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .style("text-anchor", "end")
    .text(function(d) {return d; })
});


//append svg object to Container 2 of page
//append group element to 'svg'
//moves 'group' element to top left margin
//New SVG in second container of
var svg2 = d3.select("#container3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//create X2 y2 Scales
var x2 = d3.scale.ordinal()
  .rangeRoundBands([50, width-100], .1);

var y2 = d3.scale.linear()
  .range([height, 0]);

//Define second set of axises
var x2Axis = d3.svg.axis()
  .scale(x2)
  .orient("bottom")

var y2Axis = d3.svg.axis()
  .scale(y2)
  .orient("left")

d3.csv("http://www.sfu.ca/~sytsui/USA_Populations-by-Race2015_Transposed.csv", function(error, data) {
  //change data from string to number values
  data.forEach(function(d) {
    d.total = +d.total;
  }) ;

  x2.domain(data.map(function(d) {return d.populations; }));
  y2.domain([0, d3.max(data, function(d) {return d.total; })]);

  svg2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(x2Axis);

  svg2.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + 50 + ", 0)")
    .call(y2Axis);

  svg2.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {return x2(d.populations); })
      .attr("y", function(d) {return y2(d.total); })
      .attr("width", x2.rangeBand());

});

svg2.append("rect")
      .attr("x", 50)
      .attr("width", 50)
      .attr("height", 50)
      .style("fill", "red");

// //BAR GRAPH
// //+++Read POPULATION csv data
d3.csv("http://www.sfu.ca/~sytsui/USA_Populations-by-Race2015.csv")
   .row(processPopulationData)
   .get(function(err, d, i){
    console.log(d[2])
   });

//Process Population by Race Data
function processPopulationData(d, i) {
  d["Pop White"] = +d["Pop White"];
  d["Pop White Killed"]	= +d["Pop White Killed"];
  d["Pop Black"] = +d["Pop Black"];
  d["Pop Black Killed"] = +d["Pop Black Killed"];
  d["Pop Hispanic"] = +d["Pop Hispanic"];
  d["Pop Hispanic Killed"] = +d["Pop Hispanic Killed"]
  d["Pop Asian-Poly"] = +d["Pop Asian-Poly"];
  d["Pop Asian-Poly Killed"] = +d["Pop Asian-Poly Killed"];
  d["Pop Other"] = +d["Pop Other"];
  d["Pop Other Killed"] = +d["Pop Other Killed"];
  d["Total Killed"] = +d["Total Killed"]

  //put that arrayed shit in another array called x
  var x = [ d["State "], d["Pop White"], d["Pop White Killed"],
    d["Pop Black"], d["Pop Black Killed"],
    d["Pop Hispanic"], d["Pop Hispanic Killed"] ,
    d["Pop Asian-Poly"], d["Pop Asian-Poly Killed"] ,
    d["Pop Other"], d["Pop Other Killed"]
  ]

  //calculate deaths per pop of 5mil
  var white = (d["Pop White Killed"] / (d["Pop White"]/5000000))
  var black = (d["Pop Black Killed"] / (d["Pop Black"]/5000000))
  var hispanic = (d["Pop Hispanic Killed"] / (d["Pop Hispanic"]/5000000))
  var asian = (d["Pop Asian-Poly Killed"] / (d["Pop Asian-Poly"]/5000000))
  var other = (d["Pop Other Killed"] / (d["Pop Other"]/5000000))

  var x = [d["Total Killed"], white, black, hispanic, asian, other]
  return x;
}
