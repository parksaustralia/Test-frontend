import React from 'react';
const Iframe = (props) => {   
  const frameTitle = props.title
   const writeHTML = (frame) => {
   if (!frame) {
     return;
   }
   let doc = frame.contentDocument;
   doc.open();
   doc.write(props.content);
   doc.close();
   frame.style.width = '100%';
   frame.style.height = '100%';
  //  frame.style.height =  `${frame.contentWindow.document.body.scrollHeight}px`;
 };
 return (
  <iframe src="about:blank" scrolling="no" frameBorder="0" title={frameTitle} ref={writeHTML} 
  />
 );
};
export default Iframe;