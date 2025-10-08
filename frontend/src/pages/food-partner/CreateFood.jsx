import React, { useState } from "react";
import "../../styles/theme.css";
import "../../styles/createFood.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return alert("Please select a video file first!");

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", videoFile);

    try {
      await axios.post("http://localhost:3000/api/food", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      navigate("/");

      alert("Food item uploaded successfully!");
      setName("");
      setDescription("");
      setVideoFile(null);
      setPreviewURL(null);
    } catch (err) {
      console.error(err);
      alert("Failed to upload food item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createfood-container">
      <div className="createfood-card">
        <h2 className="form-title">🍱 Upload a New Food Video</h2>
        <p className="form-subtext">Share your food with the world!</p>

        <form onSubmit={handleSubmit} className="createfood-form">
          <div className="form-group">
            <label htmlFor="name">Food Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter food name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Add a short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="video">Upload Video</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="video"
                accept="video/*"
                onChange={handleVideoChange}
                required
              />
              <span className="file-upload-label">
                {videoFile ? videoFile.name : "Choose a video file"}
              </span>
            </div>
          </div>

          {previewURL && (
            <div className="video-preview">
              <video controls
                src={previewURL}
                preload="metadata"
                className="video-frame"
              />
              <track kind="captions" src="captions.vtt" srclang="en" label="English" />
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Uploading..." : "Upload Food"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
