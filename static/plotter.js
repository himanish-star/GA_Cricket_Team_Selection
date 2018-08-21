$(() => {
  $.get('/json_data', (res) => {
    const trace1 = {
    x: res.data1.x_xoords,
    y: res.data1.y_coords,
    mode: 'lines'
    };

    const trace2 = {
      x: res.data2.x_xoords,
      y: res.data2.y_coords,
    mode: 'lines'
    };
    const data = [ trace1, trace2];

    let layout = {};

    Plotly.newPlot('myDiv', data, layout);
  })
});
