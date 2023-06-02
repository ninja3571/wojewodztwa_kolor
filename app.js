var map = L.map('map').setView([52.262183, 20.004102], 7);

map.dragging.disable()

L.geoJson(wojewodztwa).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 7,
    minZoom: 7,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var wojL = []
var wojSprawdz = ""
var losy=0
var dobre =[]
var zle =[]

function mapa(){
    for(let i=0;i<=wojewodztwa.features.length-1;i++){
        var woj = wojewodztwa.features[i]
        var mapwoje = L.geoJSON(woj,{color:"blue"}).addTo(map)
        mapwoje.on("mouseover",(e)=>{
        if(wojL[i].options.color=="blue"){
                wojL[i].setStyle({
                    color:"purple",
                    weight:3,
                })
            }
        })

        mapwoje.on("mouseout",(e)=>{
            if(wojL[i].options.color =="blue"){
                wojL[i].setStyle({
                    color:"blue",
                })
            }
        })

        mapwoje.name= wojewodztwa.features[i].properties.nazwa
        wojL.push(mapwoje)
    }
}
mapa()
var wojela = L.geoJson(wojewodztwa.features).addTo(map);
wojela.setStyle({color:"none"})
var wojdos = wojela.getLayers()
function losuj() {

    if (wojdos.length === 0) {
        return null;
    }

    var wylosowanyIndex = Math.floor(Math.random() * wojdos.length)
    var wylosowane = wojdos[wylosowanyIndex]
    var nazwaWojewodztwa = wylosowane.feature.properties.nazwa
    wojdos.splice(wylosowanyIndex, 1)
    return nazwaWojewodztwa

}
function start() {
    var wylosowaneWojewodztwo = losuj()
    if (wylosowaneWojewodztwo !== null) {

        wojSprawdz =  wylosowaneWojewodztwo
        for(let i=0;i<=wojL.length-1;i++){

            if(wojL[i].licznik==1&& wojL[i].options.color =="yellow"){

                wojL[i].setStyle({color:"red",opacity:"0.7"})
                wojL[i].options.color = "red"
            }
            if(wojL[i].name==wylosowaneWojewodztwo){

                wojL[i].setStyle({color:"yellow",opacity:"0.7"})
                wojL[i].options.color = "yellow"
                wojL[i].licznik = 1
            }
        }
    } else {

        if(losy==16){
            document.getElementById("koniec").style.zIndex = 40
            document.getElementById("good").innerHTML = dobre
            document.getElementById("bad").innerHTML = zle
        
            console.log("**************************************************************")
            console.log(dobre)
            console.log(zle)
        }

    }
}
function sprawdz(){ 

        for(let i=0;i<=wojL.length-1;i++){

            if(wojL[i].name == wojSprawdz){
                
            if(document.getElementById("input").value==wojSprawdz){

                wojL[i].setStyle({color:"lime"})
                wojL[i].options.color = "lime"
                dobre.push(wojSprawdz)
                losy++
            }
            else{

                wojL[i].setStyle({color:"red"})
                wojL[i].options.color = "red"
                zle.push(wojSprawdz)
                losy++
            }
            }
        }
        document.getElementById("input").value=""



        start()
}
