     

      var map = new Datamap({
        scope: 'usa',
        element: document.getElementById('container1'),
        projection: 'mercator',
        height: 500,
        fills: {
          defaultFill: 'green',
          low: '#fee8c8',
          midLow: '#fdcc8a',
          midHi: '#fc8d59',
          hi: '#d7301f'
        },
        
        data: {
          WA: {fillKey: 'midLow', numberOfThings: 19 },
          OR: {fillKey: 'midLow', numberOfThings: 17 },
          CA: {fillKey: 'hi', numberOfThings: 205 },
          MT: {fillKey: 'low', numberOfThings: 4 },
          ID: {fillKey: 'midHi', numberOfThings: 8 },
          WY: {fillKey: 'midHi', numberOfThings: 6 },
          NV: {fillKey: 'midLow', numberOfThings: 19 },
          UT: {fillKey: 'midLow', numberOfThings: 10 },
          AZ: {fillKey: 'midHi', numberOfThings: 40 },
          ND: {fillKey: 'low', numberOfThings: 0 },
          SD: {fillKey: 'low', numberOfThings: 1 },
          NE: {fillKey: 'midLow', numberOfThings: 9 },
          CO: {fillKey: 'midHi', numberOfThings: 30 },
          KS: {fillKey: 'midLow', numberOfThings: 11 },
          NM: {fillKey: 'midLow', numberOfThings: 21 },
          OK: {fillKey: 'midHi', numberOfThings: 37 },
          TX: {fillKey: 'hi', numberOfThings: 109 },
          MN: {fillKey: 'midLow', numberOfThings: 12 },
          IA: {fillKey: 'low', numberOfThings: 5 },
          MO: {fillKey: 'midHi', numberOfThings: 21 },
          AR: {fillKey: 'low', numberOfThings: 5 },
          LA: {fillKey: 'midHi', numberOfThings: 25 },
          WI: {fillKey: 'midLow', numberOfThings: 12 },
          IL: {fillKey: 'midLow', numberOfThings: 22 },
          MS: {fillKey: 'midLow', numberOfThings: 12 },
          MI: {fillKey: 'midLow', numberOfThings: 20 },
          IN: {fillKey: 'midHi', numberOfThings: 21 },
          OH: {fillKey: 'midHi', numberOfThings: 36 },
          KY: {fillKey: 'midLow', numberOfThings: 18 },
          TN: {fillKey: 'midLow', numberOfThings: 20 },
          AL: {fillKey: 'low', numberOfThings: 2 },
          FL: {fillKey: 'hi', numberOfThings: 71 },
          ME: {fillKey: 'low', numberOfThings: 2 },
          VT: {fillKey: 'low', numberOfThings: 1 },
          NH: {fillKey: 'low', numberOfThings: 3 },
          NY: {fillKey: 'midHi', numberOfThings: 27 },
          MA: {fillKey: 'midLow', numberOfThings: 10 },
          CT: {fillKey: 'low', numberOfThings: 4 },
          RI: {fillKey: 'low', numberOfThings: 1 },
          PA: {fillKey: 'midHi', numberOfThings: 22 },
          NJ: {fillKey: 'midHi', numberOfThings: 23 },
          WV: {fillKey: 'midLow', numberOfThings: 10 },
          MD: {fillKey: 'midLow', numberOfThings: 17 },
          DE: {fillKey: 'low', numberOfThings: 4 },
          VA: {fillKey: 'midHi', numberOfThings: 22 },
          NC: {fillKey: 'midHi', numberOfThings: 26 },
          SC: {fillKey: 'midHi', numberOfThings: 21 },
          GA: {fillKey: 'midHi', numberOfThings: 38 },
          AK: {fillKey: 'midLow', numberOfThings: 19 },
          HI: {fillKey: 'low', numberOfThings: 5 }
        },

        geographyConfig: {
            highlightBorderColor: '#bada55',
            highlightFillColor: '#3584D4',
            highlightBorderWidth: 3,
            popupTemplate: function(geo, data) {
                return ['<div class="hoverinfo">',
                    '<strong>', geo.properties.name, '</strong>',
                    '<br>Total Police killing: <strong>', data.numberOfThings, '</strong>',
                    '</div>'].join('');
            }
        }

      })
      
      
      //sample of the arc plugin
      map.legend();
      map.labels();


var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%Y-%m").parse;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%Y-%m"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("#container2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("bar-data.csv", function(error, data) {

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.value = +d.value;
    });
  
  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.date); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

});