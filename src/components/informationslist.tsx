// import React from "react";
import { useStaticQuery, graphql } from "gatsby"

export default function InformationsList() {
  // const apiDomain = process.env.GATSBY_API_DOMAIN
  let park = "uktnp"
  let data;
  if (park == "uktnp") {
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
            }
        }
      }
    `)
    const lists = `
    [    { 'title': '<a href="/do/sunrise-sunset/talinguru-nyakunytjaku/">Talinguru Nyakunytjaku</a>', 
      'description': ' <p><a href="/uluru/do/sunrise-sunset/talinguru-nyakunytjaku/"><img src="/uluru/files/cache/sunrise-sunset/talinguru-nyakunytjaku-credit-tourism-nt-t-105x105.jpg"/></a>Talinguru Nyakunytjaku is the main sunrise viewing area for Uluru. Youre sure to find the perfect spot among its three shelters, two viewing platforms and several kilometres of walking track.</p> ', 
      'latitude': '-25.369494', 
      'longitude': '131.063191', 
      'pinColor': 'orange' 
      },
      { 'title': '<a href="/do/sunrise-sunset/talinguru-nyakunytjaku/">Talinguru Nyakunytjaku</a>', 
        'description': ' <p><a href="/uluru/do/sunrise-sunset/talinguru-nyakunytjaku/"><img src="/uluru/files/cache/sunrise-sunset/talinguru-nyakunytjaku-credit-tourism-nt-t-105x105.jpg"/></a>Talinguru Nyakunytjaku is the main sunrise viewing area for Uluru. Youre sure to find the perfect spot among its three shelters, two viewing platforms and several kilometres of walking track.</p> ', 
        'latitude': '-25.369494', 
        'longitude': '131.063191', 
        'pinColor': 'orange' 
        },
      { 'title': '<a href="/do/sunrise-sunset/kata-tjuta-dune-viewing-area/">Kata Tjuta dune viewing area</a>', 
      'description': ' <p><a href="/do/sunrise-sunset/kata-tjuta-dune-viewing-area/"><img src="/files/cache/sunrise-sunset/kata-tjuta-dune-viewing-area-credit-tourism-nt-t-105x105.jpg"/></a>Soak up a panoramic view of Kata Tjuta with Uluru on the horizon.</p> ', 
      'latitude': '-25.350998', 
      'longitude': '130.786825', 
      'pinColor': 'orange' 
      },
      { 'title': '<a href="/do/sunrise-sunset/kata-tjuta-sunset-viewing-area/">Kata Tjuta sunset viewing area</a>', 
       'description': ' <p><a href="/do/sunrise-sunset/kata-tjuta-sunset-viewing-area/"><img src="/files/cache/sunrise-sunset/kata-tjuta-sunset-viewing-area-credit-maree-clout-t-105x105.jpg"/></a>Bring a picnic and contemplate the Kata Tjuta domes changing colour as the sun sets.</p> ', 
       'latitude': '-25.296432', 
       'longitude': '130.706686', 
       'pinColor': 'orange' 
      }
    ]
    ` 
    return (lists)
    // let lists

    // informationsArray.nodes.forEach((item) => {
      // var element = "{ 'title': '" + item.field_information_title.value + "', 'description': '"+ 
      //                   item.field_information_description.value + "', latitude: '" +
      //                   item.field_info_latitude_number + "', longitude: '" + item.field_info_longitude_number +
      //                   "' }, "
    //   lists.append(element)
    // })

    // let lists = [];
    // let result = Object.entries(data.informations.nodes).map(( [k, v] ) => ({ [k]: v }));
    //     result.forEach((item) => {
    //       var key = Object.node(item)[0];
    //       item[key].forEach((sub)=>{
    //       lists.push({title: sub.field_information_title.value,
    //         description: sub.field_information_description.value,
    //          Price: sub.Price
            
    //         });
    //         })
    // });
    
    // const lists = informationsArray.nodes.map((list, i:Number)=> {
    //   const imgSrc = list.relationships?.field_tile_image?.relationships?.field_media_image?.uri?.url?(apiDomain + list.relationships.field_tile_image.relationships.field_media_image.uri.url):""
    //   const d = new Date(list.field_publication_date)
    //   const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    //   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //   const fullDate = weekday[d.getDay()] + " " + d.getDate() + " " + months[d.getMonth()] + " " +  d.getFullYear();
    //   return (
    //     <div className="text-tile text-tile--large clearfix"> 
    //       <a href={list.path?.alias?(list.path.alias):""}>
    //           <img className="text-tile__image" src={imgSrc} 
    //               width="170" height="170" alt="" /> 
    //       </a> 
    //       <div className="text-tile__text-wrapper"> 
    //         <h3 className="text-tile__title"> 
    //           <a href={list.path?.alias?(list.path.alias):""}>
    //           <div dangerouslySetInnerHTML={{ __html:list.field_article_title?.value?(list.field_article_title.value):""}} />
    //           </a> 
    //         </h3> 
    //         <p className="text-tile__body"> 
    //           <em>{fullDate}</em> <br/> <br/> 
    //           <div
    //                 dangerouslySetInnerHTML={{ __html: list.field_article_description?.value?(list.field_article_description.value):"" }}
    //               />

    //           {/* {list.field_article_description?.value?(list.field_article_description.value):""} */}
    //         </p>
    //         <a className="call-to-action text-tile--call-to-action t-right" href={list.path?.alias?(list.path.alias):""}> 
    //           <span>Read more</span> </a> 
    //       </div> 
    //     </div>
    //   )
    // })
    // const lists = ([ 
      // { 'title': '<a href="/do/sunrise-sunset/talinguru-nyakunytjaku/">Talinguru Nyakunytjaku</a>', 
      // 'description': ' <p><a href="/uluru/do/sunrise-sunset/talinguru-nyakunytjaku/"><img src="/uluru/files/cache/sunrise-sunset/talinguru-nyakunytjaku-credit-tourism-nt-t-105x105.jpg"/></a>Talinguru Nyakunytjaku is the main sunrise viewing area for Uluru. Youre sure to find the perfect spot among its three shelters, two viewing platforms and several kilometres of walking track.</p> ', 
      // 'latitude': '-25.369494', 
      // 'longitude': '131.063191', 
      // 'pinColor': 'orange' 
      // },
      // { 'title': '<a href="/do/sunrise-sunset/talinguru-nyakunytjaku/">Talinguru Nyakunytjaku</a>', 
      //   'description': ' <p><a href="/uluru/do/sunrise-sunset/talinguru-nyakunytjaku/"><img src="/uluru/files/cache/sunrise-sunset/talinguru-nyakunytjaku-credit-tourism-nt-t-105x105.jpg"/></a>Talinguru Nyakunytjaku is the main sunrise viewing area for Uluru. Youre sure to find the perfect spot among its three shelters, two viewing platforms and several kilometres of walking track.</p> ', 
      //   'latitude': '-25.369494', 
      //   'longitude': '131.063191', 
      //   'pinColor': 'orange' 
      //   },
      // { 'title': '<a href="/do/sunrise-sunset/kata-tjuta-dune-viewing-area/">Kata Tjuta dune viewing area</a>', 
      // 'description': ' <p><a href="/do/sunrise-sunset/kata-tjuta-dune-viewing-area/"><img src="/files/cache/sunrise-sunset/kata-tjuta-dune-viewing-area-credit-tourism-nt-t-105x105.jpg"/></a>Soak up a panoramic view of Kata Tjuta with Uluru on the horizon.</p> ', 
      // 'latitude': '-25.350998', 
      // 'longitude': '130.786825', 
      // 'pinColor': 'orange' 
      // },
      // { 'title': '<a href="/do/sunrise-sunset/kata-tjuta-sunset-viewing-area/">Kata Tjuta sunset viewing area</a>', 
      //  'description': ' <p><a href="/do/sunrise-sunset/kata-tjuta-sunset-viewing-area/"><img src="/files/cache/sunrise-sunset/kata-tjuta-sunset-viewing-area-credit-maree-clout-t-105x105.jpg"/></a>Bring a picnic and contemplate the Kata Tjuta domes changing colour as the sun sets.</p> ', 
      //  'latitude': '-25.296432', 
      //  'longitude': '130.706686', 
      //  'pinColor': 'orange' 
      // }
    // ])
    // const informationsArray = data.informations.nodes || [] 
    // let lists = []
    // informationsArray.nodes.forEach((item) => {
    //   lists.push(
    //     item.field_information_title.value 
    //    )
    // }
 

    // return(lists)  
  }
}
  