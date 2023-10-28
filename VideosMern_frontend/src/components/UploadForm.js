import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";

const UploadForm = ({ getAllMedias }) => {
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);

  const hadleSubmit = async(e) => {
    e.preventDefault();
    try {
      // Create a FormData object
      const formData = new FormData();
  
      // Append video files to the FormData
      for (let key in videos) {
        formData.append("videos", videos[key]);
      }
  
      // Append the "name" field
      formData.append("name", name);
  
      // Log the content of the FormData (for debugging purposes)
      // formData.forEach((value, key) => {
        // console.log(key + ': ' + value);
      // });
  
      // Make an Axios POST request to upload the FormData
      const response = await axios.post('http://localhost:4000/api/v1/media/create/', formData);
      alert("Submitted successfully");
      // Handle the success response
      if (response.status === 200) {
        getAllMedias(); // Assuming getAllMedias is a function to update your media list
        alert("Submitted successfully");
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("An error occurred while uploading the video.");
    }
  };

  return (
    <>
      <form onSubmit={hadleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="videos">Upload Videos</label>
          <input
            type="file"
            name="videos"
            id="videos"
            multiple
            className="form-control"
            accept=".mp4, .mkv"
            onChange={(e) => {
              setVideos(e.target.files);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </>
  );
};

export default UploadForm;
