
var something;
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

        Plotly.newPlot('tester', data, layout, {displayModeBar: false});

});



fetch("https://api.covid19india.org/states_daily.json").then(response => response.json()).then(fdata => {
    
    // something = fdata;
    // console.log(something);
    // var xLabel = [], yLabel = [], yLabelRecovered = [],yLabelDeceased = [], cumulativeDaily = [], cumulativeDailyRecovered = [], cumulativeDailyDeceased = [], statesData = ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Daman and Diu", "Delhi", "Dadra and Nagar Haveli", "Goa", "Gujarat", "Himachal Pradesh", "Harayna", "Jharkand", "Jammu and Kashmir", "Karnataka", "Kerala", "Ladakh", "Maharashtra", "Meghalaya", "Manipur", "Madhya Pradesh", "Mizoram", "Nagaland", "Orissa", "Punjab", "Puducherry", "Rajasthan", "Sikkim", "Telangana", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
    // var checDate = [], statusCheck=[];
    // check = Object.keys(fdata.states_daily[0]);
    // for(let i=0; i<Object.keys(fdata.states_daily).length; i++){
        
    //         if(fdata.states_daily[i].ka){
    //             checDate[i] = Object.values(fdata.states_daily[i]).splice(7,1)
    //             statusCheck[i] = Object.values(fdata.states_daily[i]).splice(32,1)
    //             delete fdata.states_daily[i].date
    //             delete fdata.states_daily[i].lk
    //             // delete fdata.states_daily[i].status
    //             delete fdata.states_daily[i].tt
    //             delete fdata.states_daily[i].un
    //                 if(fdata.states_daily[i].status == "Confirmed")
    //                     yLabel.push(Number(fdata.states_daily[i].ka))
    //                 if(fdata.states_daily[i].status == "Deceased")
    //                     yLabelDeceased.push(Number(fdata.states_daily[i].ka))
    //                 if(fdata.states_daily[i].status == "Recovered")
    //                     yLabelRecovered.push(Number(fdata.states_daily[i].ka))
    //         }       
    // } 
    // // console.log(yLabel);
    // xLabel = [].concat.apply([], checDate);
    // xLabel = [...new Set(xLabel)];
    // xLabel = (xLabel.filter(item => !!item))
    // // console.log(xLabel);
    // plotDaily(xLabel,yLabel,yLabelDeceased,yLabelRecovered)

    // var cumulativeSum;

    // cumulativeSum = (sum => value => sum += value)(0);
    // cumulativeDaily = yLabel.map(cumulativeSum);
    // cumulativeDaily.shift();
    // cumulativeSum = 0;
    // cumulativeSum = (sum => value => sum += value)(0);
    // cumulativeDailyDeceased = yLabelDeceased.map(cumulativeSum);
    // cumulativeDailyDeceased.shift();
    // cumulativeSum = 0;

    // cumulativeSum = (sum => value => sum += value)(0);
    // cumulativeDailyRecovered = yLabelRecovered.map(cumulativeSum);
    // cumulativeDailyRecovered.shift();
    // cumulativeSum = 0;
    // console.log(cumulativeDaily,cumulativeDailyDeceased,cumulativeDailyRecovered);
    // for(let i=0; i<37; i++){
    //     var divID = document.createElement('div');
    //     divID.setAttribute('id',"tester"+i)
    //     divID.style.width ="50%";
    //     divID.style.height = "100%";
    //     divID.style.display = "inline-block";
    //     document.getElementById("testerState").appendChild(divID);
    //     plotCumulative(xLabel,cumulativeDaily,cumulativeDailyDeceased,cumulativeDailyRecovered,divID);
    // }

    const statesData = fdata.states_daily;
    let conf=[],rec=[],dec=[],dates=[];
    let j=1,date=null;
    for(let i=0;i<statesData.length;i++){
        date = statesData[i].date;
        delete statesData[i].date;
        delete statesData[i].status;
        if(j==1){
            conf.push(statesData[i]);
            dates.push(date);
            j++;
        } else if(j==2){
            rec.push(statesData[i]);
            j++;
        } else {
            dec.push(statesData[i]);
            j = 1;
        }
    }
    let stateCode = {'Andaman and Nicobar Islands':"an", "Andhra Pradesh":"ap", "Arunachal Pradesh":"ar","Assam":"as", "Bihar":"br", "Chandigarh":"ch", "Chhattisgarh":"ct", "XXXXX":"dd","Delhi": "dl","Dadra and Nagar Haveli and Daman and Diu": "dn", "Goa":"ga", "Gujarat":"gj", "Himachal Pradesh":"hp", "Haryana":"hr", "Jharkhand":"jh", "Jammu and Kashmir":"jk", "Karnataka":"ka", "Kerala":"kl", "Ladakh":"la", "Lakshadweep":"ld", "Maharashtra":"mh", "Meghalaya":"ml", "Manipur":"mn", "Madhya Pradesh":"mp", "Mizoram":"mz", "Nagaland":"nl", "Odisha":"or", "Punjab":"pb", "Pondicherry":"py", "Rajasthan":"rj", "Sikkim":"sk", "Telangana":"tg", "Tamil Nadu":"tn", "Tripura":"tr", "India":"tt", "Unknown":"un", "Uttar Pradesh":"up", "Uttarakhand":"ut", "West Bengal":"wb"};
    let recovered = {"an":[], "ap":[], "ar":[], "as":[], "br":[], "ch":[], "ct":[], "dd":[], "dl":[], "dn":[], "ga":[], "gj":[], "hp":[], "hr":[], "jh":[], "jk":[], "ka":[], "kl":[], "la":[], "ld":[], "mh":[], "ml":[], "mn":[], "mp":[], "mz":[], "nl":[], "or":[], "pb":[], "py":[], "rj":[], "sk":[], "tg":[], "tn":[], "tr":[], "tt":[], "un":[], "up":[], "ut":[], "wb":[]};
    let deceased = {"an":[], "ap":[], "ar":[], "as":[], "br":[], "ch":[], "ct":[], "dd":[], "dl":[], "dn":[], "ga":[], "gj":[], "hp":[], "hr":[], "jh":[], "jk":[], "ka":[], "kl":[], "la":[], "ld":[], "mh":[], "ml":[], "mn":[], "mp":[], "mz":[], "nl":[], "or":[], "pb":[], "py":[], "rj":[], "sk":[], "tg":[], "tn":[], "tr":[], "tt":[], "un":[], "up":[], "ut":[], "wb":[]};
    let confirmed = {"an":[], "ap":[], "ar":[], "as":[], "br":[], "ch":[], "ct":[], "dd":[], "dl":[], "dn":[], "ga":[], "gj":[], "hp":[], "hr":[], "jh":[], "jk":[], "ka":[], "kl":[], "la":[], "ld":[], "mh":[], "ml":[], "mn":[], "mp":[], "mz":[], "nl":[], "or":[], "pb":[], "py":[], "rj":[], "sk":[], "tg":[], "tn":[], "tr":[], "tt":[], "un":[], "up":[], "ut":[], "wb":[]};
    let everythingR=[];
    let everythingC=[];
    let everythingD=[];
    let states = Object.keys(statesData[0]);

    
    for(let i=0;i<rec.length;i++){
        everythingR.push(Object.values(rec[i]));
        everythingC.push(Object.values(conf[i]));
        everythingD.push(Object.values(dec[i]));
    }
    
    function cummulativeSum(a) {
        let result = [a[0]];
    
        for(let i = 1; i < a.length; i++) {
          result[i] = result[i - 1] + a[i];
        }
    
        return result;
    };

    for(let i=0;i<everythingR.length;i++){
        for(let j=0;j<everythingR[i].length;j++){
            recovered[states[j]].push(Number(everythingR[i][j]));
            deceased[states[j]].push(Number(everythingD[i][j]));
            confirmed[states[j]].push(Number(everythingC[i][j]));
        }
    }

    for(let i=0;i<Object.keys(confirmed).length;i++){
        recovered[states[i]] = cummulativeSum(recovered[states[i]]);
        deceased[states[i]] = cummulativeSum(deceased[states[i]]);
        confirmed[states[i]] = cummulativeSum(confirmed[states[i]]);
    }
    // console.log(recovered,deceased,confirmed)   # statewise data in datewise order of dates list above

    for(let i=0; i<37; i++){
        var divID = document.createElement('div');
        divID.setAttribute('id',"tester"+i)
        divID.style.width ="50%";
        divID.style.height = "100%";
        divID.style.display = "inline-block";
        document.getElementById("testerState").appendChild(divID);
        plotCumulative(dates,confirmed[states[i]],deceased[states[i]],recovered[states[i]],divID,states[i]);
    }

});

