//fetch('find the right api').then(response => response.json()).then(jdata =>{

    var data1 = {
        label: 's1',
        borderColor: 'blue',
        data: [
                { x: '2017-01-06', y: 50 },
                { x: '2017-01-15', y: 91 },
                { x: '2017-03-07', y: 150 },
            ]
    };
     
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      type: 'line',
      data: { datasets: [data1] },
      options: {
        scales: {
          xAxes: [{
            type: 'time'
          }]
        }
      }
    });
//});


