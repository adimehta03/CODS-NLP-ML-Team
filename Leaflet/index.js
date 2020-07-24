//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////SETTING UP THE MAP//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

      var map = L.map("map",{ center: [20.5937, 78.9629], crs: L.CRS.EPSG3857, zoom: 4.5, zoomControl: true, preferCanvas: false,  scrollWheelZoom: false });

      var colorScaleLayer = {"red":242, "green" : 189, "blue" : 174, "rScaleFactor" : 13, "gScaleFactor" : 189, "bScaleFactor" : 174};
      
      var maxActive,minActive, layer = null;

      let activeList = [];

      console.log(colorScaleLayer);
      map.getContainer().addEventListener('mouseover', function () {
              map.dragging.disable();
          });

      map.getContainer().addEventListener('mouseout', function () {
              map.dragging.enable();
          });
      
      map.on('doubleclick', function(e) {
            map.panTo(e.latlng);
      });

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRpbWVodGEiLCJhIjoiY2tjZ3F4d2JjMGkwOTM0cXFmZjc4enVpNSJ9.-g8OjRs_-7w7nIAqNUQ90w', {
      maxZoom: 18,
      id: 'mapbox/dark-v10',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiYWRpbWVodGEiLCJhIjoiY2tjZ3F4d2JjMGkwOTM0cXFmZjc4enVpNSJ9.-g8OjRs_-7w7nIAqNUQ90w'
      }).addTo(map);
      
      
      L.tileLayer.provider('Stadia.AlidadeSmoothDark').addTo(map);

      document.addEventListener('keydown', function(event){
      if(event.key === "Escape"){
        map.flyTo([20.5937, 78.9629], 4.5)
        }
      });

      
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
              activeList.push(statesData.features[i].properties.totalConfirmedCase)
          }
          
          maxActive = Math.max.apply(Math, activeList);
          minActive = Math.min.apply(Math,activeList);

          coordinates["Latitude"] = [11.66702557,14.7504291,27.10039878,26.7499809,25.78541445,30.71999697,22.09042035,20.26657819,28.6699929,15.491997,22.2587,28.45000633,31.10002545,34.29995933,23.80039349,12.57038129,8.900372741,34.209515,21.30039105,19.25023195,24.79997072,25.57049217,23.71039899,25.6669979,19.82042971,11.93499371,31.51997398,26.44999921,27.3333303,12.92038576,18.1124,23.83540428,30.32040895,27.59998069,22.58039044];
          coordinates["Longitude"] = [92.73598262,78.57002559,93.61660071,94.21666744,87.4799727,76.78000565,82.15998734,73.0166178,77.23000403,73.81800065,71.1924,77.01999101,77.16659704,74.46665849,86.41998572,76.91999711,76.56999263,77.615112,76.13001949,73.16017493,93.95001705,91.8800142,92.72001461,94.11657019,85.90001746,79.83000037,75.98000281,74.63998124,88.6166475,79.15004187,79.0193,91.27999914,78.05000565,78.05000565,88.32994665];
          
          
      L.geoJson(statesData, {style: style}).addTo(map);

      for (let i = 0; i < coordinates["Latitude"].length; i++) {
          // 
            var marker = L.marker([coordinates["Latitude"][i], coordinates["Longitude"][i]]).addTo(map)
                  .bindPopup("<strong><b>State  : "+regionalData[i].loc+"</strong> <br><strong><b>Total Confirmed Cases : "+statesData.features[i].properties.totalConfirmedCase+"</striong><br><strong><font color= red>Deaths : "+statesData.features[i].properties.deaths+"</font></striong><br><strong><font color=green>Recovered : </font>"+statesData.features[i].properties.recovered+"</striong><br><strong><b>Active Cases : "+statesData.features[i].properties.activeCases+"</striong>")
                  .on('mouseover', function (e) {
                      this.openPopup();
                  });
        }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// EVENT LISTENERS FOR THE BUTTONS //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function onClickHandler
