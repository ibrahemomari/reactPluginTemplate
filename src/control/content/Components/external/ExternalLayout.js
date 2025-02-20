import React, { useEffect, useState } from "react";
import useForm from "../../hooks/form";
import VideoUi from "../../shared/VideoUi";
import ThumbnailUI from "../../shared/ThumbnailUI";
import "./style.less";
import useMessages from "../../hooks/messages";
import SortablelistComponent from "./sortablelist";
import dummyObjects from "../../../assets/dummyData";
import LayoutHeader from "../LayoutHeader/LayoutHeader";


function ExternalLayout(props) {
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [uploadType, setUploadType] = useState("image");
  const [videoURL, setVideoURL] = useState("");
  const [conetnt, setConetnt] = useState("main");

  const [layoutsTypes, setLayoutsTypes] = useState([
    "Details",
    "Recap & Portfolio",
    "Content Pages",
  ]);
  const [selectedTab, setSelectedTab] = useState("Details");
  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  const [sortType, setSortType] = useState("Manually");

  const { handleSendMessage } = useMessages();
  const [activeLayout, setActiveLayout] = useState({})

  useEffect(() => {
    handelImage({ thumbnailImage, videoURL });
  }, [thumbnailImage, videoURL]);

  useEffect(() => {
    if(props.activeObject.thumbnail){
      setThumbnailImage(props.activeObject.thumbnail);
    }
  },[props])

  useEffect(() => {
    handleSendMessage({ selectedLayout: "external1", pages: props.activeObject.data });
  }, [])
  // submit form function
  function submitForm(values) {
    buildfire.datastore.save(
      values,
      "test",
      (err, result) => {
        if (err) return console.error("Error while saving your data", err);

        console.log("Data saved successfully", result);
      }
    );
  }
  handleSendMessage({ selectedLayout: "external1" });

  const { handleChange, handleSubmit, handelImage, getOldData } = useForm(submitForm);
  useEffect(() => {
    if(props.activeObject){
    getOldData(props.activeObject);
    setThumbnailImage(props.activeObject.thumbnailImage)
    setVideoURL(props.activeObject.videoURL);
    setUploadType(props.activeObject.BackgroundmediaType);
    }
  },[props])

  function handleChangeInputType(e) {
    setUploadType(e.target.value);
    handleChange(e);
  }
  function changeLayOut(e) {
    let oldSelect = document.getElementsByClassName("selected-left-btn");
    for (let i = 0; i < oldSelect.length; i++) {
      oldSelect[i].className = "btn left-btns";
    }
    e.target.classList.add("selected-left-btn");
    setSelectedTab(e.target.textContent);
  }

  function openLayOut(objData){
    setActiveLayout(objData);
    setConetnt("header");
  }

  function deleteObj(title, item){
    buildfire.dialog.confirm(
      {
        title: `Delete ${title}!`,
        subtitle: "Are you sure!",
        message: `You can't undo the process ...`,
        isMessageHTML: true,
      },
      (err, isConfirmed) => {
        if (err) console.error(err);
        if(isConfirmed){
          // function to delete the item 
          console.log("Item deleted successfully ");
        }
      }
    );
  }

  return (
    <>
      {
        conetnt == "main" ? (
          <div className="layout-13-Container slide-in">
          <div className="row">
            <div className="col-md-3">
              <button
                onClick={changeLayOut}
                type="button"
                className="btn left-btns selected-left-btn"
              >
                {layoutsTypes[0]}
              </button>
              <button
                onClick={changeLayOut}
                type="button"
                className="btn left-btns"
              >
                {layoutsTypes[1]}
              </button>
              <button
                onClick={changeLayOut}
                type="button"
                className="btn left-btns"
              >
                {layoutsTypes[2]}
              </button>
            </div>
            <div className="col-md-9">
              {
              selectedTab == layoutsTypes[0] && (
                <form onSubmit={handleSubmit}>
                  <h1>Title Card</h1>
                  <p className="info-note">
                    This is the title card of this Incentive. It will be shown in
                    the main feed.
                  </p>
                  <div className="layOutContainer">
                    <div className="row">
                      <div className="col-md-3">
                        <label className="lable">Background Media Type</label>
                      </div>
                      <div className="col-md-9">
                        <input
                          onChange={handleChangeInputType}
                          className="checkBox"
                          type="radio"
                          name="BackgroundmediaType"
                          value="image"
                          defaultChecked={props.activeObject.BackgroundmediaType!="video"?true:false}
                        />
                        <label className="lable">Image</label>
                        <input
                          onChange={handleChangeInputType}
                          className="checkBox"
                          type="radio"
                          name="BackgroundmediaType"
                          value="video"
                          defaultChecked={props.activeObject.BackgroundmediaType=="video"?true:false}
                        />
                        <label className="lable">Video</label>
                      </div>
                    </div>
  
                    {uploadType  !== "video"? (
                      <>
                        <ThumbnailUI

                          index={1}
                          recommended={"Recommended: 675 x 1200"}
                          thumbnailImage={thumbnailImage}
                          setThumbnailImage={setThumbnailImage}
                          imageTag={"Background Image"}
                          classList={"vertical-rectangle thumbnail"}
                          aspectRatio={"9x16"}
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
                          defaultChecked={props.activeObject.enableFullScreen?true:false}
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
                          defaultValue={props.activeObject.title || "Title"}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <label className="lable">Subtitle</label>
                      </div>
                      <div className="col-md-9">
                        <input
                          className="form-control fullWidth"
                          type="input"
                          name="subtitle"
                          placeholder="Subtitle"
                          maxLength={100}
                          onChange={handleChange}
                          defaultValue={props.activeObject.subtitle || "Subtitle"}
                        />
                      </div>
                    </div>
                    <div className="row margin-bottom">
                      <div className="col-md-3">
                        <label className="lable">Summary</label>
                      </div>
                      <div className="col-md-9">
                        <textarea
                          maxLength={350}
                          onChange={handleChange}
                          name="BodyContent"
                          className="form-control bodyContent"
                          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massaa tempor"
                          defaultValue={props.activeObject.BodyContent || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massaa tempor"}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <h1>Internal Pages</h1>
                  <div className="internalPageContainer ">
                    <p className="info-note">
                      You can add internal pages for this incentive here.{" "}
                    </p>
  
                    <div className="row">
                      <div className="col-md-4">
                        <div className="sort-dropdown-container">
                          <div
                            className={
                              !openSortDropdown ? "dropdown" : "dropdown open"
                            }
                            dropdown="true"
                          >
                            <button
                              className="btn btn-default  text-left dropdown-toggle sort-dropdown"
                              onClick={() =>
                                setOpenSortDropdown(!openSortDropdown)
                              }
                              data-toggle="dropdown"
                              dropdown-toggle="true"
                              aria-expanded={true}
                            >
                              <span className="pull-left">
                                <span className="lable">Sort:{sortType}</span>
                              </span>
                              <span className="chevron icon-chevron-down pull-right"></span>
                            </button>
                            <ul className="dropdown-menu extended" role="menu">
                              <li>
                                <a
                                  className=""
                                  onClick={() => {
                                    setSortType("Manually");
                                    setOpenSortDropdown(!openSortDropdown);
                                  }}
                                >
                                  Manually
                                </a>
                              </li>
                              <li>
                                <a
                                  className=""
                                  onClick={() => {
                                    setSortType("Title A - Z");
                                    setOpenSortDropdown(!openSortDropdown);
                                  }}
                                >
                                  Title A - Z
                                </a>
                              </li>
                              <li>
                                <a
                                  className=""
                                  onClick={() => {
                                    setSortType("Title Z - A");
                                    setOpenSortDropdown(!openSortDropdown);
                                  }}
                                >
                                  Title Z - A
                                </a>
                              </li>
                              <li>
                                <a
                                  className=""
                                  onClick={() => {
                                    setSortType("Newest Entry");
                                    setOpenSortDropdown(!openSortDropdown);
                                  }}
                                >
                                  Newest Entry
                                </a>
                              </li>
                              <li>
                                <a
                                  className=""
                                  onClick={() => {
                                    setSortType("Latest Entry");
                                    setOpenSortDropdown(!openSortDropdown);
                                  }}
                                >
                                  Latest Entry
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4"></div>
                      <div className="col-md-4">
                        <button
                          type="button"
                          className="btn btn-success addLayOut-Btn"
                          onClick={() => openLayOut({})}
                        >
                          + Add Page
                        </button>
                      </div>
                    </div>
                    {
                      props.activeObject.pages ? (
                        props.activeObject.pages.length == 0 ?(
                          <div className="empty-state-lg border-radius-four border-grey">
                          <p>You haven’t added anything yet</p>
                        </div>
                        ):(
                          <div className="layouts-Added-List">
                            <SortablelistComponent deleteObj={deleteObj} openLayOut={openLayOut} data={props.activeObject.pages} listFor={"SponsorShip"} sortType={sortType} />
                          </div>
                        )
                      ) : (
                        <div className="empty-state-lg border-radius-four border-grey">
                        <p>You haven’t added anything yet</p>
                      </div>
                      )
                    }
  
                  </div>
                  <div className="bottom-actions ">
                    <button
                      type="button"
                      className="btn btn-default"
                      id="layoutBackBtn"
                      onClick={() => props.setActiveComponent("home")}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success"
                      id="layoutSaveBtn"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        ) : (

          <LayoutHeader activeLayout={activeLayout} setConetnt={setConetnt} />
        )
      }

    </>
  );
}

export default ExternalLayout;