function plotCumulative(xLabel,cumulativeDaily,cumulativeDailyDeceased,cumulativeDailyRecovered,divID,state){
    // console.log(xLabel);
    var trace1 = {
        x: xLabel,
        y: cumulativeDaily,
        name: 'Total Confirmed Cases',
        type: 'scatter'
      };
      var trace2 = {
          x: xLabel,
          y: cumulativeDailyDeceased,
          name: 'Total Deceased',
          type: 'scatter'
        };
        var trace3 = {
            x: xLabel,
            y: cumulativeDailyRecovered,
            name: 'Total Recovered Cases',
            type: 'scatter'
          };
      
      var data = [trace1,trace3,trace2];
      
      var layout = {
          title: state,
          xaxis: { showticklabels: false }
    };
      Plotly.newPlot(divID.id, data,layout, {displayModeBar:false});
     
}

function plotDaily(xLabel,yLabel,yLabelDeceased,yLabelRecovered){
    console.log(xLabel);
    var trace1 = {
        x: xLabel,
        y: yLabel,
        name: 'Daily Cases',
        type: 'scatter', 'line': {'shape': 'spline', 'smoothing': 1.3}
      };
      var trace2 = {
          x: xLabel,
          y: yLabelDeceased,
          name: 'Daily Deceased',
          type: 'scatter', 'line': {'shape': 'spline', 'smoothing': 1.3}
        };
        var trace3 = {
            x: xLabel,
            y: yLabelRecovered,
            name: 'Daily Recovered Cases',
            type: 'scatter', 'line': {'shape': 'spline', 'smoothing': 1.3}
          };
      
      var data = [trace1,trace3,trace2];
      
      var layout = {
          title: "Karnataka",
          xaxis: { showticklabels: false }
        };
      Plotly.newPlot("testerDaily", data,layout, {displayModeBar:false});
     
}