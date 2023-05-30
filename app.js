var map = L.map('map').setView([52.262183, 20.004102], 7);

map.dragging.disable()

L.geoJson(wojewodztwa).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 7,
    minZoom: 7,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//mapa kolorowanie
function style(feature) {
    return {
        fillColor: 'blue',
        weight: 2,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(wojewodztwa, {style: style}).addTo(map);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        fillColor: 'yellow',
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}

geojson = L.geoJson(wojewodztwa, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

// losowanie
function losuj(){
    max = 16
    return Math.floor(Math.random()*max)
}

function woj(){
    losuj()
    console.log(losuj())
    
}