/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var margin = { top: 50, right: 10, bottom: 50, left: 50 };
var height = 400 - margin.top - margin.bottom;
var width = 600 - margin.left - margin.right;

var graph = d3.select('#chart-area')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


d3.json('./data/revenues.json').then(function (data) {

    data.forEach(d => {
        d.revenue = +d.revenue;
        d.profit = +d.profit;
    });
    console.log(data);

    var x = d3.scaleBand()
        .domain(data.map(function (d) {
            return d.month;
        }))
        .range([0, width])
        .paddingInner(0.5)
        .paddingOuter(0.5);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.revenue;
        })])
        .range([height, 0]);


    var xAxis = d3.axisBottom(x)
        .tickSizeOuter(0);
    graph.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    var yAxis = d3.axisLeft(y)
        .ticks(5)
        .tickSizeOuter(0);
    graph.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);

    var rects = graph.selectAll('rect')
        .data(data);

    rects
        .enter()
        .append('rect')
        .attr('x', function (d) {
            return x(d.month);
        })
        .attr('y', function (d) {
            return y(d.revenue);
        })
        .attr('height', function (d) {
            return height - y(d.revenue);
        })
        .attr('width', x.bandwidth())

});