document.getElementById("filterButton").addEventListener("click", () => {
  document.getElementById("tccButton").addEventListener("click", () => {
    colorScaleLayer.red = 242;
    colorScaleLayer.green = 189;
    colorScaleLayer.blue = 174;
    colorScaleLayer.rScaleFactor = 13;
    colorScaleLayer.gScaleFactor = 189;
    colorScaleLayer.bScaleFactor = 174;
    // for(let i=0; i<35; i++)     activeList.push(ldata.data.regional[i].properties.totalConfirmedCase)
    // console.log(activeList);
    // maxActive = Math.max.apply(Math, activeList);
    // minActive = Math.min.apply(Math,activeList);
  });
  document.getElementById("acButton").addEventListener("click", () => {
    colorScaleLayer.red = 153;
    colorScaleLayer.green = 214;
    colorScaleLayer.blue = 255;
    colorScaleLayer.rScaleFactor = -153;
    colorScaleLayer.gScaleFactor = 75;
    colorScaleLayer.bScaleFactor = 0;
    // maxActive = Math.max.apply(Math, activeList.push(statesData.features[i].properties.activeCases));
    // minActive = Math.min.apply(Math,activeList.push(statesData.features[i].properties.activeCases));
  });
  document.getElementById("recoveredButton").addEventListener("click", () => {
    colorScaleLayer.red = 173;
    colorScaleLayer.green = 234;
    colorScaleLayer.blue = 173;
    colorScaleLayer.rScaleFactor = -123;
    colorScaleLayer.gScaleFactor = 29;
    colorScaleLayer.bScaleFactor = 123;
    // maxActive = Math.max.apply(Math, activeList.push(statesData.features[i].properties.recovered));
    // minActive = Math.min.apply(Math,activeList.push(statesData.features[i].properties.recovered));
  });
  dButton.addEventListener("click", () => {
    colorScaleLayer.red = 204;
    colorScaleLayer.green = 204;
    colorScaleLayer.blue = 204;
    colorScaleLayer.rScaleFactor = -76;
    colorScaleLayer.gScaleFactor = 76;
    colorScaleLayer.bScaleFactor = 76;
    // maxActive = Math.max.apply(Math, activeList.push(statesData.features[i].properties.deaths));
    // minActive = Math.min.apply(Math,activeList.push(statesData.features[i].properties.deaths));
  });


    map.removeLayer(layer);
    layer = L.geoJson(statesData, {style: style});
    map.addLayer(layer);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// DIFFERENT LAYERS ON THE MAP ////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function style(feature) {
      console.log();
            const r = colorScaleLayer.red + (colorScaleLayer.rScaleFactor * ((feature.properties.activeCases - minActive) / (maxActive - minActive )));
            const g = colorScaleLayer.green - (colorScaleLayer.gScaleFactor * ((feature.properties.activeCases - minActive) / (maxActive - minActive )));
            const b = colorScaleLayer.blue - (colorScaleLayer.bScaleFactor * ((feature.properties.activeCases - minActive) / (maxActive - minActive )));
            return {
                fillColor: `rgb(${r},${g},${b})`,
                weight: 2,
                opacity: 1,
                color: 'grey',
                dashArray: '3',
                fillOpacity: 0.7
            };
        
    }
    function highlightFeature(e) {
        layer = e.target;
        
        layer.setStyle({
            weight: 3,
            dashArray: '',
            fillOpacity: 0.7
        });
        lastClickedLayer = layer;
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
             console.log(e.target.getBounds());
             
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////Legend////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var colorScale1 = d3.scaleSequential(d3.interpolateReds)
      .domain([minActive,maxActive]);


    continuous("#legend1", colorScale1);



    // create continuous color legend
    function continuous(selector_id, colorscale) {
      var legendheight = 300,
          legendwidth = 70,
          margin = {top: 10, right: 60, bottom: 10, left: 2};

      var canvas = d3.select(selector_id)
        .style("height", legendheight + "px")
        .style("width", legendwidth + "px")
        .style("position", "relative")
        .append("canvas")
        .attr("height", legendheight - margin.top - margin.bottom)
        .attr("width", 1)
        .style("height", (legendheight - margin.top - margin.bottom) + "px")
        .style("width", (legendwidth - margin.left - margin.right) + "px")
        .style("border", "1px solid #000")
        .style("position", "absolute")
        .style("top", (margin.top) + "px")
        .style("left", (margin.left) + "px")
        .node();

      var ctx = canvas.getContext("2d");

      var legendscale = d3.scaleLinear()
        .range([1, legendheight - margin.top - margin.bottom])
        .domain(colorscale.domain());

      // image data hackery based on http://bl.ocks.org/mbostock/048d21cf747371b11884f75ad896e5a5
      var image = ctx.createImageData(1, legendheight);
      d3.range(legendheight).forEach(function(i) {
        var c = d3.rgb(colorscale(legendscale.invert(i)));
        image.data[4*i] = c.r;
        image.data[4*i + 1] = c.g;
        image.data[4*i + 2] = c.b;
        image.data[4*i + 3] = 255;
      });
      ctx.putImageData(image, 0, 0);

      // A simpler way to do the above, but possibly slower. keep in mind the legend width is stretched because the width attr of the canvas is 1
      // See http://stackoverflow.com/questions/4899799/whats-the-best-way-to-set-a-single-pixel-in-an-html5-canvas
      /*
      d3.range(legendheight).forEach(function(i) {
        ctx.fillStyle = colorscale(legendscale.invert(i));
        ctx.fillRect(0,i,1,1);
      });
      */

      var legendaxis = d3.axisRight()
        .scale(legendscale)
        .tickSize(6)
        .ticks(8);

      var svg = d3.select(selector_id)
        .append("svg")
        .attr("height", (legendheight) + "px")
        .attr("width", (legendwidth) + "px")
        .style("left", " 10px")
        .style("top", "50px")

      svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (legendwidth - margin.left - margin.right + 3) + "," + (margin.top) + ")")
        
        .call(legendaxis);

      svg
        .select("g").append("text")
        .attr("fill", "#fff")
        
        .call(legendaxis);
    };
    });


//////////////////////////////////////////////////////////////////////////////////////////////////////////////