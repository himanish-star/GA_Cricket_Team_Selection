const express = require('express');
const app = express();
const startProcess = require('./main.js').startProcess;
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/static/plotter.html');
})

app.post('/json_data', async (req, res) => {
  const response = await startProcess(req.body.gen, req.body.pop);
  res.send({ data1: response.data1, data2: response.data2 });
})

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
})
