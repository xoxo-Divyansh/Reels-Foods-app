import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/profile.css";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  // console.log("Profile ID from URL:", id);
  // console.log("videos:", videos);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Full API response:", response.data);
        if (!mounted) return;

        // guard for different response shapes
        const partner = response?.data?.foodPartner ?? response?.data ?? null;
        const foodItems = response.data.foodPartner.foodItems ?? [];
        console.log("Partner data:", partner);
        console.log("Food items:", response?.data?.foodItems);

        setProfile(partner);
        setVideos(foodItems || []);
      })
      .catch((err) => {
        console.warn("Failed loading profile:", err?.message || err);
        if (mounted) setProfile(null);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div className="profile-root">
      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar" aria-hidden="true" tabIndex={0}>
            {profile?.avatar ? (
              <img
                src={
                  profile?.avatar
                    ? `http://localhost:3000/${profile.avatar}`
                    : "https://in.pinterest.com/pin/159948224261193086/"
                }
                alt={
                  profile?.businessName
                    ? `${profile.businessName} avatar`
                    : "avatar"
                }
                className="avatar-img"
                loading="lazy"
              />
            ) : (
              <svg
                viewBox="0 0 88 88"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
              >
                <circle
                  cx="44"
                  cy="44"
                  r="42"
                  fill="var(--color-accent)"
                  stroke="var(--color-border)"
                  strokeWidth="3"
                />
              </svg>
            )}
          </div>

          <div className="profile-meta">
            <div className="business-name" tabIndex={0}>
              {profile?.businessName || "Business Name"}
            </div>
            <div className="address-box" tabIndex={0}>
              {profile?.address || "Address"}
            </div>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat">
            <div className="stat-value">{profile?.totalMeals ?? "43"}</div>
            <div className="stat-label">Total Meals</div>
          </div>
          <div className="stat">
            <div className="stat-value">{profile?.CustomerServe ?? "15K"}</div>
            <div className="stat-label">Customer Serve</div>
          </div>
        </div>

        <div className="divider" />

        <div className="videos-grid">
          {videos.map((v) => (
            <div key={v._id || v.id} className="video-card">
              <video
                className="video-thumb"
                src={v.video}
                controls
                preload="metadata"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
