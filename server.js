const express = require('express');
const app = express();
const data1 = require('./plot_data.json');
const data2 = require('./plot_data_2.json');

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/static/plotter.html');
})

app.get('/json_data', (req, res) => {
  res.send({ data1, data2 });
})

app.listen(3000, () => {
  console.log("started http://localhost:3000");
})
