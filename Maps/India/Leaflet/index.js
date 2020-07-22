



var map = L.map("map",{ center: [20.5937, 78.9629], crs: L.CRS.EPSG3857, zoom: 4.5, zoomControl: true, preferCanvas: false,  scrollWheelZoom: false });



map.getContainer().addEventListener('mouseover', function () {
        map.dragging.disable();
    });

    // Re-enable dragging when user's cursor leaves the element
map.getContainer().addEventListener('mouseout', function () {
        map.dragging.enable();
    });


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRpbWVodGEiLCJhIjoiY2tjZ3F4d2JjMGkwOTM0cXFmZjc4enVpNSJ9.-g8OjRs_-7w7nIAqNUQ90w', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWRpbWVodGEiLCJhIjoiY2tjZ3F4d2JjMGkwOTM0cXFmZjc4enVpNSJ9.-g8OjRs_-7w7nIAqNUQ90w'
    }).addTo(map);
    
    
    L.tileLayer.provider('Stadia.AlidadeSmoothDark').addTo(map);
    
    
    L.geoJSON(statesData).addTo(map);

    fetch("https://api.rootnet.in/covid19-in/stats/latest").then(response => response.json()).then(ldata => {

        const regionalData = ldata.data.regional; 
        const update = ldata.lastOriginUpdate;
        // console.log(regionalData);
        // console.log(update);
        // console.log(statesData.features[0]);
        var coordinates = {};
        // ldata.features[i].properties.activeCases
        for(let i=0; i< regionalData.length;i++)
        {
            statesData.features[i].properties.totalConfirmedCase = regionalData[i].totalConfirmed;
            statesData.features[i].properties.recovered = regionalData[i].discharged;
            statesData.features[i].properties.deaths = regionalData[i].deaths
            statesData.features[i].properties.activeCases = statesData.features[i].properties.totalConfirmedCase - statesData.features[i].properties.recovered - statesData.features[i].properties.deaths;
            
        }

        coordinates["Latitude"] = [11.66702557,14.7504291,27.10039878,26.7499809,25.78541445,30.71999697,22.09042035,20.26657819,28.6699929,15.491997,22.2587,28.45000633,31.10002545,34.29995933,23.80039349,12.57038129,8.900372741,34.209515,21.30039105,19.25023195,24.79997072,25.57049217,23.71039899,25.6669979,19.82042971,11.93499371,31.51997398,26.44999921,27.3333303,12.92038576,18.1124,23.83540428,30.32040895,27.59998069,22.58039044];
        coordinates["Longitude"] = [92.73598262,78.57002559,93.61660071,94.21666744,87.4799727,76.78000565,82.15998734,73.0166178,77.23000403,73.81800065,71.1924,77.01999101,77.16659704,74.46665849,86.41998572,76.91999711,76.56999263,77.615112,76.13001949,73.16017493,93.95001705,91.8800142,92.72001461,94.11657019,85.90001746,79.83000037,75.98000281,74.63998124,88.6166475,79.15004187,79.0193,91.27999914,78.05000565,78.05000565,88.32994665];
        

     L.geoJson(statesData, {style: style}).addTo(map);

     for (let i = 0; i < coordinates["Latitude"].length; i++) {
        
           L.marker([coordinates["Latitude"][i], coordinates["Longitude"][i]]).addTo(map)
                .bindPopup("<strong><b>State  : "+regionalData[i].loc+"</strong> <br><strong><b>Total Confirmed Cases : "+statesData.features[i].properties.totalConfirmedCase+"</striong><br><strong><font color= red>Deaths : "+statesData.features[i].properties.deaths+"</font></striong><br><strong><font color=green>Recovered : </font>"+statesData.features[i].properties.recovered+"</striong><br><strong><b>Active Cases : "+statesData.features[i].properties.activeCases+"</striong>")
                .on('mouseover', function (e) {
                    this.openPopup();
                });
      }

    });



    function getColorForTCC(tcc) {
        
            // console.log(tcc);
            return tcc > 75000 ? '#800026' :
               tcc > 50000  ? '#BD0026' :
               tcc > 25000  ? '#E31A1C' :
               tcc > 10000  ? '#FC4E2A' :
               tcc > 5000   ? '#FD8D3C' :
                          '#FFEDA0';
        }

    function style(feature) {
        
            return {
                fillColor: getColorForTCC(feature.properties.totalConfirmedCase),
                weight: 2,
                opacity: 1,
                color: 'grey',
                dashArray: '3',
                fillOpacity: 0.7
            };
        
    }
    function highlightFeature(e) {
        var layer = e.target;
        
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
    
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }
    
    var geojson;
    
    function zoomToFeature(e) {
             map.fitBounds(e.target.getBounds());
         }
    function onEachFeature(feature, layer) {
        
        layer.on({
                 mouseover: highlightFeature,
                 mouseout: resetHighlight,
                 click: zoomToFeature
             });
    }
    geojson = L.geoJson(statesData, {
             style: style,
             onEachFeature: onEachFeature
         }).addTo(map);
    