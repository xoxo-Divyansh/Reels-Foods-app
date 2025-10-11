import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../../styles/save.css";

const SavedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);

  console.log("SavedVideos component rendered");
  console.log("Videos state:", videos);
  console.log("Loading state:", loading);
  console.log("Error message state:", errorMsg);
  
  // Lock body scroll while reels active
  useEffect(() => {
    document.body.classList.add("reels-locked");
    return () => document.body.classList.remove("reels-locked");
  }, []);

  // Fetch saved videos
  useEffect(() => {
    const fetchSavedVideos = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:3000/api/food/saved",
          { withCredentials: true }
        );
        const items = res?.data?.savedItems || [];
        setVideos(items);
        console.log("Fetched saved videos:", items);
        setErrorMsg("");
      } catch (err) {
        console.warn("Error fetching saved videos:", err.message);
        setVideos([]);
        setErrorMsg("Unable to fetch saved videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedVideos();
  }, []);

  // Log videos whenever they update
  useEffect(() => {
    console.log("Videos updated:", videos);
  }, [videos]);

  // Autoplay logic
  useEffect(() => {
    if (!containerRef.current || videos.length === 0) return;

    const options = { threshold: 0.6 };
    const tryPlay = async (video) => {
      if (!video) return;
      try {
        video.muted = true;
        const p = video.play();
        if (p && typeof p.then === "function") await p;
      } catch (e) {
        console.error("Error attempting to play video:", e);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector("video");
        if (!video) return;
        if (entry.isIntersecting) tryPlay(video);
        else video.pause();
      });
    }, options);

    const nodes = containerRef.current.querySelectorAll(".reel");
    nodes.forEach((n) => observer.observe(n));

    return () => {
      nodes.forEach((node) => {
        const v = node.querySelector("video");
        if (v) v.pause();
      });
      observer.disconnect();
    };
  }, [videos]);

  const setVideoRef = (id) => (el) => {
    if (!el) videoRefs.current.delete(id);
    else videoRefs.current.set(id, el);
  };

  return (
    <div className="reels-root">
      <div className="reels-container" ref={containerRef}>
  {loading && (
    <div style={{ color: "#fff", textAlign: "center" }}>Loading...</div>
  )}

  {!loading && errorMsg && (
    <div style={{ color: "#fff", textAlign: "center" }}>{errorMsg}</div>
  )}

  {!loading && !errorMsg && videos.length > 0 && (
    videos.map((item) => (
      <section className="reel" key={item._id}>
        <video
          ref={setVideoRef(item._id)}
          className="reel-video"
          src={item.video}
          autoPlay
          playsInline
          muted
          loop
        />
        <div className="reel-overlay">
          <div className="reel-meta">
            <p className="reel-desc">{item.description}</p>
          </div>
        </div>
      </section>
    ))
  )}

  {!loading && !errorMsg && videos.length === 0 && (
    <section className="reel">
      <div style={{ color: "#fff", textAlign: "center" }}>
        <h2>No saved videos</h2>
        <p>Save videos by tapping the bookmark icon to see them here.</p>
      </div>
    </section>
  )}
      </div>
    </div>
  );
}

export default SavedVideos;
