     

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
          WA: {fillKey: 'hi', numberOfThings: 2002 },
          OR: {fillKey: 'hi', numberOfThings: 2002 },
          CA: {fillKey: 'hi', numberOfThings: 2002 },
          MT: {fillKey: 'midHi', numberOfThings: 2002 },
          ID: {fillKey: 'midHi', numberOfThings: 2002 },
          WY: {fillKey: 'midHi', numberOfThings: 2002 },
          NV: {fillKey: 'midHi', numberOfThings: 2002 },
          UT: {fillKey: 'midHi', numberOfThings: 2002 },
          AZ: {fillKey: 'midHi', numberOfThings: 2002 },
          ND: {fillKey: 'midLow', numberOfThings: 2002 },
          SD: {fillKey: 'midLow', numberOfThings: 2002 },
          NE: {fillKey: 'midLow', numberOfThings: 2002 },
          CO: {fillKey: 'midLow', numberOfThings: 2002 },
          KS: {fillKey: 'midLow', numberOfThings: 2002 },
          NM: {fillKey: 'midLow', numberOfThings: 2002 },
          OK: {fillKey: 'midLow', numberOfThings: 2002 },
          TX: {fillKey: 'midLow', numberOfThings: 2002 },
          MN: {fillKey: 'low', numberOfThings: 2002 },
          IA: {fillKey: 'low', numberOfThings: 2002 },
          MO: {fillKey: 'low', numberOfThings: 2002 },
          AR: {fillKey: 'low', numberOfThings: 2002 },
          LA: {fillKey: 'low', numberOfThings: 2002 },
          WI: {fillKey: 'midLow', numberOfThings: 2002 },
          IL: {fillKey: 'midLow', numberOfThings: 2002 },
          MS: {fillKey: 'midLow', numberOfThings: 2002 },
          MI: {fillKey: 'midHi', numberOfThings: 2002 },
          IN: {fillKey: 'midHi', numberOfThings: 2002 },
          OH: {fillKey: 'midHi', numberOfThings: 2002 },
          KY: {fillKey: 'midHi', numberOfThings: 2002 },
          TN: {fillKey: 'midHi', numberOfThings: 2002 },
          AL: {fillKey: 'midHi', numberOfThings: 2002 },
          FL: {fillKey: 'midHi', numberOfThings: 2002 },
          ME: {fillKey: 'hi', numberOfThings: 2002 },
          VT: {fillKey: 'hi', numberOfThings: 2002 },
          NH: {fillKey: 'hi', numberOfThings: 2002 },
          NY: {fillKey: 'hi', numberOfThings: 2002 },
          MA: {fillKey: 'hi', numberOfThings: 2002 },
          CT: {fillKey: 'hi', numberOfThings: 2002 },
          RI: {fillKey: 'hi', numberOfThings: 2002 },
          PA: {fillKey: 'hi', numberOfThings: 2002 },
          NJ: {fillKey: 'hi', numberOfThings: 2002 },
          WV: {fillKey: 'hi', numberOfThings: 2002 },
          MD: {fillKey: 'hi', numberOfThings: 2002 },
          DE: {fillKey: 'hi', numberOfThings: 2002 },
          VA: {fillKey: 'hi', numberOfThings: 2002 },
          NC: {fillKey: 'hi', numberOfThings: 2002 },
          SC: {fillKey: 'hi', numberOfThings: 2002 },
          GA: {fillKey: 'hi', numberOfThings: 2002 },
          AK: {fillKey: 'midHi', numberOfThings: 2002 },
          HI: {fillKey: 'midLow', numberOfThings: 2002 }
        },

        geographyConfig: {
            highlightBorderColor: '#bada55',
            highlightFillColor: '#3584D4',
            highlightBorderWidth: 3,
            popupTemplate: function(geo, data) {
                return ['<div class="hoverinfo">',
                    '<strong>', geo.properties.name, '</strong>',
                    '<br>Killing per capita: <strong>', data.numberOfThings, '</strong>',
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