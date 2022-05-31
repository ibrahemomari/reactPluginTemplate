import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";

import useForm from "../../hooks/form";

import "./style.less";
import "../../../../../../../styles/control/bf-base.css";
import VideoUi from "../../shared/VideoUi";
function index(props) {
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [thumbnailImage2, setThumbnailImage2] = useState(null);
  const [uploadType, setUploadType] = useState("image");
  const [videoURL, setVideoURL] = useState("");

  useEffect(() => {
    let thumbnail = new buildfire.components.images.thumbnail(".thumbnail", {
      imageUrl: "",
      title: " ",
      dimensionsLabel: "Recommended: 1200 x 960",
      multiSelection: false,
    });
    thumbnail.onChange = (imageUrl) => {
      let croppedImage = buildfire.imageLib.cropImage(
        imageUrl,
        { size: "full_width", aspect: "16:9" }
      );
      setThumbnailImage(croppedImage);
    };
    // thumbnail Delete Image -->
    thumbnail.onDelete = (imageUrl) => {
      setThumbnailImage(null);
    };


    console.log("hello", props.selectedLayout);
  }, []);

  useEffect(() => {

    handelImage({thumbnailImage, thumbnailImage2, videoURL});

  }, [thumbnailImage, thumbnailImage2, videoURL]);
  // submit form function 
  function submitForm(values) {
    console.log(`Submit function in layout${props.selectedLayout + 1} ->`, values);
    props.saveData(values);
  }
  useEffect(() => {
    if (uploadType == "image") {
      //  set up thumbnail -->
      let thumbnail2 = new buildfire.components.images.thumbnail(".thumbnail2", {
        imageUrl: "",
        title: " ",
        dimensionsLabel: "Recommended: 1200 x 675",
        multiSelection: false,
      });
      thumbnail2.onChange = (imageUrl) => {
        let croppedImage = buildfire.imageLib.cropImage(
          imageUrl,
          { size: "full_width", aspect: "16:9" }
        );
        setThumbnailImage2(croppedImage);

            };

      thumbnail2.onDelete = (imageUrl) => {
        setThumbnailImage2(null);
      };
      if (thumbnailImage2) {
        thumbnail2.loadbackground(thumbnailImage2);
      }
    }
  }, [uploadType])
  // submit form function 
  function submitForm(values) {
    console.log(`Submit function in layout${props.selectedLayout + 1} ->`, values);
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
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Background Image</label>
          </div>
          <div className="col-md-9">
            <div className="thumbnail sequare"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Enable Full Screen</label>
          </div>
          <div className="col-md-9">
            <input
              onChange={handleChange}
              className="checkBox" type="checkBox"
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
              className="checkBox" type="radio"
              name="mediaType"
              value="image"
              defaultChecked
            />
            <label className="lable">Image</label>
            <input
              onChange={handleChangeInputType}
              className="checkBox" type="radio"
              name="mediaType"
              value="video"
            />
            <label className="lable">Video</label>
          </div>
        </div>
        {
          uploadType == "image" ?
            (<div className="row">

              <div className="col-md-3">
                <label className="lable">Top Image</label>
              </div>
              <div className="col-md-9">
                <div className="thumbnail2 horizontal-rectangle"></div>
              </div>
            </div>
            ) : (

              <>
                <VideoUi handleChange={handleChange} setVideoURL={setVideoURL} videoURL={videoURL} index={1}/>
              </>
            )
        }
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Enable Full Screen</label>
          </div>
          <div className="col-md-9">
            <input
              onChange={handleChange}
              className="checkBox" type="checkBox"
              name="enableFullScreen2"
              id="enableFullScreen2"
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
              placeholder="SubTitle"
              onChange={handleChange}
              className="form-control fullWidth"
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Body content 1</label>
          </div>
          <div className="col-md-9">
            <textarea
              name="bodyContent"
              maxLength={140}
              placeholder="Body content 1"
              onChange={handleChange}
              className="form-control bodyContent"
            ></textarea>
          </div>
        </div>
        <div className="row margin-bottom">
          <div className="col-md-3">
            <label className="lable">Body content 2</label>
          </div>
          <div className="col-md-9">
            <textarea
              name="bodyContent2"

              placeholder="Body content 2"
              onChange={handleChange}
              className="form-control bodyContent"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="bottom-actions">
        <button className="btn btn-default" id="layoutBackBtn">
          Cancel
        </button>
        <button className="btn btn-success" id="layoutSaveBtn">
          Save
        </button>
      </div>
    </form>
  );
}

export default hot(index);
