var margin = { top: 10, right: 10, bottom: 100, left: 100 };

var height = 400 - margin.top - margin.bottom;
var width = 600 - margin.left - margin.right;

var g = d3.select('#chart-area')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.json('./data/buildings.json').then(function (data) {

    data.forEach(d => {
        d.height = +d.height;
    });

    var x = d3.scaleBand()
        .domain(
            data.map(function (d) {
                return d.name;
            })
        )
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3)

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.height;
        })])
        .range([height, 0]);

    var xAxisCall = d3.axisBottom(x).tickSizeOuter(0);
    g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxisCall)

    var yAxisCall = d3.axisLeft(y)
        .ticks(3)
        .tickFormat(function (d) {
            return d + 'm';
        })
        .tickSizeOuter(0);
    g.append('g')
        .attr('class', 'y-axis')
        .call(yAxisCall)

    var rects = g.selectAll('rect')
        .data(data);

    rects.enter()
        .append('rect')
        .attr('x', function (d, i) {
            return x(d.name);
        })
        .attr('y', function (d) {
            return y(d.height);
        })
        .attr('width', x.bandwidth)
        .attr('height', function (d) {
            return height - y(d.height);
        })
        .attr('fill', '#ccc');
})



















// var data = [20, 14, 17, 22, 10];

// var svg = d3.select('#chart-area')
//     .append('svg')
//     .attr('width', '400')
//     .attr('height', '400');


// var circles = svg.selectAll('circle').data(data);
// circles
//     .enter()
//     .append('circle')
//     .attr('cx', function (d, i) {
//         return 50 * i + d;
//     })
//     .attr('cy', 75)
//     .attr('r', function (d) {
//         return d;
//     })
//     .attr('fill', 'green')




// // var rect = svg
// //     .append('rect')
// //     .attr('x', '0')
// //     .attr('y', '0')
// //     .attr('width', '100')
// //     .attr('height', '100')
// //     .attr('fill', '#333');

// // var circle = svg
// //     .append('circle')
// //     .attr('cx', '200')
// //     .attr('cy', 200)
// //     .attr('r', 100)
// //     .attr('fill', 'blue');

// // var ellipse = svg
// //     .append('ellipse')
// //     .attr('cx', '200')
// //     .attr('cy', 200)
// //     .attr('rx', 200)
// //     .attr('ry', 100)
// //     .attr('fill', 'red');