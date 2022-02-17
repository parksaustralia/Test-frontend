import { graphql } from "gatsby"
export const query = graphql`
  fragment MediaHeroImage on media__hero_image {
    name
    width: field_width
    height: field_height
    field_media_image {
      alt
    }
    field_gradient_overlay
    field_caption {
      processed
    }
    relationships {
      field_media_image {
        uri {
          url
        }
      }
    }
  }
`

// export const query = graphql`
//   fragment MediaHeroImage on media__hero_image {
//     name
//     width: field_width
//     height: field_height
//     field_media_image {
//       alt
//     }
//     field_gradient_overlay
//     field_caption {
//       processed
//     }
//     relationships {
//       field_media_image {
//         localFile {
//           childImageSharp {
//             gatsbyImageData(
//               width: 2560
//               placeholder: DOMINANT_COLOR
//               formats: [AUTO, WEBP, AVIF]
//               layout: FULL_WIDTH
//             )
//           }
//         }
//       }
//     }
//   }
// `