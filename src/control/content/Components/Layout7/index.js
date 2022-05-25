import React, { useEffect, useState } from "react";
import useForm from "../../hooks/form";
import "./style.less";
import "../../../../../../../styles/control/bf-base.css";
function index(props) {

  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [thumbnailImage2, setThumbnailImage2] = useState(null);
  const [thumbnailImage3, setThumbnailImage3] = useState(null);

  useEffect(() => {
    // thumbnail set up -->
    let thumbnail = new buildfire.components.images.thumbnail(".thumbnail", {
      imageUrl: "",
      title: " ",
      dimensionsLabel: "Recommended: 675 x 1200",
      multiSelection: false,
    });
    let thumbnail2 = new buildfire.components.images.thumbnail(".thumbnail2", {
      imageUrl: "",
      title: " ",
      dimensionsLabel: "Recommended: 1200 x 675",
      multiSelection: false,
    });
    let thumbnail3 = new buildfire.components.images.thumbnail(".thumbnail3", {
      imageUrl: "",
      title: " ",
      dimensionsLabel: "Recommended: 1200 x 675",
      multiSelection: false,
    });

    // thumbnail Change image -->
    thumbnail.onChange = (imageUrl) => {
      setThumbnailImage(imageUrl);
    };
    thumbnail2.onChange = (imageUrl) => {
      setThumbnailImage2(imageUrl);
    };
    thumbnail3.onChange = (imageUrl) => {
      setThumbnailImage3(imageUrl);
    };
    // thumbnail Delete Image -->
    thumbnail.onDelete = (imageUrl) => {
      setThumbnailImage(null)
    };
    thumbnail2.onDelete = (imageUrl) => {
      setThumbnailImage2(null)
    };
    thumbnail3.onDelete = (imageUrl) => {
      setThumbnailImage3(null)
    };
  }, []);
  useEffect(() => {
    handelImage({ thumbnailImage, thumbnailImage2, thumbnailImage3 });
  }, [thumbnailImage, thumbnailImage2, thumbnailImage3])
  // submit form function 
  function submitForm(values) {
    console.log('forms values ->', values);
  }
  // submit form function 
  function submitForm(values) {
    console.log(`Submit function in layout${props.selectedLayout+1} ->`, values);
    props.saveData(values);
  }
  const { handleChange, handleSubmit, handelImage } = useForm(submitForm);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Page Details</h1>
      <div className="layOutContainer">
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Background Image</label>
          </div>
          <div className="col-md-9">
            <div className="vertical-rectangle thumbnail"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Enable Full Screen</label>
          </div>
          <div className="col-md-9">
            <input onChange={handleChange} className="checkBox" type="checkBox" name="enableFullScreen1" id="enableFullScreen1" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Top Media Type</label>
          </div>
          <div className="col-md-9">
            <input onChange={handleChange} className="checkBox" type="radio" name="mediaType" value="image" defaultChecked />
            <label className="lable">Image</label>
            <input onChange={handleChange} className="checkBox" type="radio" name="mediaType" value="video" />
            <label className="lable">Video</label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Top Image</label>
          </div>
          <div className="col-md-9">
            <div className="thumbnail2 horizontal-rectangle"></div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <label className="lable">Enable Full Screen</label>
          </div>
          <div className="col-md-9">
            <input onChange={handleChange} className="checkBox" type="checkBox" name="enableFullScreen2" id="enableFullScreen2" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Top Body content</label>
          </div>
          <div className="col-md-9">
            <textarea placeholder="Top Body content" name="TopBodyContent" onChange={handleChange} className="form-control bodyContent"></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Main Media Type</label>
          </div>
          <div className="col-md-9">
            <input onChange={handleChange} className="checkBox" type="radio" name="mediaType2" value="image" defaultChecked />
            <label className="lable">Image</label>
            <input onChange={handleChange} className="checkBox" type="radio" name="mediaType2" value="video" />
            <label className="lable">Video</label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Main Image</label>
          </div>
          <div className="col-md-9">
            <div className="thumbnail3 horizontal-rectangle"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label className="lable">Enable Full Screen</label>
          </div>
          <div className="col-md-9">
            <input onChange={handleChange} className="checkBox" type="checkBox" name="enableFullScreen3" id="enableFullScreen3" />
          </div>
        </div>
        <div className="row margin-bottom">
          <div className="col-md-3">
            <label className="lable">Main Body content</label>
          </div>
          <div className="col-md-9">
            <textarea placeholder="Main Body content" name="MainBodyContent" onChange={handleChange} className="form-control bodyContent"></textarea>
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

export default index;
