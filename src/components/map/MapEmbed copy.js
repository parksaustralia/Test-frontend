// @ts-nocheck
import React from "react"
import { Helmet } from "react-helmet"
import { useEffect, useRef, useState, memo } from "react"

function MapEmbed(props) {
  const [includeScript] = useState(true)
  const scriptToInject =`
  <script>
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'https://api.maptiler.com/maps/streets/style.json?key=oWVTGbyb3Wp5GzjT651N',
      center: [130.97749, -25.27836],
      zoom: 9
    });

    map.on('load', function() {
      map.addSource('geojson-overlay', {
        'type': 'geojson',
        'data': 'https://api.maptiler.com/data/3af7e6a3-9c30-44bc-b8aa-4541b98d3032/features.json?key=oWVTGbyb3Wp5GzjT651N'
      });
      map.addLayer({
        'id': 'geojson-overlay-fill',
        'type': 'fill',
        'source': 'geojson-overlay',
        'filter': ['==', '$type', 'Polygon'],
        'layout': {},
        'paint': {
          'fill-color': '#fff',
          'fill-opacity': 0.4
        }
      });
      map.addLayer({
        'id': 'geojson-overlay-line',
        'type': 'line',
        'source': 'geojson-overlay',
        'layout': {},
        'paint': {
          'line-color': 'rgb(68, 138, 255)',
          'line-width': 3
        }
      });
      map.addLayer({
        'id': 'geojson-overlay-point',
        'type': 'circle',
        'source': 'geojson-overlay',
        'filter': ['==', '$type', 'Point'],
        'layout': {},
        'paint': {
          'circle-color': 'rgb(68, 138, 255)',
          'circle-stroke-color': '#fff',
          'circle-stroke-width': 6,
          'circle-radius': 7
        }
      });
      var marker1 = new mapboxgl.Marker().setLngLat([130.9864039,-25.2565637]).setPopup(
        new mapboxgl.Popup({ offset: 25 }) 
          .setHTML(
            '<h3><a href="#">This is title</a></h3><p>description in details</p>'
          )
        ).addTo(map);
    });
    </script>`
  
    const InjectScript = memo(({ script }) => {
      const divRef =  useRef(null);//useRef(document.createElement('divRef'))//useRef(null);
      useEffect(() => {
        if (divRef.current === null) {
          return;
        }
        // create a contextual fragment that will execute the script
        // beware of security concerns!!
        const doc = document
            .createRange()
            .createContextualFragment(script)
        
        // clear the div HTML, and append the doc fragment with the script 
        divRef.current.innerHTML = ''
        divRef.current.appendChild(doc)
      })
      return <div ref={divRef} />
    })

return(
  <>
    <Helmet>  
      <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
      <script src="https://cdn.maptiler.com/mapbox-gl-js/v1.13.2/mapbox-gl.js" />
      <noscript>{`
      <link rel="stylesheet" type="text/css" href="https://cdn.maptiler.com/mapbox-gl-js/v1.13.2/mapbox-gl.css" />
      `}</noscript>
    </Helmet>  
    <Helmet      
      style={[{
          "cssText": `
          #map {position: absolute; top: 0; right: 0; bottom: 0; left: 0;}
          `
      }]}
      />
    {/* <div id="map"></div>
    <InjectScript script={scriptToInject} /> */}
    <iframe width="100%" height="100%"
     srcDoc={`
     <html>
     <head>
       <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
       <script src="https://cdn.maptiler.com/mapbox-gl-js/v1.13.2/mapbox-gl.js"></script>
       <link href="https://cdn.maptiler.com/mapbox-gl-js/v1.13.2/mapbox-gl.css" rel="stylesheet" />
       <style>
         #map {position: absolute; top: 0; right: 0; bottom: 0; left: 0;}
       </style>
     </head>
     <body>
     <div id="map"></div>
     <script>
     var map = new mapboxgl.Map({
       container: 'map',
       style: 'https://api.maptiler.com/maps/streets/style.json?key=oWVTGbyb3Wp5GzjT651N',
       center: [130.97749, -25.27836],
       zoom: 9
     });
 
     map.on('load', function() {
       map.addSource('geojson-overlay', {
         'type': 'geojson',
         'data': 'https://api.maptiler.com/data/3af7e6a3-9c30-44bc-b8aa-4541b98d3032/features.json?key=oWVTGbyb3Wp5GzjT651N'
       });
       map.addLayer({
         'id': 'geojson-overlay-fill',
         'type': 'fill',
         'source': 'geojson-overlay',
         'filter': ['==', '$type', 'Polygon'],
         'layout': {},
         'paint': {
           'fill-color': '#fff',
           'fill-opacity': 0.4
         }
       });
       map.addLayer({
         'id': 'geojson-overlay-line',
         'type': 'line',
         'source': 'geojson-overlay',
         'layout': {},
         'paint': {
           'line-color': 'rgb(68, 138, 255)',
           'line-width': 3
         }
       });
       map.addLayer({
         'id': 'geojson-overlay-point',
         'type': 'circle',
         'source': 'geojson-overlay',
         'filter': ['==', '$type', 'Point'],
         'layout': {},
         'paint': {
           'circle-color': 'rgb(68, 138, 255)',
           'circle-stroke-color': '#fff',
           'circle-stroke-width': 6,
           'circle-radius': 7
         }
       });
       var marker1 = new mapboxgl.Marker().setLngLat([130.9864039,-25.2565637]).setPopup(
         new mapboxgl.Popup({ offset: 25 }) 
           .setHTML(
             '<h3><a href="#">This is title</a></h3><p>description in details</p>'
           )
         ).addTo(map);
     });
     </script>
     </body>
     </html>
     `}
   />
  </>
)
}


  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [lng, setLng] = useState(130.97749);
  // const [lat, setLat] = useState(-25.27836);
  // const [zoom, setZoom] = useState(9.81);

  // // useEffect(() => {
  // //   const cssFile = document.createElement("link");
  // //   cssFile.href = "https://cdn.maptiler.com/mapbox-gl-js/v1.13.2/mapbox-gl.css"; 
  // //   cssFile.rel = "stylesheet";
  // //    document.getElementById("maptiler").appendChild(cssFile);
  // //   const scriptFile = document.createElement("script");
  // //   scriptFile.src = "https://cdn.maptiler.com/mapbox-gl-js/v1.13.2/mapbox-gl.js"; 
  // //   document.window.appendChild(scriptFile);
  // //   //scriptFile.async = true;
  // //   //  document.getElementById("maptiler").appendChild(scriptFile);
  // //   return() => {
  // //      document.getElementById("maptiler").removeChild(cssFile);
  // //     //  document.getElementById("maptiler").removeChild(scriptFile);
  // //   }
  // // }, []);  


  // useEffect(() => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new apboxgl.Map({
  //     container: mapContainer.current,
  //     style: 'https://api.maptiler.com/maps/streets/style.json?key=oWVTGbyb3Wp5GzjT651N',
  //     center: [130.97749, -25.27836],
  //     zoom: 9.81
  //   });
  // });

  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize
  //   map.current.on('move', () => {
  //     setLng(map.current.getCenter().lng.toFixed(4));
  //     setLat(map.current.getCenter().lat.toFixed(4));
  //     setZoom(map.current.getZoom().toFixed(2));
  //   });
  // });

  // useEffect(() => {
  //   map.addSource('geojson-overlay', {
  //     'type': 'geojson',
  //     'data': 'https://api.maptiler.com/data/3af7e6a3-9c30-44bc-b8aa-4541b98d3032/features.json?key=oWVTGbyb3Wp5GzjT651N'
  //   });
  //   map.addLayer({
  //     'id': 'geojson-overlay-fill',
  //     'type': 'fill',
  //     'source': 'geojson-overlay',
  //     'filter': ['==', '$type', 'Polygon'],
  //     'layout': {},
  //     'paint': {
  //       'fill-color': '#fff',
  //       'fill-opacity': 0.4
  //     }
  //   });
  //   map.addLayer({
  //     'id': 'geojson-overlay-line',
  //     'type': 'line',
  //     'source': 'geojson-overlay',
  //     'layout': {},
  //     'paint': {
  //       'line-color': 'rgb(68, 138, 255)',
  //       'line-width': 3
  //     }
  //   });
  //   map.addLayer({
  //     'id': 'geojson-overlay-point',
  //     'type': 'circle',
  //     'source': 'geojson-overlay',
  //     'filter': ['==', '$type', 'Point'],
  //     'layout': {},
  //     'paint': {
  //       'circle-color': 'rgb(68, 138, 255)',
  //       'circle-stroke-color': '#fff',
  //       'circle-stroke-width': 6,
  //       'circle-radius': 7
  //     }
  //   });
  //   const marker1 = new mapboxgl.Marker().setLngLat([130.9864039,-25.2565637]).setPopup(
  //     new mapboxgl.Popup({ offset: 25 }) 
  //       .setHTML(
  //         `<h3>Title </h3><p>Description</p>`
  //       )
  //   ).addTo(map);
  
  //   const marker2 = new mapboxgl.Marker({ color: 'red', rotation: 5 }).setLngLat([130.9703175,-25.2297837]).addTo(map);    
  // })

  // return (
  //   <div>
  //     <Helmet>  
  //      <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
  //      <script src="https://cdn.maptiler.com/mapbox-gl-js/v1.13.2/mapbox-gl.js" />
  //      <noscript>{`
  //      <link rel="stylesheet" type="text/css" href="https://cdn.maptiler.com/mapbox-gl-js/v1.13.2/mapbox-gl.css" />
  //      `}</noscript>
  //     </Helmet>  
  //     <Helmet      
  //      style={[{
  //          "cssText": `
  //          #map {position: absolute; top: 0; right: 0; bottom: 0; left: 0;}
  //          `
  //      }]}
  //      />      
  //     <div id="maptiler" />
  //     <div ref={mapContainer} className="map-container" />
  //   </div>
  //   );
  // }  
  export default MapEmbed  
  // const addScript = ({ src, id, onLoad }) => {
  //   const existing =  document.getElementById(id);
  //   if (existing) {
  //     return existing;
  //   } else {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.id = id;
  //     script.async = true;
  //     script.onload = () => {
  //       if (onLoad) {
  //         onLoad();
  //       }
  //     };
  //     document.body.appendChild(script);
  //     return script;
  //   }
  // };
  //   const cssFile = document.createElement("link"); 
  //   cssFile.href = "/dist/css/dashboard.min.css";// your css file path 
  //   cssFile.rel = "stylesheet"; 
  //   document.body.appendChild(cssFile);
  //   const scriptFile = document.createElement("script"); 
  //   scriptFile .src = "/dist/js/pages/dashboard.min.js"; //your js file path 
  //   //scriptFile .async = true; 
  //   document.body.appendChild(scriptFile);
  // useEffect(() => {
  //   const cssFile = document.createElement("link");
  //   cssFile.href = "https://cdn.maptiler.com/mapbox-gl-js/v1.13.2/mapbox-gl.css"; 
  //   cssFile.rel = "stylesheet";
  //    document.getElementById("maptiler").appendChild(cssFile);
  //   const scriptFile = document.createElement("script");
  //   scriptFile.src = "https://cdn.maptiler.com/mapbox-gl-js/v1.13.2/mapbox-gl.js"; 
  //   //scriptFile.async = true;
  //    document.getElementById("maptiler").appendChild(scriptFile);
  //   return() => {
  //      document.getElementById("maptiler").removeChild(cssFile);
  //      document.getElementById("maptiler").removeChild(scriptFile);
  //   }
  // }, []);

 