function getData(map){
    fetch("https://api.rootnet.in/covid19-in/stats/latest").then(response => response.json()).then(fdata => {

        const regionalData = fdata.data.regional; 
        const update = fdata.lastOriginUpdate;
        // console.log(regionalData);
        // console.log(update);
        var coronaData = [], coordinates = {},loc = {}, activeCases = {}, deaths = {}, totalConfirmed = {}, recovered = {};

        for(let i=0; i< regionalData.length;i++)
        {
            loc[i] = regionalData[i].loc;
            totalConfirmed[i] = regionalData[i].totalConfirmed;
            recovered[i] = regionalData[i].discharged;
            deaths[i] = regionalData[i].deaths
            activeCases[i] = totalConfirmed[i] - recovered[i] - deaths[i];
            // console.log(activeCases[i],regionalData[i].loc);
        }
        coordinates["Latitude"] = [11.66702557,14.7504291,27.10039878,26.7499809,25.78541445,30.71999697,22.09042035,20.26657819,28.6699929,15.491997,22.2587,28.45000633,31.10002545,34.29995933,23.80039349,12.57038129,8.900372741,34.209515,21.30039105,19.25023195,24.79997072,25.57049217,23.71039899,25.6669979,19.82042971,11.93499371,31.51997398,26.44999921,27.3333303,12.92038576,23.83540428,27.59998069,30.32040895,22.58039044,20.397373];
        coordinates["Longitude"] = [92.73598262,78.57002559,93.61660071,94.21666744,87.4799727,76.78000565,82.15998734,73.0166178,77.23000403,73.81800065,71.1924,77.01999101,77.16659704,74.46665849,86.41998572,76.91999711,76.56999263,77.615112,76.13001949,73.16017493,93.95001705,91.8800142,92.72001461,94.11657019,85.90001746,79.83000037,75.98000281,74.63998124,88.6166475,79.15004187,91.27999914,78.05000565,78.05000565,88.32994665,72.832802];
        coronaData.push(loc,activeCases,deaths,recovered,totalConfirmed,coordinates);
        // console.log(coronaData);
        markerPoint(coronaData,map);

    });}
    function markerPoint(coronaData,map){
    //   console.log(coronaData[0]);
      for (let i = 0; i < coronaData[5]["Latitude"].length; i++) {
           L.marker([coronaData[5]["Latitude"][i], coronaData[5]["Longitude"][i]]).addTo(map)
                .bindPopup("<strong><b>State  : "+coronaData[0][i]+"</strong> <br><strong><b>Total Confirmed Cases : "+coronaData[4][i]+"</striong><br><strong><font color= red>Deaths : "+coronaData[2][i]+"</font></striong><br><strong><font color=green>Recoveries : </font>"+coronaData[3][i]+"</striong><br><strong><b>Active Cases : "+coronaData[1][i]+"</striong>")
                .on('mouseover', function (e) {
                    this.openPopup();
                });
            
    //   getColorForTCC(coronaData[4][i]);
      }
    //   getColorForAC(coronaData[1]);
    //   getColorForRC(coronaData[3]);
    //   getColorForDeaths(coronaData[2]);

    }

    // function getColorForTCC(tcc) {
    //     {
    //         console.log(tcc);
    //         return tcc > 75000 ? '#800026' :
    //            tcc > 50000  ? '#BD0026' :
    //            tcc > 25000  ? '#E31A1C' :
    //            tcc > 10000  ? '#FC4E2A' :
    //            tcc > 5000   ? '#FD8D3C' :
    //            tcc > 20000   ? '#FEB24C' :
    //                       '#FFEDA0';
    //     }
        
    // } 
    // function style(feature) {
    //     // console.log(feature);
        
    //   for(let i =0; i<Object.keys(feature).length; i++){
    //         return {
    //             fillColor: getColorForTCC(feature[i].properties.density),
    //             weight: 2,
    //             opacity: 1,
    //             color: 'grey',
    //             dashArray: '3',
    //             fillOpacity: 0.7
    //         };
    //     }
    // }
    // function getColorForAC(ac) {
    //     return ac > 1000 ? '#800026' :
    //            ac > 500  ? '#BD0026' :
    //            ac > 200  ? '#E31A1C' :
    //            ac > 100  ? '#FC4E2A' :
    //            ac > 50   ? '#FD8D3C' :
    //            ac > 20   ? '#FEB24C' :
    //            ac > 10   ? '#FED976' :
    //                       '#FFEDA0';
    // }
    // function getColorForRC(rc) {
    //     return rc > 1000 ? '#800026' :
    //            rc > 500  ? '#BD0026' :
    //            rc > 200  ? '#E31A1C' :
    //            rc > 100  ? '#FC4E2A' :
    //            rc > 50   ? '#FD8D3C' :
    //            rc > 20   ? '#FEB24C' :
    //            rc > 10   ? '#FED976' :
    //                       '#FFEDA0';
    // }
    // function getColorForDeaths(d) {
    //     return d > 1000 ? '#800026' :
    //            d > 500  ? '#BD0026' :
    //            d > 200  ? '#E31A1C' :
    //            d > 100  ? '#FC4E2A' :
    //            d > 50   ? '#FD8D3C' :
    //            d > 20   ? '#FEB24C' :
    //            d > 10   ? '#FED976' :
    //                       '#FFEDA0';
    // }