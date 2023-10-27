import L from 'leaflet';
import "leaflet-side-by-side";
import "./L.TileLayer.BetterWMS";


var ipadd = "opm.gem.spc.int";


export function addLayer(mapContainer,name,style,range1, range2){
    var wmsLayer_Hs = L.tileLayer.betterWms("https://"+ipadd+"/ncWMS2/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.1.1&DATASET=1&random="+Math.random(), {
        layers: '1/'+name,
        id:'1000',
        format: 'image/png',
        transparent: true,
        opacity: 0.8,
        colorscalerange: range1+','+range2,
        abovemaxcolor: "extend",
        belowmincolor: "transparent",
        numcolorbands: 50,
        scaleMin: 0,
        styles: style,
        attribution: 'SPC ECIKS'
    
    });
var layer = new L.timeDimension.layer.wms(wmsLayer_Hs, {
      updateTimeDimension: true,
      name: "Wave Height",
      units: "m",
    }).addTo(mapContainer);
    return layer;
}

export function directions(){
    const Nanumangaarr = [
      {"FIJI":
      [
        {id:"Dm", name:"Mean Wave Direction", checked:false},
        {id:"Dp", name:"Peak Wave Direction", checked:false}
      ]}
    ];
    return Nanumangaarr;
  }




export async function fetchdatetime(){
  
  const resp = await fetch('https://opm.gem.spc.int/sample.json');
  const data = await resp.json();
    return data['timerange'];
}


export const getdata = async () =>{
  const response = await fetch('https://opm.gem.spc.int/eciks/result.geojson');
  const timerange = await response.json();
  return timerange
}
/*
export async function addTransact(mapContainer){
 // getdata().then((res)=>{
  var layer = L.geoJson(data, {
    onEachFeature: function (f, l) {
      console.log(f)
      L.marker([-20.9, -159.4166]).addTo(mapContainer.current).bindPopup("<img style='width:800px' src='https://opm.gem.spc.int/eciks/Aitutaki_1.png'>",{
          maxWidth: "auto"
      });
      l.bindPopup("<div>EPR: ok</div>");
    }
  }).addTo(mapContainer);
//}
  return layer;
  /*
  const customData = require('../transacts/Nanumaga.json');
  var layer = L.geoJson(customData, {
    pane: pane,
    id : yearRef,
    onEachFeature: function (f, l) {
      //const resp = await fetch("http://192.168.53.43:8080/cgi-enabled/shore_color.py?t=2&y=1971,1984,2003,2021");
     // var dat;
      //for(i;i< this.state.data.length;i++){
          

     // console.log(resp)
     
      if (legend.length <=2){
        var text = "";
     for (let i = 0; i < data.length; ++i){
      var station = data[i]['id'];
      var high_low = data[i]['Value'];
      if (f.properties.Id === parseInt(station)){
        text = high_low;
        break
      }
      else{
        continue
      }
     }
        
      l.bindPopup("<div>EPR: " + text+"</div>");
      }
      else{
        l.bindPopup("<img style='width: 700px; height: 500px;text-align: center;line-height: 500px;' alt='Loading...' src='http://services.gsd.spc.int:8080/cgi-enabled/shoreline.py?t="+f.properties.Id+"&y="+legend.toString()+"'>",{
      maxWidth: "auto"
      });
    }
   // l.bindPopup("<div>EPR: " + text+"</div>");
  //   l.bindPopup("<img style='width: 700px; height: 500px;text-align: center;line-height: 700px;' alt='Loading...' src='http://192.168.53.43:8080/cgi-enabled/shoreline.py?t="+f.properties.Id+"&y="+legend.toString()+"'>",{
   //   maxWidth: "auto"
    //});
      //}
    },

    style: function (feature) {
      var color;
      for (let i = 0; i < data.length; ++i){
        var station = data[i]['id'];
      var high_low = data[i]['Value'];
        if (feature.properties.Id === parseInt(station)){
            if(parseFloat(high_low) >=parseFloat(0.1)){
              color = "#2874a6"
            }
            else if(parseFloat(high_low) >=0 && parseFloat(high_low) <0.1){
              color = "#2874a6"
            }
            else if(parseFloat(high_low) >=parseFloat(-0.1) && parseFloat(high_low) <parseFloat(0)){
              color = "#fadbd8"
            }
            else if(parseFloat(high_low) >=parseFloat(-0.2) && parseFloat(high_low) <parseFloat(-0.1)){
              color = "#f1948a"
            }
            else if(parseFloat(high_low) >=parseFloat(-0.3) && parseFloat(high_low) <-parseFloat(-0.2)){
              color = "#e74c3c"
            }
            else if(parseFloat(high_low) <= parseFloat(-0.3)){
              color = "#c0392b"
            }
            else{
              color = "black";
            }
         }
      }
      return {
        fillColor: color,
        color: color,
        weight: 4,
        opacity: 0.9,
        fillOpacity: 0,
        };
  },
  }).addTo(mapContainer);
    return layer;
}*/