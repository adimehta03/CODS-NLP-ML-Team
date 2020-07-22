function createMap(cData){
    // console.log(cData[0].id);
    var canvas= d3.select("body").append("svg")
					.attr("width", '72%')
					.attr("height", '75%')
					.attr("fill", "grey");
					
    d3.json("https://raw.githubusercontent.com/saksham49/CODS-NLP-ML-Team/master/Maps/India/India/states.json", function(data){
    
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return (
                "<center><font size = 3 color=blue>State: "+d.id+"</font><center>"+
                "<br><font size = 2.5>Total Confirmed Cases: "+d["Total Confirmed Cases"] + "</font>" + 
                "<br><font size = 2.5 color = orange>Active Cases: "+d["Active Cases"] + "</font>" + 
                "<br><font size = 2.5 color = green>Recovered: "+d["Recovered"]+"</font>"+
                "<br><font size = 2.5 color=red> Deaths: "+d["Deaths"]+"</font>"
            );
        });
    
    canvas.call(tip);
    var group=canvas.selectAll("g")
        .data(cData)
        .enter()
        .append("g")
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
            
        var projection = d3.geo.mercator().scale(1000).translate([-1000,700]);
        
        var path= d3.geo.path().projection(projection);
    
        var areas= group.append("path")
            .attr("d", path)
            .attr("class", "area")
            .attr("fill", "#5a5a5e")
            .attr("opacity", "1")
    });
    document.querySelector("svg").addEventListener( 'click', function( event ) {
        event.preventDefault();
        zoom.to({ element: event.target });
    } );
}
function appendCases(coronaData){
    fetch('https://raw.githubusercontent.com/saksham49/CODS-NLP-ML-Team/master/Maps/India/India/states.json')
        .then(response => response.json())
        .then(data => {
            
            var cData = data.features;
            // console.log(cData);
            for(let i =0; i< cData.length; i++){
                for(let j = 0; j<cData.length; j++){
                    if(cData[j].id == coronaData[0][i]){
                        // console.log(cData[j].id,coronaData[0][i]);
                        if(cData[j].id == "Dadra and Nagar Haveli and Daman and Diu"){
                            cData[j]["Total Confirmed Cases"] = coronaData[4][7];
                            cData[j]["Active Cases"] = coronaData[1][7];
                            cData[j]["Recovered"] = coronaData[3][7];
                            cData[j]["Deaths"] = coronaData[2][7];
                        }
                        else{
                            cData[j]["Total Confirmed Cases"] = coronaData[4][i];
                            cData[j]["Active Cases"] = coronaData[1][i];
                            cData[j]["Recovered"] = coronaData[3][i];
                            cData[j]["Deaths"] = coronaData[2][i];
                        }
                    }
                }
            }
            createMap(cData);
        });
}

fetch("https://api.rootnet.in/covid19-in/stats/latest").then(response => response.json()).then(fdata => {

    const regionalData = fdata.data.regional; 
    // console.log(regionalData);
    var coronaData = [];
    var loc = {"type":"Location"}, activeCases = {"type":"Active Cases"}, deaths = {"type":"Deaths"}, totalConfirmed = {"type":"Total Confirmed"}, recovered = {"type":"Recovered"};
    for(let i=0; i< regionalData.length;i++)
    {
        loc[i] = regionalData[i].loc;
        totalConfirmed[i] = regionalData[i].totalConfirmed;
        recovered[i] = regionalData[i].discharged;
        deaths[i] = regionalData[i].deaths
        activeCases[i] = totalConfirmed[i] - recovered[i] - deaths[i];
        // console.log(activeCases[i],regionalData[i].loc);
    }
    loc[35] = "Dadra and Nagar Haveli and Daman and Diu";
    coronaData.push(loc,activeCases,deaths,recovered,totalConfirmed);
    // console.log(coronaData);
    appendCases(coronaData);
});
