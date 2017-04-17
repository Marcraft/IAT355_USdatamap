     

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
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                alert(geography.properties.name);
                // var m = {};
                // m[geography.id] = '#000000';
                // datamap.updateChoropleth(m);
            });
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
