
let tcc = [],recovered = [], deaths = [], activeCases = [], state = [];
fetch("https://api.rootnet.in/covid19-in/stats/latest").then(response => response.json()).then(ldata => {

    const regionalData = ldata.data.regional; 
    const update = ldata.lastOriginUpdate;
    // console.log(regionalData);
    
    for(let i=0; i< regionalData.length;i++)
    {
        state[i] = regionalData[i].loc;
        tcc[i] = regionalData[i].totalConfirmed;
        recovered[i] = regionalData[i].discharged;
        deaths[i] = regionalData[i].deaths
        activeCases[i] = tcc[i] - deaths[i] - recovered[i];

    }
    
var trace1 = {
    x: state,
    y: tcc,
    type: 'bar',
    name: 'Total Confirmed Cases'
};

var trace2 = {
    x: state,
    y: recovered,
    type: 'bar',
    name: 'Recovered'
};
var trace3 = {
    x: state,
    y: activeCases,
    type: 'bar',
    name: 'Active Cases'
};
var trace4 = {
    x: state,
    y: deaths,
    type: 'bar',
    name: 'Deaths'
};

var data = [trace4,trace2,trace3,trace1];

var layout = {
    barmode: "stack",
    showlegend: true
};

Plotly.newPlot('tester', data, layout, {displayModeBar: false});



});