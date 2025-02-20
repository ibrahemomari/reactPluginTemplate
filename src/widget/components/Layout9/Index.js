import React, { useState, useEffect } from "react";
import "./style.less";
import useHelper from "../../shared/Helper/Helper";
import VideoUI from "../../shared/VideoUI";
import ProgressRibbon from "../../shared/Ui_components/ProgressRibbon";

function Index(props) {
  const [holderImage, setHolderImage] = useState(
    "./assets/images/holder-16x9.png"
  );
  const [enableFullScreen, setEnableFullScreen] = useState(false);
  const [enableFullScreen2, setEnableFullScreen2] = useState(false);
  const [enableFullScreen3, setEnableFullScreen3] = useState(false);
  const { imagePreviewer } = useHelper();

  useEffect(() => {
    // document.body.style.background = "#d2cfcf";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";

    if (props.data.thumbnailImage) {
      document.body.style.backgroundImage = `url(${props.data.thumbnailImage})`;
    } else {
      document.body.style.background = `#d2cfcf`;
    }

    document.getElementById("mainImage-container").style.backgroundPosition = "center";

    setEnableFullScreen(props.data.enableFullScreen);
    setEnableFullScreen2(props.data.enableFullScreen2);
    setEnableFullScreen3(props.data.enableFullScreen3);

    if (props.data.showInfoRibbon) {
      dataContainer.style.marginBottom = "25rem";
      dataContainer.style.position = "relative";
    } else {
      dataContainer.style.marginBottom = "20rem";
      dataContainer.style.position = "relative";
    }
  }, [props]);

  return (
    <>
      <div className="mdc-layout-grid layout-9-container">
        <div className="mdc-layout-grid__inner">
          <div className="mdc-layout-grid__cell--span-8" id="dataContainer">
            <div className="topImage-container">
              {props.data.mediaType != "video" ? (
                enableFullScreen2 && props.data.thumbnailImage2 != null ? (
                  <img
                    alt="Top image"
                    onClick={() => {
                      imagePreviewer(props.data.thumbnailImage2);
                    }}
                    src={props.data.thumbnailImage2 || holderImage}
                  />
                ) : (
                  <img alt="Top image" src={props.data.thumbnailImage2 || holderImage} />
                )) : (
                <VideoUI data={props.data} enableAutoPlay={props.data.enableAutoPlay1} enableFullScreen={props.data.enableFullScreen} url={props.data.videoURL} index={1} />
              )}
            </div>

            <div
              className="mainImage-container"
              id="mainImage-container"
              onClick={() => {
                enableFullScreen && props.data.thumbnailImage != null ?
                  imagePreviewer(props.data.thumbnailImage) :
                  undefined
              }}
            >
              {enableFullScreen3 && props.data.thumbnailImage3 != null ? (
                <img
                  alt="Main image"
                  className="secondImage"
                  onClick={() => {
                    imagePreviewer(props.data.thumbnailImage3);
                  }}
                  src={props.data.thumbnailImage3 || holderImage}
                />
              ) : (
                <img
                  alt="Main image"
                  className="secondImage"
                  src={props.data.thumbnailImage3 || holderImage}
                />
              )}

              {
                (props.data.title != ""  || props.data.subTitle != "" || props.data.bodyContent != "") &&
                < div className="info-container mdc-card ">
                  <p className="title">{props.data.title||props.data.title==""?props.data.title:"Title"}</p>
                  <p className="subtitle">{props.data.subTitle||props.data.subTitle==""?props.data.subTitle:"Subtitle"}</p>
                  <p className="bodyContent">
                    {props.data.bodyContent||props.data.bodyContent==""?props.data.bodyContent:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massaa tempor."}
                  </p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      {
        props.data.showInfoRibbon && <>
          <ProgressRibbon />
        </>
      }
    </>
  );
}

export default Index;
