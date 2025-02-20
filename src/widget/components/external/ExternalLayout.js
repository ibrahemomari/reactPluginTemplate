import React, { useState, useEffect } from "react";
import "./style.less";
import useHelper from "../../shared/Helper/Helper";
import VideoUI from "../../shared/VideoUI";
function Layout13(props) {
  const [holderImage, setHolderImage] = useState(
    "./assets/images/holder-9x16.png"
  );
  const [enableFullScreen, setEnableFullScreen] = useState(false);
  const { imagePreviewer } = useHelper();
  const [apiData, setApiData] = useState({});
  useEffect(() => {
    buildfire.datastore.get("test", (err, result) => {
      if (err) return console.error("Error while retrieving your apiData", err);
      console.log("Main record", result.data);
      setApiData(result.data);
      // handleSendMessage({selectedLayout: "external1",...result.apiData});
    });
  }, []);

  useEffect(() => {
    if (props.data) {
      setApiData(props.data);
    }
  }, [props]);

  return (
    <>
      <div className="mdc-layout-grid layout-external-container">
        <div className="mdc-layout-grid__inner">
          <div className="mdc-layout-grid__cell--span-8">
            {apiData.BackgroundmediaType !== "video" ? (
              <div className="topImage-container">
                {apiData.enableFullScreen && apiData.thumbnailImage != null ? (
                  <img
                    alt="top image"
                    onClick={() => {
                      imagePreviewer(apiData.thumbnailImage);
                    }}
                    src={apiData.thumbnailImage || holderImage}
                  />
                ) : (
                  <img
                    alt="top image"
                    src={apiData.thumbnailImage || holderImage}
                  />
                )}
              </div>
            ) : (
              <div className="topVideo-container">
                <VideoUI
                  data={apiData}
                  enableAutoPlay={apiData.enableAutoPlay1}
                  enableFullScreen={apiData.enableFullScreen}
                  url={apiData.videoURL || apiData.videoURL}
                  index={1}
                  placeholder={"9x16"}
                />
              </div>
            )}
            <div className="info-container">
              {(apiData.title !== "" ||
                apiData.subtitle !== "" ||
                apiData.BodyContent !== "") && (
                <div className="mdc-card" id="card">
                  <p className="title" onClick={() => props.setAll()}>
                    {apiData.title || apiData.title === ""
                      ? apiData.title
                      : "Title"}
                  </p>
                  <p className="subtitle">
                    {apiData.subtitle || apiData.subtitle === ""
                      ? apiData.subtitle
                      : "Subtitle"}
                  </p>
                  <p className="bodyContent">
                    {apiData.BodyContent || apiData.BodyContent === ""
                      ? apiData.BodyContent
                      : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massaa tempor"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout13;
