import React, { useEffect, useState } from "react";
import useForm from "../../hooks/form";
import "./style.less";
function index(props) {
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [carouselImages, setCarouselImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState({});
  const [orderedImages, setOrderedImages] = useState({});
  const [onItemChange, setOnItemChange] = useState({});
  const [uploadType, setUploadType] = useState("image");
  const [videoURL, setVideoURL] = useState("");
  useEffect(() => {
    let editor = new buildfire.components.carousel.editor(".carousel", []);
    editor.onAddItems = (items) => {
      setCarouselImages(items);
    };
    editor.onDeleteItem = (item, index) => {
      setDeletedImages(item);
    };
    editor.onOrderChange = (item, oldIndex, newIndex) => {
      setOrderedImages({ item, oldIndex, newIndex });
    };
    editor.onItemChange = (item, index) => {
      setOnItemChange({ item, index });
    };
  }, []);

  useEffect(() => {
    if (uploadType == "image") {
      let thumbnail = new buildfire.components.images.thumbnail(".thumbnail", {
        imageUrl: "",
        title: " ",
        dimensionsLabel: "Recommended: 1200 x 960",
        multiSelection: false,
      });
      thumbnail.onChange = (imageUrl) => {
        let croppedImage = buildfire.imageLib.cropImage(imageUrl, {
          size: "full_width",
          aspect: "16:9",
        });
        setThumbnailImage(croppedImage);
      };
      // thumbnail Delete Image -->
      thumbnail.onDelete = (imageUrl) => {
        setThumbnailImage(null);
      };
    }
  },[uploadType])

  function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

  useEffect(() => {
    let newCarousel = allImages;
    newCarousel[onItemChange.index] = onItemChange.item;
    console.log("change", newCarousel);
    setAllImages(newCarousel);
  }, [onItemChange]);

  useEffect(() => {
    let newCarousel =[];
    allImages.forEach(element=>{
      newCarousel.push(element)
    })
    newCarousel.splice(orderedImages.oldIndex,1);
    newCarousel.splice(orderedImages.newIndex,0,orderedImages.item);
      setAllImages(newCarousel);
  }, [orderedImages]);


  useEffect(() => {
    let newCarousel = allImages.filter((element, idx) => {
      return element !== deletedImages;
    });
    console.log("newCarousel", newCarousel);
    setAllImages(newCarousel);
  }, [deletedImages]);

  useEffect(() => {
    setAllImages([...carouselImages, ...allImages]);
    console.log(" images", carouselImages);
  }, [carouselImages]);


  useEffect(() => {
    console.log("befor message all images carousel", allImages);
    handelImage({ thumbnailImage, allImages,videoURL });
  }, [thumbnailImage, allImages, onItemChange,videoURL]);
  // submit form function
  function submitForm(values) {
    console.log("forms values ->", values);
  }
  function uploadVideoFunc(e) {
    if (e.target.name != "videoURL-Input") {
      let progressPercentage = document.getElementById("progressPercentage");
      let progressContainer = document.getElementById("progress");

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
          setTimeout(()=>{
            progressContainer.style.display = "none";
          }, 4000)
        },
        (err, files) => {
          if (err) return console.error(err);
          setVideoURL(files[0].url);

          let urlContainer = document.getElementById("videoURL");
          urlContainer.value = files[0].url;
        }
      );
    } else {
      setVideoURL(e.target.value);
    }
  }

  function handleChangeInputType(e) {
    setUploadType(e.target.value);
    handleChange(e);
  }
  const { handleChange, handleSubmit, handelImage } = useForm(submitForm);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Page Details</h1>
        <div className="layOutContainer layout-container-6">
          <div className="row">
            <div className="col-md-3">
              <label className="lable">Top Media Type</label>
            </div>
            <div className="col-md-9">
              <input
                type="radio"
                name="topMediaType"
                value="image"
                defaultChecked
                onChange={handleChangeInputType}
                className="checkBox"
              />
              <label className="lable">Image</label>
              <input
                className="checkBox"
                type="radio"
                name="topMediaType"
                value="video"
                onChange={handleChangeInputType}
              />
              <label className="lable">Video</label>
            </div>
          </div>
          {uploadType == "image" ?(<div className="row">
            <div className="col-md-3">
              <label className="lable">Top Image</label>
            </div>
            <div className="col-md-9">
              <div className="thumbnail sequare"></div>
            </div>
          </div>):(
            <>
            <div className="row">
              <div className="col-md-3">
                <label className="lable">Main Video</label>
              </div>
              <div className="col-md-9">
                <button type="button" onClick={uploadVideoFunc} className="uploadVideo-btn btn btn-success">
                  + Upload Video
                </button>
                <div id="progress" className="progress">
                  <div className="progress-bar" id="progressPercentage" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                </div>

              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <label className="lable">Video URL</label>
              </div>
              <div className="col-md-9">
                <input defaultValue={videoURL} placeholder="Video URL" onChange={uploadVideoFunc} id="videoURL" name="videoURL-Input" className="form-control fullWidth"></input>
              </div>
            </div>
          </>
          )}
          <div className="row">
            <div className="col-md-3">
              <label className="lable">Enable Full Screen</label>
            </div>
            <div className="col-md-9">
              <input
                type="checkBox"
                className="checkBox"
                name="enableFullScreen"
                id="enableFullScreen"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label className="lable">Body Content</label>
            </div>
            <div className="col-md-9">
              <textarea
                maxLength={300}
                placeholder="Body Content"
                className="form-control bodyContent"
                name="bodyContent"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="row margin-bottom">
            <div className="col-md-3">
              <label className="lable">Image Carousel</label>
            </div>
            <div className="col-md-9">
              <div className="carousel"></div>
            </div>
          </div>
        </div>
        <div className="bottom-actions">
          <button type="button" className="btn btn-default" id="layoutBackBtn">
            Cancel
          </button>
          <button type="submit" className="btn btn-success" id="layoutSaveBtn">
            Save
          </button>
        </div>
      </form>
    </>
  );
}
export default index;
