/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var margin = { top: 50, right: 10, bottom: 50, left: 50 };
var height = 400 - margin.top - margin.bottom;
var width = 600 - margin.left - margin.right;

var flag = true;
var t = d3.transition().duration(750);

var graph = d3.select('#chart-area')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//SCALES
var x = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.5)
    .paddingOuter(0.5);

var y = d3.scaleLinear()
    .range([height, 0]);


//AXES GROUPS
var xAxisGroup = graph.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0,' + height + ')')

var yAxisGroup = graph.append('g')
    .attr('class', 'y-axis')


d3.json('./data/revenues.json').then(function (data) {

    data.forEach(d => {
        d.revenue = +d.revenue;
        d.profit = +d.profit;
    });

    d3.interval(function () {
        var newData = flag ? data : data.slice(1);
        update(newData);
        flag = !flag;
    }, 1000);

    //RUN CHART FOR FIRST TIME
    update(data);
});

function update(data) {

    var value = flag ? 'revenue' : 'profit';

    //UPDATE DOMAIN
    x.domain(data.map(function (d) {
        return d.month;
    }))
    y.domain([0, d3.max(data, function (d) {
        return d[value];
    })])

    //ADDING AXES
    var xAxis = d3.axisBottom(x)
        .tickSizeOuter(0);
    xAxisGroup.transition(t).call(xAxis);

    var yAxis = d3.axisLeft(y)
        .tickSizeOuter(0);
    yAxisGroup.transition(t).call(yAxis);

    //JOIN NEW DATA WITH OLD
    var rects = graph.selectAll('circle')
        .data(data, function (d) {
            return d.month;
        });

    //CLEARING THE OLD ELEMENTS WHICH ARE NOT PRESENT IN NEW DATA
    rects.exit()
        .attr('fill', 'red')
        .transition(t)
        .attr('cy', y(0))
        .remove();

    //ENTER NEW ELEMENTS PRESENT IN NEW DATA
    rects
        .enter()
        .append('circle')
        .attr('fill', '#CCC')
        .attr('cx', function (d) {
            return x(d.month) + (x.bandwidth() / 2);
        })
        .attr('cy', y(0))
        .attr('r', 5)
        .merge(rects)
        .transition(t)
        .attr('cx', function (d) {
            return x(d.month) + (x.bandwidth() / 2);
        })
        .attr('cy', function (d) {
            return y(d[value]);
        })
}