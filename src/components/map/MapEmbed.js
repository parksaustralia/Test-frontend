// @ts-nocheck
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Iframe from './Iframe';

function MapEmbed(props) {
  const park = process.env.GATSBY_PARK;
  const apiDomain = process.env.GATSBY_API_DOMAIN; 
  const maptilerStyle = 'https://api.maptiler.com/maps/streets/style.json?key=oWVTGbyb3Wp5GzjT651N'
  const maptilerData = 'https://api.maptiler.com/data/3af7e6a3-9c30-44bc-b8aa-4541b98d3032/features.json?key=oWVTGbyb3Wp5GzjT651N'
  const frameTitle = props.title
  const latNum = props.latNum
  const lonNum = props.lonNum
  let mapLists 
  let lists = ""
  let data;
    data = useStaticQuery(graphql`
      query {
        informations: allNodeInformation( 
          filter: {
            field_site: {drupal_internal__target_id: {eq: "uktnp"}}
          }) 
        {
          nodes {
            field_information_title {
              value
            }
            field_information_description {
              value
            }
            field_info_latitude_number 
            field_info_longitude_number
            path {
              alias
            }
            relationships {
              field_tile_image {
                ... on media__tile_image {
                  relationships {
                    field_media_image {
                      uri {
                        url
                      }
                    }
                  }
                }
              }   
            }            
          } 
        }
      }
    `)
    const informationsArray = data.informations || []
    informationsArray.nodes.forEach((item) => {
      const infoTitle = item.field_information_title.value.replace("'", "&apos;").trim()
      const infoImgSrc = apiDomain + item.relationships.field_tile_image.relationships.field_media_image.uri.url
      const infoDesc = item.field_information_description.value.replace("'", "&apos;").trim()
      const infoLat = item.field_info_latitude_number
      const infoLon = item.field_info_longitude_number
      const infoAlias = item.path?.alias?.replace(`/${park}`, "")
      lists += `{ 'title': '${infoTitle}', 'imgsrc': '${infoImgSrc}', 'description': '${infoDesc}', 'latitude': '${infoLat}','longitude': '${infoLon}', 'pathalias': '${infoAlias}' }, `
    })

    mapLists = `[${lists}]` 
  const sourceDoc =`
    <div className="map-embed map-pullout__map">
    <script src="https://cdn.maptiler.com/mapbox-gl-js/v1.13.2/mapbox-gl.js"></script>
    <link href="https://cdn.maptiler.com/mapbox-gl-js/v1.13.2/mapbox-gl.css" rel="stylesheet" />
    <style>
      #map {position: absolute; top: 0; right: 0; bottom: 0; left: 0;}
    </style>
    <style>
      #marker {
        background-size: cover;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
      }
      
      .mapboxgl-popup {
        max-width: 300px;
        max-height: 437px;
      }
      .map-embed__title a {
        color: #af420a;
        text-decoration: underline;
        transition: color 150ms ease-in-out;
      }
      .mapboxgl-popup-content {
        border-radius: 6px;
        border-color: #fff
      }
    }
      </style>
    <div id="map"></div>
    <script>
    var map = new mapboxgl.Map({
      container: 'map',
      style: '${maptilerStyle}',
      center: [${lonNum}, ${latNum}],
      zoom: 9
    });

    map.on('load', function() {
      map.addSource('geojson-overlay', {
        'type': 'geojson',
        'data': '${maptilerData}'
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
      loadLocationMakers(map)
    });
    function loadLocationMakers(map) {
      var markers = [];
      
      var locations = ${mapLists}
      for (var i = 0; i < locations.length; i++) {
        var location = locations[i];
        new mapboxgl.Marker().setLngLat([location.longitude,location.latitude]).setPopup(
          new mapboxgl.Popup({ offset: 25 }) 
          .setHTML(
            '<p><strong class="map-embed__title">'+ '<a href="' + location.pathalias + '"  target="_top">' +location.title + '</a></strong></p>'+
            '<p><a href="' + location.pathalias + '"  target="_top"><img src="' + location.imgsrc + '" width="105" height="105" style="float:right"></a>' + location.description + '</p>'
            )
          ).addTo(map);
      }
    }
    </script>
    </div>
  `
  return(
    <>
      <Iframe content={sourceDoc} title={frameTitle} />
    </>
  )
}

export default MapEmbed  
  