import React, { useEffect, useState, useRef } from 'react';
import './reload';
import "./L.TileLayer.BetterWMS";
import './style.css';
import './legend.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {addLayer, getdata} from "./helper";

const About = () => {
  const mapContainer = React.useRef(null);
  const baseLayer = useRef();
  const _isMounted = useRef(true);
  const layer = useRef();
  const timeDimensionControl = useRef();
  const layer2 = useRef();
  const layer3 = useRef();
  const legendColorRef = useRef();
  const [input, setInput] = useState(true);
  function initMap(){

    //capabilities
    
       baseLayer.current = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
         attribution: '&copy; Pacific Community (OSM)',
         detectRetina: true
     });
   
     
     mapContainer.current = L.map('map', {
       zoom: 5.2,
       zoomSnap: 0.2,
       center: [-16.182934, 201.2202],
       fullscreenControl: true/*,
       timeDimension: true,
       timeDimensionControl: true,
          timeDimensionOptions: {
            currentTime: Date.parse("2022-10-19T00:00:00.000Z")
        },*/
     });
     baseLayer.current.addTo(mapContainer.current); 

     //LEGENDD
  
  legendColorRef.current = L.control({ position: "topright", id:12 });
  legendColorRef.current.onAdd = function() {
          var div = L.DomUtil.create("div", "legend");
          div.innerHTML += "<h4>Legend</h4>";
          div.innerHTML += '<img src="https://opm.gem.spc.int/ncWMS2/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.1.1&request=GetLegendGraphic&LAYERS=1/Hs&STYLES=default-scalar/div-Spectral-inv&numcolorbands=250&transparent=TRUE&width=50&height=200&colorscalerange=0,3" alt="Legend">';
         return div;
        };
        legendColorRef.current.addTo(mapContainer.current);


      //marker test
      let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
      });
      
      L.Marker.prototype.options.icon = DefaultIcon;

     
      // L.marker([-9.4783,	147.1392])
        // .addTo(mapContainer.current)
     //   layer2.current = L.marker([-20.9, 200.2202]).addTo(mapContainer.current).bindPopup("<img style='width:800px' src='https://opm.gem.spc.int/eciks/Aitutaki_1.png'>",{
       //   maxWidth: "auto"
      //});
      
      
        

      
         //end

   //end
    
     //END

     //ADD Layer
    // layer.current = addLayer(mapContainer.current,"Hs","default-scalar/x-Sst");

    const everything = async () =>{
      const response = await fetch('https://opm.gem.spc.int/eciks/sample.json');
      const {timerange} = await response.json();
      return timerange
  }
  
  everything().then((res)=>{
    var timeDimensionControlOptions;
    var timeDimension = new L.TimeDimension({
     timeInterval: res,
       period: "PT3H",
     });
     mapContainer.current.timeDimension = timeDimension; 
   
     timeDimensionControlOptions = {
     timeDimension: timeDimension,
     position:      'bottomleft',
     autoPlay:      false,
     minSpeed:      1,
     speedStep:     1,
     maxSpeed:      15,
     timeSliderDragUpdate: true
     };
     timeDimensionControl.current = new L.Control.TimeDimension(timeDimensionControlOptions);
   
     mapContainer.current.addControl(timeDimensionControl.current);
   
     //Adding Layer
    var wmsLayer_Hs = L.tileLayer.betterWms("https://opm.gem.spc.int/ncWMS2/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.1.1&DATASET=1&random="+Math.random(), {
      layers: '1/Hs',
       format: 'image/png',
       transparent: true,
       opacity: 0.8,
       colorscalerange: '0, 3',
       abovemaxcolor: "extend",
       belowmincolor: "transparent",
       srs: 'EPSG:4326',
       numcolorbands: 50,
       scaleMin: 0,
       styles: 'scalar-contour/x-Sst',
      // styles: 'default',
       attribution: 'SPC ECIKS',
       id:1000
   
   });
   layer.current = new L.timeDimension.layer.wms(wmsLayer_Hs, {
     updateTimeDimension: true,
     name: "Wave Height",
     units: "m",
     enableNewMarkers: true,
   }).addTo(mapContainer.current);
   
  });


  getdata().then((res)=>{
    // mapContainer.current.removeLayer(layer2.current);
     const redIcon = new L.Icon({
       iconUrl:
         "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
       shadowUrl:
         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
       iconSize: [25, 41],
       iconAnchor: [12, 41],
       popupAnchor: [1, -34],
       shadowSize: [41, 41]
     });
     
     for (let i = 0; i < res['features'].length; ++i){
       var lat = res['features'][i]['geometry']['coordinates'][0];
       var lon = res['features'][i]['geometry']['coordinates'][1];
       var risk_image = res['features'][i]['properties']['name'];
       var risklevel = res['features'][i]['properties']['thresold'];
       const myArray = risk_image.split("_");
       var imagename = myArray[0]+"_"+myArray[1]+".png";
       console.log(imagename)
       if (risklevel === 0){
       layer2.current = L.marker([lat,	lon],{id:i}).addTo(mapContainer.current).bindPopup("<img style='width:800px' src='https://opm.gem.spc.int/eciks/"+imagename+"'>",{
         maxWidth: "auto"
     });
   }
   else{
     layer2.current = L.marker([lat,	lon],{icon:redIcon,id:i}).addTo(mapContainer.current).bindPopup("<img style='width:800px' src='https://opm.gem.spc.int/eciks/"+imagename+"'>",{
         maxWidth: "auto"
     });
   }
     
     }
   });
     }


   useEffect(() => {  
     
   if (_isMounted.current){
     initMap();
     
   }  
   return () => { _isMounted.current = false }; 
   },[input]);


   const handleSite=(e)=>{
    setInput(!input);
    e.currentTarget.blur();
    mapContainer.current.removeLayer(layer.current);
    if (layer2.current != null){
       mapContainer.current.removeLayer(layer2.current);
    }
    if (layer3.current != null){
      mapContainer.current.removeLayer(layer3.current);
   }
   if (e.target.value === "Tm"){

    layer.current = addLayer(mapContainer.current,e.target.value,"scalar-contour/x-Sst","0","20");
   }
   else{

    layer.current = addLayer(mapContainer.current,e.target.value,"scalar-contour/x-Sst","0","3");
   }
  }


  const handleChange = (e) => {
    
    const { value, checked } = e.target;
    if (checked){
      
      var st = "black-arrow";
      if (value === "Dp"){
        st = "black-arrow"
      }
          layer2.current = addLayer(mapContainer.current,value,st,"0","3");
      
    }
    else {
      mapContainer.current.removeLayer(layer2.current);
      
      mapContainer.current.eachLayer(function (layer) {
        if (layer.options != null){
          if (layer.options.layers === "1/"+value){
            mapContainer.current.removeLayer(layer);
          }
        }
     });
    }
    e.currentTarget.blur()
  }


  const handleInun = (e) => {
    const { value, checked } = e.target;

   
console.log(value)
    if (checked){
    //  L.marker([-20.9, 200.2202], {id:100}).addTo(layerGroup.current);
      
    getdata().then((res)=>{
      // mapContainer.current.removeLayer(layer2.current);
       const redIcon = new L.Icon({
         iconUrl:
           "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
         shadowUrl:
           "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
         iconSize: [25, 41],
         iconAnchor: [12, 41],
         popupAnchor: [1, -34],
         shadowSize: [41, 41]
       });
       
       for (let i = 0; i < res['features'].length; ++i){
         var lat = res['features'][i]['geometry']['coordinates'][0];
         var lon = res['features'][i]['geometry']['coordinates'][1];
         var risk_image = res['features'][i]['properties']['name'];
         var risklevel = res['features'][i]['properties']['thresold'];
         const myArray = risk_image.split("_");
         var imagename = myArray[0]+"_"+myArray[1]+".png";
         console.log(imagename)
         if (risklevel === 0){
         layer2.current = L.marker([lat,	lon],{id:i}).addTo(mapContainer.current).bindPopup("<img style='width:800px' src='https://opm.gem.spc.int/eciks/"+imagename+"'>",{
           maxWidth: "auto"
       });
     }
     else{
       layer2.current = L.marker([lat,	lon],{icon:redIcon,id:i}).addTo(mapContainer.current).bindPopup("<img style='width:800px' src='https://opm.gem.spc.int/eciks/"+imagename+"'>",{
           maxWidth: "auto"
       });
     }
       
       }
     });
      
    }
    else {
      mapContainer.current.eachLayer(function (layer) {
        console.log(layer.options.id)
        if (layer.options.id >=0 && layer.options.id <=7){
       //   if (layer.options.layers === "1/"+value){
            mapContainer.current.removeLayer(layer);
          //}
        }
     });
    }
    e.currentTarget.blur()

  }


  return (
<>
<div className="sidebar">
<div className="container-fluid">

<p style={{fontSize:'13px', marginTop:'5px',marginBottom:'-20px'}}>Variable: </p>
<div className="row" style={{marginTop:'20px'}}>
      <div className="col-sm-12">
      <select className="form-select form-select-sm" aria-label=".form-select-sm example" onChange={handleSite}  style={{fontSize:'13px', paddingLeft:1}}>
  <option value="Hs">Wave Height</option>
  <option value="Tm">Mean Wave Period</option>
</select>
      </div>
      </div>
  
      <hr style={{marginTop:10}}/>
      <div className="row" style={{marginTop:'0px'}}>
    <div className="col-sm-12">
    <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="languages"
                      value="Dir"
                      id="flexCheckDefault"
                      onChange={handleChange}
                      key={input}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault2"
                      style={{paddingLeft:"3px",fontSize:'13px'}}
                    >
                        Peak Wave Direction
                    </label>
                  </div>
      </div>
      </div>
      <hr style={{marginTop:10}}/>
      <div className="row" style={{marginTop:'-5px'}}>
    <div className="col-sm-12">
    <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="languages"
                      id="flexCheckDefault"
                      defaultChecked={true}
                      onChange={handleInun}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                      style={{paddingLeft:"3px",fontSize:'13px'}}
                    >
                        Inundation
                    </label>
                  </div>
      </div>
      </div>
</div>
</div>
    <div className="content" id="map" ref={mapContainer}>
  </div>
  </>
  );
};

export default About;
