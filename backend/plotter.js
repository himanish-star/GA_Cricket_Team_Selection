const plot_data = require('./data files/plot_data.json');
const plot_data_2 = require('./data files/plot_data_2.json');

const plotly = require('plotly')({
  "username": "himanish-star",
  "apiKey": "uqtBie19po6rfE5PZXUA"
})

var data = [
  {x:plot_data.x_coords, y:plot_data.y_coords, type: 'scatter'},
  {x:plot_data_2.x_coords, y:plot_data_2.y_coords, type: 'scatter'},
];
var layout = {fileopt : "overwrite", filename : "simple-node-example"};

plotly.plot(data, layout, function (err, msg) {
	if (err) return console.log(err);
	console.log(msg.url);
});
