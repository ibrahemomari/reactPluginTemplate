import React, { useEffect, useState } from "react";
import "./style.less";
import useHelper from "../../shared/Helper/Helper";
function Index(props) {

 
  const [holderImage, setHolderImage] = useState(
    "../../../../../../styles/media/holder-16x9.png"
  );

  const [enableFullScreen, setEnableFullScreen] = useState(false);
  const [enableFullScreen2, setEnableFullScreen2] = useState(false);
  const [enableFullScreen3, setEnableFullScreen3] = useState(false);
  const [enableFullScreen4, setEnableFullScreen4] = useState(false);

  const { imagePreviewer } = useHelper();

  useEffect(() => {
    setEnableFullScreen(props.data.enableFullScreen);
    setEnableFullScreen2(props.data.enableFullScreen2);
    setEnableFullScreen3(props.data.enableFullScreen3);
    setEnableFullScreen4(props.data.enableFullScreen4);

    if(props.themeState.colors){
      props.setTextStyle();
    }
  }, [props]);

  return (
    <>
      <div className="layout-8-container">
        <div className="mdc-layout-grid Maincontainer " id="container">
          <div className="mdc-layout-grid__inner">
            <div className="mdc-layout-grid__cell--span-8 row">
              <div className="upperContainer">
                <div className="mdc-layout-grid__cell--span-8 row">
                  <div className="rowmContainer">
                    {enableFullScreen && props.data.thumbnailImage != null ? (
                      <img
                      className="column img"
                        onClick={() => {
                          imagePreviewer(props.data.thumbnailImage);
                        }}
                        src={props.data.thumbnailImage || holderImage}
                      />
                    ) : (
                      <img className="column img" src={props.data.thumbnailImage || holderImage} />
                    )}
                    <p className="column bodyContent mdc-card ">
                      {props.data.BodyContent || "body Content"}
                    </p>
                  </div>
                </div>
                <div className="mdc-layout-grid__cell--span-8 row">
                  <p className="column bodyContent mdc-card">
                    {props.data.BodyContent2 || "  body Content"}
                  </p>
                  {enableFullScreen2 && props.data.thumbnailImage2 != null ? (
                      <img
                      className="column img"
                        onClick={() => {
                          imagePreviewer(props.data.thumbnailImage2);
                        }}
                        src={props.data.thumbnailImage2 || holderImage}
                      />
                    ) : (
                      <img className="column img" src={props.data.thumbnailImage2 || holderImage} />
                    )}
                </div>
                <div className="mdc-layout-grid__cell--span-8 row">
                {enableFullScreen3 && props.data.thumbnailImage3 != null ? (
                      <img
                      className="column img"
                        onClick={() => {
                          imagePreviewer(props.data.thumbnailImage3);
                        }}
                        src={props.data.thumbnailImage3 || holderImage}
                      />
                    ) : (
                      <img className="column img" src={props.data.thumbnailImage3 || holderImage} />
                    )}
                  <p className="column bodyContent mdc-card">
                    {props.data.BodyContent3 || "body Content"}
                  </p>
                </div>
              </div>
              <div className="lowerContainer">
              {enableFullScreen4 && props.data.thumbnailImage4 != null ? (
                      <img
                      className="column img"
                        onClick={() => {
                          imagePreviewer(props.data.thumbnailImage4);
                        }}
                        src={props.data.thumbnailImage4 || holderImage}
                      />
                    ) : (
                      <img className="column img" src={props.data.thumbnailImage4 || holderImage} />
                    )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
