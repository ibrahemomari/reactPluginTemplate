import React, { useEffect, useState } from "react";
import useForm from "../../hooks/form";
import "./style.less";
import "../../../../../../../styles/control/bf-base.css";
function index(props) {

  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [thumbnailImage2, setThumbnailImage2] = useState(null);
  const [thumbnailImage3, setThumbnailImage3] = useState(null);

  const [uploadType2, setUploadType2] = useState("image");
  const [uploadType3, setUploadType3] = useState("image");

  const [videoURL2, setVideoURL2] = useState("");
  const [videoURL3, setVideoURL3] = useState("");


  useEffect(() => {
    // thumbnail set up -->
    let thumbnail = new buildfire.components.images.thumbnail(".thumbnail", {
      imageUrl: "",
      title: " ",
      dimensionsLabel: "Recommended: 675 x 1200",
      multiSelection: false,
    });

    // thumbnail Change image -->
    thumbnail.onChange = (imageUrl) => {
      let croppedImage = buildfire.imageLib.cropImage(
        imageUrl,
        { size: "full_width", aspect: "16:9" }
      );
      setThumbnailImage(croppedImage);
    };
   
    // thumbnail Delete Image -->
    thumbnail.onDelete = (imageUrl) => {
      setThumbnailImage(null)
    };
   
  }, []);

  useEffect(() => {
    if (uploadType2 == "image") {
      //  set up thumbnail -->
      let thumbnail2 = new buildfire.components.images.thumbnail(".thumbnail2", {
        imageUrl: "",
        title: " ",
        dimensionsLabel: "Recommended: 1200 x 675",
        multiSelection: false,
      });
      thumbnail2.onChange = (imageUrl) => {
        let croppedImage = buildfire.imageLib.cropImage(imageUrl, {
          size: "full_width",
          aspect: "16:9",
        });
        setThumbnailImage2(croppedImage);
      };
      thumbnail2.onDelete = (imageUrl) => {
        setThumbnailImage2(null);
      };
      if (thumbnailImage2) {
        thumbnail2.loadbackground(thumbnailImage2);
      }
    }
    if (uploadType3 == "image") {
      let thumbnail3 = new buildfire.components.images.thumbnail(".thumbnail3", {
        imageUrl: "",
        title: " ",
        dimensionsLabel: "Recommended: 1200 x 675",
        multiSelection: false,
      });
      thumbnail3.onChange = (imageUrl) => {
        let croppedImage = buildfire.imageLib.cropImage(imageUrl, {
          size: "full_width",
          aspect: "16:9",
        });
        setThumbnailImage3(croppedImage);
      };
      thumbnail3.onDelete = (imageUrl) => {
        setThumbnailImage3(null);
      };
      if (thumbnailImage3) {
        thumbnail3.loadbackground(thumbnailImage3);
      }
    }
  }, [uploadType2, uploadType3]);

  
  useEffect(() => {
    handelImage({ thumbnailImage, thumbnailImage2, thumbnailImage3, videoURL2, videoURL3 });;
  }, [thumbnailImage, thumbnailImage2, thumbnailImage3, videoURL2, videoURL3])
  // submit form function 
  function submitForm(values) {
    console.log(`Submit function in layout${props.selectedLayout+1} ->`, values);
    props.saveData(values);
  }
  function uploadVideoFunc(e, indexOfMedia) {
    if (e.target.name != "videoURL-Input") {
      let progressPercentage;
      let progressContainer;
      let urlContainer;
     
        progressPercentage = document.getElementById(`progressPercentage${indexOfMedia}`);
        progressContainer = document.getElementById(`progress${indexOfMedia}`);
        urlContainer = document.getElementById(`videoURL${indexOfMedia}`);
    

      buildfire.services.publicFiles.showDialog(
        { filter: ["video/mp4"], allowMultipleFilesUpload: true },
        (onProgress) => {
          progressContainer.style.display = "block";

          progressPercentage.innerText = `${onProgress.file.percentage}%`;
          progressPercentage.style.width = `${onProgress.file.percentage}%`;
        },
        (onComplete) => {
          progressPercentage.style.background = "var(--bf-theme-success)";
          progressPercentage.innerText = "Uploaded Sucessfully";
          setTimeout(() => {
            progressContainer.style.display = "none";
          }, 4000);
        },
        (err, files) => {
          if (err) return console.error(err);
          if(indexOfMedia==2)setVideoURL2(files[0].url);
          if(indexOfMedia==3)setVideoURL3(files[0].url);

          urlContainer.value = files[0].url;
        }
      );
    } else {
      if(indexOfMedia==2)setVideoURL2(e.target.value);
      if(indexOfMedia==3)setVideoURL3(e.target.value);


    }
  }

  const { handleChange, handleSubmit, handelImage } = useForm(submitForm);
  function handleChangeInputType(e, indexOfMedia) {
    if (indexOfMedia == 2) {
      setUploadType2(e.target.value);
      handleChange(e);
    }
    if (indexOfMedia == 3) {
      setUploadType3(e.target.value);
      handleChange(e);
    }
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
            <input onChange={(e) => handleChangeInputType(e, 2)} className="checkBox" type="radio" name="mediaType2" value="image" defaultChecked />
            <label className="lable">Image</label>
            <input onChange={(e) => handleChangeInputType(e, 2)} className="checkBox" type="radio" name="mediaType2" value="video" />
            <label className="lable">Video</label>
          </div>
        </div>
        {uploadType2 == "image" ? (
          <div className="row">
          <div className="col-md-3">
            <label className="lable">Top Image</label>
          </div>
          <div className="col-md-9">
            <div className="thumbnail2 horizontal-rectangle"></div>
          </div>
        </div>

        ) : (
          <>
            <div className="row">
              <div className="col-md-3">
                <label className="lable">Main Video</label>
              </div>
              <div className="col-md-9">
                <button
                  type="button"
                  onClick={(e)=>uploadVideoFunc(e,2)}
                  className="uploadVideo-btn btn btn-success"
                >
                  + Upload Video
                </button>
                <div id="progress2" className="progress">
                  <div
                    className="progress-bar"
                    id="progressPercentage2"
                    role="progressbar"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    25%
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <label className="lable">Video URL</label>
              </div>
              <div className="col-md-9">
                <input
                  defaultValue={videoURL2}
                  placeholder="Video URL"
                  onChange={(e)=>uploadVideoFunc(e,2)}
                  id="videoURL2"
                  name="videoURL-Input"
                  className="form-control fullWidth"
                ></input>
              </div>
            </div>
          </>
        )}
        
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
            <input onChange={(e) => handleChangeInputType(e, 3)} className="checkBox" type="radio" name="mediaType3" value="image" defaultChecked />
            <label className="lable">Image</label>
            <input onChange={(e) => handleChangeInputType(e, 3)} className="checkBox" type="radio" name="mediaType3" value="video" />
            <label className="lable">Video</label>
          </div>
        </div>
        {uploadType3 == "image" ? (
          <div className="row">
          <div className="col-md-3">
            <label className="lable">Main Image</label>
          </div>
          <div className="col-md-9">
            <div className="thumbnail3 horizontal-rectangle"></div>
          </div>
        </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-3">
                <label className="lable">Main Video</label>
              </div>
              <div className="col-md-9">
                <button
                  type="button"
                  onClick={(e)=>uploadVideoFunc(e,3)}
                  className="uploadVideo-btn btn btn-success"
                >
                  + Upload Video
                </button>
                <div id="progress3" className="progress">
                  <div
                    className="progress-bar"
                    id="progressPercentage3"
                    role="progressbar"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    25%
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <label className="lable">Video URL</label>
              </div>
              <div className="col-md-9">
                <input
                  defaultValue={videoURL3}
                  placeholder="Video URL"
                  onChange={(e)=>uploadVideoFunc(e,3)}
                  id="videoURL3"
                  name="videoURL-Input"
                  className="form-control fullWidth"
                ></input>
              </div>
            </div>
          </>
        )}

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
