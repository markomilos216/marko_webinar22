function world(){
  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(countries => 
      countries.forEach(country => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
                      <td>${country.name.common}</td>
                      <td>${country.capital}</td>
                      <td>${country.population}</td>
                      <td>${country.region}</td>
                      `;
    document.getElementById('table-body').appendChild(tr);
    })
    ) 
};
world();

am5.ready(function() {

    var root = am5.Root.new("chartdiv");
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    var chart = root.container.children.push(am5map.MapChart.new(root, {
      panX: "rotateX",
      panY: "rotateY",
      projection: am5map.geoOrthographic(),
      paddingBottom: 20,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20
    }));
    
    var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow
    }));
    
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true
    });
    
    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: root.interfaceColors.get("primaryButtonHover")
    });
    
    var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get("alternativeBackground"),
      fillOpacity: 0.1,
      strokeOpacity: 0
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180)
    });
    
    var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
    graticuleSeries.mapLines.template.setAll({ strokeOpacity: 0.1, stroke: root.interfaceColors.get("alternativeBackground") })
    
    chart.animate({
      key: "rotationX",
      from: 0,
      to: 360,
      duration: 30000,
      loops: Infinity
    });
    
    chart.appear(1000, 100); 
});
