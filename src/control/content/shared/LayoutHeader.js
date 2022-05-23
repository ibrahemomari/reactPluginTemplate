import React, { useState, useEffect } from "react";
// import { hot } from "react-hot-loader/root";
import Layout1 from "../Components/Layout1";
import Layout2 from "../Components/Layout2";
import Layout3 from "../Components/Layout3";
import Layout4 from "../Components/Layout4";
import Layout5 from "../Components/Layout5";
import Layout6 from "../Components/Layout6";
import "./style.less";
function LayoutHeader() {
  const [images, setImages] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState(0);
  useEffect(() => {
    let array = [];
    for (let i = 1; i <= 12; i++) {
      array.push(`../assets/images/Layout${i}.png`);
    }
    setImages(array);
  }, []);

  const selectedLayoutHandler = (index) => {
    console.log(index);
    setSelectedLayout(index);
  };

  return (
    <>
      <h1>Layout</h1>
      <p className="info-note">
        Choose your layout first. Page input fields will populate based on the
        layout you have chosen.
      </p>
      <div className="layout-container">
        <div className="row">
          <div className="col-md-2">
            <div className="img_selected_container">
              <img
                id="listLayout"
                className="img_selected"
                src={images[selectedLayout]}
              />
              <span>Layout {selectedLayout + 1}</span>
            </div>
          </div>
          <div className="col-md-10">
            <div className="img_list_container">
              {images.map((image, i) => {
                return (
                  <img
                    key={i}
                    src={image}
                    onClick={() => {
                      selectedLayoutHandler(i);
                    }}
                  ></img>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div>
        {selectedLayout === 0 && <Layout1 selectedLayout={selectedLayout} />}
        {selectedLayout === 1 && <Layout2 selectedLayout={selectedLayout} />}
        {selectedLayout === 2 && <Layout3 selectedLayout={selectedLayout} />}
        {selectedLayout === 3 && <Layout4 selectedLayout={selectedLayout} />}
        {selectedLayout === 4 && <Layout5 selectedLayout={selectedLayout} />}
        {selectedLayout === 5 && <Layout6 selectedLayout={selectedLayout} />}
      </div>
    </>
  );
}

export default LayoutHeader;
