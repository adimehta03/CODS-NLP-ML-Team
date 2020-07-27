
var check, something;
let tcc = [],recovered = [], deaths = [], activeCases = [], state = [];
fetch("https://api.rootnet.in/covid19-in/stats/latest").then(response => response.json()).then(ldata => {

    const regionalData = ldata.data.regional; 
    const update = ldata.lastOriginUpdate;
    
    for(let i=0; i< regionalData.length;i++)
    {
        state[i] = regionalData[i].loc;
        tcc[i] = regionalData[i].totalConfirmed;
        recovered[i] = regionalData[i].discharged;
        deaths[i] = regionalData[i].deaths
        activeCases[i] = tcc[i] - deaths[i] - recovered[i];

    }
    
        var trace1 = {
            x: tcc,
            y: state,
            type: 'bar',
            name: 'Total Confirmed Cases',
            orientation: "h"
        };

        var trace2 = {
            x: recovered,
            y: state,
            type: 'bar',
            name: 'Recovered',
            marker: {color: "green"},
            orientation: "h"
        };
        var trace3 = {
            x: activeCases,
            y: state,
            type: 'bar',
            name: 'Active Cases',
            marker: {color: "blue"},
            orientation: "h"
        };
        var trace4 = {
            x: deaths,
            y: state,
            type: 'bar',
            name: 'Deaths',
            marker: {color: "orange"},
            orientation: "h"
        };

        var data = [trace4,trace2,trace3,trace1];

        var layout = {
            barmode: "stack",
            showlegend: true,
            xaxis: {type:"category",showticklabels: false},
            yaxis: {automargin: true}
            
        };

        Plotly.newPlot('tester', data, layout, {displayModeBar: true});

});



fetch("https://api.covid19india.org/states_daily.json").then(response => response.json()).then(fdata => {
    
    something = fdata;
    var xLabel = [], yLabel = [], cumulativeDaily = [], statesData = ["an", "ap", "ar", "as", "br", "ch", "ct", "dd", "dl", "dn", "ga", "gj", "hp", "hr", "jh", "jk", "ka", "kl", "la", "ld", "mh", "ml", "mn", "mp", "mz", "nl", "or", "pb", "py", "rj", "sk", "tg", "tn", "tr", "up", "ut", "wb"];
    var checDate, statusCheck;
    check = Object.keys(fdata.states_daily[0]);
    for(let i=0; i<Object.keys(fdata.states_daily).length; i++){
        checDate = fdata.states_daily[i].date
        statusCheck = fdata.states_daily[i].status
        if(checDate && statusCheck == "Confirmed"){
            xLabel.push(fdata.states_daily[i].date); 
            {
                yLabel.push(Number(fdata.states_daily[i].ka))
            }
        }       
    } 
    // console.log(check);
    const cumulativeSum = (sum => value => sum += value)(0);
    cumulativeDaily = yLabel.map(cumulativeSum);
    cumulativeDaily.shift();
    // console.log(cumulativeDaily);
    for(let i=1; i<38; i++){
        var divID = document.createElement('div');
        divID.setAttribute('id',"tester"+i)
        divID.style.width ="50%";
        divID.style.height = "100%";
        divID.style.display = "inline-block";
        document.getElementById("testerState").appendChild(divID);
        // console.log(divID.id);
        plot(xLabel,cumulativeDaily,divID);
    }
    
});

function plot(xLabel,cumulativeDaily,divID){
    // console.log(xLabel);
    var trace1 = {
        x: xLabel,
        y: cumulativeDaily,
        type: 'scatter'
      };
      
      var data = [trace1];
      
      var layout = {
        xaxis: {
            tickangle: 35,
            showticklabels: true,
            type: 'category',
        }
    };
      Plotly.newPlot(divID.id, data,layout);
     
    // console.log(xLabel,yLabel);
}