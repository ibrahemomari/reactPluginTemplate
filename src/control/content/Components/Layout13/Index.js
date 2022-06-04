import React, { useEffect, useState } from "react";
import useForm from "../../hooks/form";
import VideoUi from "../../shared/VideoUi";
import ThumbnailUI from "../../shared/ThumbnailUI";
import "./style.less";

function Index() {
    const [thumbnailImage, setThumbnailImage] = useState(null);
    const [uploadType, setUploadType] = useState("image");
    const [videoURL, setVideoURL] = useState("");
  
    useEffect(() => {
      handelImage({ thumbnailImage, videoURL });
    }, [thumbnailImage, videoURL]);
    // submit form function
    function submitForm(values) {
      console.log("forms values ->", values);
    }
    const { handleChange, handleSubmit, handelImage } = useForm(submitForm);
    function handleChangeInputType(e) {
      setUploadType(e.target.value);
      handleChange(e);
    }  
  return (
      <>
      <form onSubmit={handleSubmit}>
      <h1>Page Details</h1>
      <div className="layOutContainer slide-in">
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Cover Media Type</label>
          </div>
          <div className="col-md-9">
            <input
              onChange={handleChangeInputType}
              className="checkBox"
              type="radio"
              name="BackgroundmediaType"
              value="image"
              defaultChecked
            />
            <label className="lable">Image</label>
            <input
              onChange={handleChangeInputType}
              className="checkBox"
              type="radio"
              name="BackgroundmediaType"
              value="video"
            />
            <label className="lable">Video</label>
          </div>
        </div>

        {uploadType == "image" ? (
          <>
            <ThumbnailUI
              index={1}
              recommended={"Recommended: 675 x 1200"}
              thumbnailImage={thumbnailImage}
              setThumbnailImage={setThumbnailImage}
              imageTag={"Cover Image"}
              classList={"vertical-rectangle thumbnail"}
            />
          </>
        ) : (
          <>
            <VideoUi
              setVideoURL={setVideoURL}
              videoURL={videoURL}
              index={1}
              handleChange={handleChange}
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
              name="enableFullScreen"
              id="enableFullScreen"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <label className="lable">Title</label>
          </div>
          <div className="col-md-9">
            <input
              maxLength={80}
              onChange={handleChange}
              className="form-control fullWidth"
              type="text"
              name="title"
              placeholder="Title"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Summary</label>
          </div>
          <div className="col-md-9">
            <input
              className="form-control fullWidth"
              type="input"
              name="subtitle"
              placeholder="Summary"
              maxLength={100}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row ">
          <div className="col-md-3">
            <label className="lable">Body Content</label>
          </div>
          <div className="col-md-9">
            <textarea
              maxLength={350}
              onChange={handleChange}
              name="bodyContent"
              className="form-control bodyContent"
              placeholder="Body Content"
            ></textarea>
          </div>
        </div>
        <div className="row  margin-bottom">
          <div className="col-md-3">
            <label className="lable">Show Info Ribbon</label>
          </div>
          <div className="col-md-9">
            <div class="button-switch">
              <input onChange={handleChange} className="checkBox" name="showInfoRibbon" id="showInfoRibbon" type="checkbox" value="true" />
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
      
      </>
  )
}

export default Index