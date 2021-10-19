import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Slider from "react-slick";

import Paragraphs from "../components/paragraphs";

export default function PageTemplate({ data }) {
  const images = data.nodePage.relationships.heroImages.map(
    (heroImage, index: Number) => {
      const image = getImage(heroImage.relationships.image.localFile);
      const loadingType = index < 2 ? "eager" : "lazy";
      return (
        <div className="hero-block__slide-wrapper" key="hero-${index}">
          <GatsbyImage
            image={image}
            alt={heroImage.image.alt}
            loading={loadingType}
          />
          <div
            className={
              heroImage.hasOverlay ? "hero-block__overlay-container" : ""
            }
          >
            <div className="hero-block__title">
              Uluṟu-Kata Tjuṯa National Park
            </div>
            <div
              className="hero-block__credit"
              dangerouslySetInnerHTML={{ __html: heroImage.caption.processed }}
            ></div>
          </div>
        </div>
      );
    }
  );

  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    infinite: true,
    pauseOnFocus: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 1000,
  };

  return (
    <>
      <section className="pb-xlarge">
        <Slider {...sliderSettings}>{images}</Slider>
      </section>
      <section className="pb-small">
        <div className="grid-wrapper">
          <div className="grid-row clearfix">
            <div className="grid-col grid-col--8 grid-col--push-2 tb-grid-col--10 tb-grid-col--push-1 ph-grid-col--12 ph-grid-col--push-0 intro-section copy">
              {/* <div className="alert-box">
                <p>
                  <strong>
                    Important COVID-19 update – Visitor restrictions apply
                  </strong>
                </p>{" "}
                <p>
                  Travellers need to keep up-to-date with where they can travel
                  and which areas have been declared COVID-19 hotspots, as the
                  COVID-19 situation in Australia is continually evolving.
                </p>{" "}
                <p>
                  All visitors need to ensure that they are complying with the{" "}
                  <a href="https://coronavirus.nt.gov.au/travel/quarantine/hotspots-covid-19">
                    current travel restrictions in place by the Northern
                    Territory Government
                  </a>
                  .
                </p>{" "}
                <p>
                  <a href="/uluru/news/travel-reminder-for-park-visitors/">
                    Read more
                  </a>
                </p>
              </div> */}
              {data.nodePage.title != "Home" ? (
                <h1>{data.nodePage.title}</h1>
              ) : (
                ""
              )}

              {data.nodePage.body?.value ? (
                <div
                  dangerouslySetInnerHTML={{ __html: data.nodePage.body.value }}
                />
              ) : (
                ""
              )}

              <Paragraphs paragraphs={data.nodePage.relationships.paragraphs} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const query = graphql`
  query ($slug: String!) {
    nodePage(path: { alias: { eq: $slug } }) {
      path {
        alias
      }    
      body {
        value
        summary
      }
      title
      relationships {
        heroImages: field_hero {
          ...MediaHeroImage
        }
      }
    }
  }
`;
