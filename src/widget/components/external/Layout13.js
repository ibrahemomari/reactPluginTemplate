import React, { useState, useEffect } from "react";
import "./style.less";
import useHelper from "../../shared/Helper/Helper";
import VideoUI from "../../shared/VideoUI";
function Layout13(props) {
  const [holderImage, setHolderImage] = useState(
    "../../../../../../styles/media/holder-16x9.png"
  );
  const [enableFullScreen, setEnableFullScreen] = useState(false);
  const { imagePreviewer,  } = useHelper();
  useEffect(() => {
    setEnableFullScreen(props.data.enableFullScreen);

    if (props.themeState.colors) {
      console.log("my theme in layout 1 -=>", props.themeState);
      props.setTextStyle();
    }
  }, [props]);

  return (
    <>
      <div className="mdc-layout-grid layout-1-container">
        <div className="mdc-layout-grid__inner">
          <div className="mdc-layout-grid__cell--span-8">
            {props.data.BackgroundmediaType !== "video" ? (
              <div className="topImage-container">
                {enableFullScreen && props.data.thumbnailImage != null ? (
                  <img
                    alt="top image"
                    onClick={() => {
                      imagePreviewer(props.data.thumbnailImage);
                    }}
                    src={props.data.thumbnailImage || holderImage}
                  />
                ) : (
                  <img alt="top image" src={props.data.thumbnailImage || holderImage} />
                )}
              </div>
            ) : (
              <VideoUI
                data={props.data}
                enableAutoPlay={props.data.enableAutoPlay1}
                enableFullScreen={props.data.enableFullScreen}
                url={props.data.videoURL}
                index={1}
              />
            )}
            <div className="info-container">
              <div className="mdc-card">
                <h1 className="title">{props.data.title || "Title"}</h1>
                <h3 className="subtitle">
                  {props.data.subtitle || "Subtitle"}
                </h3>
                <p className="bodyContent">
                  {props.data.bodyContent || "Body Content"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout13;
