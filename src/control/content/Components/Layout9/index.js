import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import useForm from "../../hooks/form";
import "./style.less";
import "../../../../../../../styles/control/bf-base.css";
import ThumbnailUI from "../../shared/ThumbnailUI";
import VideoUi from "../../shared/VideoUi";

function index(props) {
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [thumbnailImage2, setThumbnailImage2] = useState(null);
  const [thumbnailImage3, setThumbnailImage3] = useState(null);
  const [uploadType, setUploadType] = useState("image");
  const [videoURL, setVideoURL] = useState("");

  useEffect(() => {
    handelImage({ thumbnailImage, thumbnailImage2, thumbnailImage3, videoURL });
  }, [thumbnailImage, thumbnailImage2, thumbnailImage3, videoURL]);

  // submit form function
  function submitForm(values) {
    console.log(
      `Submit function in layout${props.selectedLayout + 1} ->`,
      values
    );
    props.saveData(values);
  }

  const { handleChange, handleSubmit, handelImage } = useForm(submitForm);
  function handleChangeInputType(e) {
    setUploadType(e.target.value);
    handleChange(e);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Page Details</h1>
      <div className="layOutContainer">
        <>
          <ThumbnailUI
            index={1}
            recommended={"Recommended: 675 x 940"}
            thumbnailImage={thumbnailImage}
            setThumbnailImage={setThumbnailImage}
            imageTag={"Background Image"}
            classList={"vertical-rectangle thumbnail"}
          />
        </>
        <div className="row">
          <div className="col-md-3">
            <label className="lable"></label>
          </div>
          <div className="col-md-9">
            <div className=""></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Enable Full Screen</label>
          </div>
          <div className="col-md-9">
            <input
              onChange={handleChange}
              className="checkBox"
              type="checkBox"
              name="enableFullScreen"
              id="enableFullScreen"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <label className="lable">Top Media Type</label>
          </div>
          <div className="col-md-9">
            <input
              onChange={handleChangeInputType}
              className="checkBox"
              type="radio"
              name="mediaType"
              value="image"
              defaultChecked
            />
            <label className="lable">Image</label>
            <input
              onChange={handleChangeInputType}
              className="checkBox"
              type="radio"
              name="mediaType"
              value="video"
            />
            <label className="lable">Video</label>
          </div>
        </div>
        {uploadType == "image" ? (
          <>
            <ThumbnailUI
              index={2}
              recommended={"Recommended: 1200 x 380"}
              thumbnailImage={thumbnailImage2}
              setThumbnailImage={setThumbnailImage2}
              imageTag={"Top Image"}
              classList={"thumbnail2 horizontal-rectangle"}
            />
          </>
        ) : (
          <>
            <VideoUi
              handleChange={handleChange}
              setVideoURL={setVideoURL}
              videoURL={videoURL}
              index={1}
            />
          </>
        )}

        <div className="row">
          <div className="col-md-3">
            <label className="lable">Enable Full Screen</label>
          </div>
          <div className="col-md-9">
            <input
              onChange={handleChange}
              className="checkBox"
              type="checkBox"
              name="enableFullScreen2"
              id="enableFullScreen2"
            />
          </div>
        </div>

        <>
          <ThumbnailUI
            index={3}
            recommended={"Recommended: 1200 x 675"}
            thumbnailImage={thumbnailImage3}
            setThumbnailImage={setThumbnailImage3}
            imageTag={"Main Image"}
            classList={"thumbnail3 horizontal-rectangle"}
          />
        </>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Enable Full Screen</label>
          </div>
          <div className="col-md-9">
            <input
              onChange={handleChange}
              className="checkBox"
              type="checkBox"
              name="enableFullScreen3"
              id="enableFullScreen3"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Title</label>
          </div>
          <div className="col-md-9">
            <input
              name="title"
              maxLength={80}
              placeholder="Title"
              onChange={handleChange}
              className="form-control fullWidth"
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Subtitle</label>
          </div>
          <div className="col-md-9">
            <input
              name="subTitle"
              maxLength={100}
              placeholder="Subtitle"
              onChange={handleChange}
              className="form-control fullWidth"
            ></input>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-3">
            <label className="lable">Body content </label>
          </div>
          <div className="col-md-9">
            <textarea
              name="bodyContent"
              maxLength={140}
              placeholder="Body content"
              onChange={handleChange}
              className="form-control bodyContent"
            ></textarea>
          </div>
        </div>
        <div className="row  margin-bottom">
          <div className="col-md-3">
            <label className="lable">Show Info Ribbon</label>
          </div>
          <div className="col-md-9">
            <div class="button-switch">
              <input
                onChange={handleChange}
                className="checkBox"
                name="showInfoRibbon"
                id="showInfoRibbon"
                type="checkbox"
                value="true"
              />
              <label for="showInfoRibbon" class="label-success"></label>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-actions">
        <button
          type="button"
          onClick={() => props.setActiveComponent("external1")}
          className="btn btn-default"
          id="layoutBackBtn"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-success" id="layoutSaveBtn">
          Save
        </button>
      </div>
    </form>
  );
}

export default hot(index);
