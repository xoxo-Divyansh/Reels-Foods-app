import React from "react";
import axios from "axios";

const FoodCard = ({ video }) => {

  const handleSaveVideo = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/food/save/${video._id}`,
        {},
        { withCredentials: true }
      );
      console.log("Video saved:", res.data);
      alert("Video saved!");
    } catch (err) {
      console.error("Error saving video:", err.response?.data || err.message);
      alert("Failed to save video");
    }
  };

  return (
    <div className="food-card">
      <video src={video.video} controls />
      <p>{video.description}</p>
      <button onClick={handleSaveVideo}>Save</button>
    </div>
  );
};

export default FoodCard;
