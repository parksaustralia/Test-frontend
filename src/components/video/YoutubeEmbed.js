import React from "react";

export default function YoutubeEmbed(prop){
  return(
    <div className="responsive-embed responsive-embed--with-poster-image mt-xsmall mb-medium">
      <div className="container">
        <iframe
          className="responsive-iframe"
          src={`https://www.youtube.com/embed/${prop.embedId}?autoplay=1&rel=0showinfo=0`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={`${prop.videoTitle}`}
        />
      </div>
    </div>
  )
}
