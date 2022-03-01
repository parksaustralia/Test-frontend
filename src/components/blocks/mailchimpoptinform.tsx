import React from 'react'
import { graphql } from 'gatsby'

const park = process.env.GATSBY_PARK;

export const MailChimpOptInFormBlock = ({ node }) => {
  const apiDomain = process.env.GATSBY_API_DOMAIN
  const formType = node?.field_form_type?(node.field_form_type):("")
  const formId = node?.field_form_type?(node.field_form_type + "-form"):("")
  const formCheckBox = node?.field_form_type?(node.field_form_type + "-checkbox"):("")
  const formConcentId = node?.field_form_type?(node.field_form_type + "-concent"):("")
  const mailchimpForm = node?.relationships?.field_mailchimp_form_paragraph || []
  const formTitle = mailchimpForm?.field_form_title?(mailchimpForm.field_form_title):(<></>)
  const formText = mailchimpForm?.field_form_text?.value?(mailchimpForm.field_form_text.value):(<></>)
  const formAction = mailchimpForm?.field_action?(mailchimpForm.field_action):(<></>)
  const botKey = mailchimpForm?.field_bot_key?(mailchimpForm.field_bot_key):(<></>)
  const buttonText = mailchimpForm?.field_button_text?(mailchimpForm.field_button_text):(<></>)
  const photo1Src = mailchimpForm?.relationships?.field_photo_1?.relationships?.field_media_image?.uri?.url?(apiDomain + mailchimpForm.relationships.field_photo_1.relationships.field_media_image.uri.url):(<></>) 
  const photo1Alt = mailchimpForm?.relationships?.field_photo_1?.name?(apiDomain + mailchimpForm.relationships.field_photo_1.name):(<></>)
  const photo2Src = mailchimpForm?.relationships?.field_photo_2_?.relationships?.field_media_image?.uri?.url?(apiDomain + mailchimpForm.relationships.field_photo_2_.relationships.field_media_image.uri.url):(<></>) 
  const photo2Alt = mailchimpForm?.relationships?.field_photo_2_?.name?(apiDomain + mailchimpForm.relationships.field_photo_2_.name):(<></>) 
  const photo3Src = mailchimpForm?.relationships?.field_photo_3?.relationships?.field_media_image.uri.url?(apiDomain + mailchimpForm.relationships.field_photo_3.relationships.field_media_image.uri.url):(<></>) 
  const photo3Alt = mailchimpForm?.relationships?.field_photo_3?.name?(apiDomain + mailchimpForm.relationships.field_photo_3.name):(<></>)
  const photo4Src = mailchimpForm?.relationships?.field_photo_4?.relationships?.field_media_image?.uri?.url?(apiDomain + mailchimpForm.relationships.field_photo_4.relationships.field_media_image.uri.url):(<></>) 
  const photo4Alt = mailchimpForm?.relationships?.field_photo_4?.name?(apiDomain + mailchimpForm.relationships.field_photo_4.name):(<></>)
  const currentPage = window.location.href
  const subscribeButtonClick = (e) => {
    // var formCheckBoxElement = document.getElementById(formCheckBox.toString())
    // var formConcentElement = document.getElementById(formConcentId.toString())
    // if(formCheckBoxElement?.checked? == false) {
    //       [0].classList.add('consent--alert');
    // }
  }
   
  return(            
    (node === null)? ( <></> ):
      (formType === "Bottom")?(
      <section className="section--with-subscribe-block py-xlarge" id="control">
        <div className="grid-wrapper">
          <div className="grid-row clearfix">
            <div className="grid-col grid-col--12">
              <div className="subscribe-block subscribe-block--large">
                <div aria-hidden="true" className="subscribe-block__photographs">
                  <img alt={photo1Alt} className="subscribe-block__photo subscribe-block__photo--1" src={photo1Src} /><img alt={photo2Alt} className="subscribe-block__photo subscribe-block__photo--2" src={photo2Src} /><img alt={photo3Alt} className="subscribe-block__photo subscribe-block__photo--3" src={photo3Src} /><img alt={photo4Alt} className="subscribe-block__photo subscribe-block__photo--4" src={photo4Src} />
                </div>
                <div className="subscribe-block__inner">
                  <span className="subscribe-block__mail-icon" aria-hidden="true">
                  <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g fill="none"><ellipse cx="25" cy="25" rx="25" ry="25"/><path d="M28.217 28.469L36 22.457v11.034a.774.774 0 0 1-.688.767A71.75 71.75 0 0 1 24.999 35c-3.438 0-6.924-.247-10.337-.742a.773.773 0 0 1-.663-.767V22.457l7.783 6.012c.908.693 2.063.99 3.217.99s2.308-.297 3.217-.99zm-13.357-8.51c-.589-.569-.786-1.039-.859-1.311V17.51c0-.396.295-.717.663-.767a72.094 72.094 0 0 1 10.337-.742c3.462 0 6.924.247 10.313.742a.773.773 0 0 1 .688.767v1.138c-.074.272-.27.742-.859 1.311l-8.373 6.383c-.467.371-1.105.544-1.768.544s-1.301-.173-1.768-.544l-8.373-6.383z" fill="#fff"/></g></svg>
                  </span>
                  <h2 className="subscribe-block__heading">
                  {formTitle}
                  </h2>
                  <div dangerouslySetInnerHTML={{ __html: formText }} /> 
                  <form action={formAction}
                        id={formId}
                        className="subscribe-block__form"
                        method="post" 
                        noValidate
                        name="mc-embedded-subscribe-form"
                        target="_blank">
                    <input className="subscribe-block__input"
                          name="EMAIL"
                          placeholder="Enter your email address..."
                          type="email"
                          value="" />
                    <input name="SIGNUP_URL"
                          type="hidden"
                          value={currentPage} />
                    <input name="FORM_TYPE"
                          type="hidden"
                          value={formType} />
                    {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
                    <div className="hidden-key" aria-hidden="true">
                      <input type="text" name={botKey} value="" />
                    </div>
                    <button className="button button--small subscribe-block__button" type="submit" onClick={subscribeButtonClick}>
                      {buttonText}
                    </button>
                    <hr/>
                    <div className="consent" id={formConcentId}>
                      <input className="consent__checkbox"
                            name="CONSENT"
                            id={formCheckBox}
                            type="checkbox" 
                            checked={false}/>
                      <label className="consent__label">
                        I have read the <a href="/privacy/" target="_blank" data-proofer-ignore>Privacy Notice</a> and consent to my personal information being used and disclosed in accordance with that notice.
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      ):(
        <div className="subscribe-block subscribe-block--small">
          <div aria-hidden="true" className="subscribe-block__photographs">
            <img alt={photo1Alt} className="subscribe-block__photo subscribe-block__photo--1" src={photo1Src} /><img alt={photo2Alt} className="subscribe-block__photo subscribe-block__photo--2" src={photo2Src} /><img alt={photo3Alt} className="subscribe-block__photo subscribe-block__photo--3" src={photo3Src} /><img alt={photo4Alt} className="subscribe-block__photo subscribe-block__photo--4" src={photo4Src} />
          </div>
          <div className="subscribe-block__inner">
            <h2 className="subscribe-block__heading">
             {formTitle}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: formText }} /> 
            <form action={formAction}
                  className="subscribe-block__form"
                  id={formId}
                  method="post"
                  noValidate
                  name="mc-embedded-subscribe-form"
                  target="_blank">
              <input className="subscribe-block__input"
                    name="EMAIL"
                    placeholder="Enter your email address..."
                    type="email"
                    value="" />
              <input name="SIGNUP_URL"
                    type="hidden"
                    value={currentPage} />
                <input name="FORM_TYPE"
                      type="hidden"
                      value={formType}/>
                {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
                <div className="hidden-key" aria-hidden="true">
                <input type="text" name={botKey} value="" />
                </div>
                <button className="button button--small subscribe-block__button" type="submit">
                  {buttonText}
                </button>
                <div className="consent" id={formConcentId}>
                  <input className="consent__checkbox"
                        name="CONSENT"
                        id={formCheckBox}
                        type="checkbox" />
                  <label className="consent__label">
                    I have read the <a href="/privacy/" target="_blank" data-proofer-ignore>Privacy Notice</a> and consent to my personal information being used and disclosed in accordance with that notice.
                  </label>
                </div>
            </form>
          </div>
        </div>
      ) 
  )
};

export const fragment  = graphql`
  fragment MailChimpOptInFormBlockQuery on block_content__mailchimp_opt_in_form {
    field_form_type
    relationships {
      field_mailchimp_form_paragraph {
        field_action
        field_bot_key
        field_button_text
        field_form_title
        field_form_text {
          value
        }        
        field_padding
        relationships {
          field_photo_1 {
            name
            relationships {
              ... on media__inline_imageRelationships {
                field_media_image {
                  uri {
                    url
                  }
                }
              }
            }
          }
          field_photo_2_ {
            name
            relationships {
              ... on media__inline_imageRelationships {
                field_media_image {
                  uri {
                    url
                  }
                }
              }
            }
          }
          field_photo_3 {
            name
            relationships {
              ... on media__inline_imageRelationships {
                field_media_image {
                  uri {
                    url
                  }
                }
              }
            }
          }
          field_photo_4 {
            name
            relationships {
              ... on media__inline_imageRelationships {
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
`;