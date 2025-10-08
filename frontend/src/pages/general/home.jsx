import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);
  // const navigate = useNavigate()

  useEffect(() => {
    // lock body scrolling while the reels container is mounted
    document.body.classList.add("reels-locked");
    return () => {
      document.body.classList.remove("reels-locked");
    };
  }, []);

  // fetch videos from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((res) => {
        console.log("Response:", res.data);
        const items = res?.data?.foodItems || [];
        setVideos(items);
      })
      .catch((error) => {
        console.warn("Error fetching food items:", error?.message || error);
        // Likely unauthenticated or request failed — clear videos (no fallback)
        setVideos([]);
      });
  }, []);

  // attach observer after videos are rendered so new .reel nodes get observed
  useEffect(() => {
    if (!containerRef.current || !videos || videos.length === 0) return;

    const options = { root: null, rootMargin: "0px", threshold: 0.6 };

    // helper to try play and handle failures
    const tryPlay = async (video) => {
      if (!video) return;
      try {
        // ensure muted to allow autoplay
        video.muted = true;
        const p = video.play();
        if (p && typeof p.then === "function") {
          await p;
        }
        // clear any fallback marker if play succeeds
        const reel = video.closest(".reel");
        if (reel) reel.removeAttribute("data-needs-play");
      } catch (err) {
        console.warn("video.play() failed:", err);
        // mark the reel so UI can surface a manual play control
        const reel = video.closest(".reel");
        if (reel) reel.setAttribute("data-needs-play", "true");
      }
    };
    // create the observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector("video");
        if (!video) return;

        if (entry.isIntersecting) {
          tryPlay(video);
        } else {
          try {
            video.pause();
            // clear the needs-play marker when paused
            const reel = video.closest(".reel");
            if (reel) reel.removeAttribute("data-needs-play");
          } catch (e) {
            console.warn("Failed to pause video:", e);
          }
        }
      });
    }, options);

    // observe current .reel nodes (now that videos are rendered)
    const nodes = containerRef.current.querySelectorAll(".reel");
    nodes.forEach((n) => observer.observe(n));

    // cleanup: pause videos and disconnect observer
    return () => {
      nodes.forEach((node) => {
        const v = node.querySelector("video");
        if (v) {
          try {
            v.pause();
          } catch (e) {
            console.warn("Failed to pause video:", e);
          }
        }
      });
      observer.disconnect();
    };
  }, [videos]); // re-run whenever videos change so newly added reels are observed

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  return (
    <div className="reels-root">
      <div className="reels-container" ref={containerRef}>
        {videos && videos.length > 0 ? (
          videos.map((item) => (
            <section className="reel" key={item._id}>
              <video
                ref={setVideoRef(item._id)}
                className="reel-video"
                // backend stores the URL in `video`; fall back to `src` if present
                src={item.video }
                autoPlay
                playsInline
                preload="metadata"
                muted
                loop
              />

              <div className="reel-overlay">
                <div className="reel-meta">

                  <p className="reel-desc">{item.description}</p>
                  
                  <Link
                    className="visit-btn"
                    to={`/food-partner/${item.foodPartner}`}
                    aria-label="Visit Store">
                    Visit Store
                  </Link>
                  
                </div>
              </div>
            </section>
          ))
        ) : (
          <section className="reel">
            <div style={{ color: "#fff", textAlign: "center" }}>
              <h2>No reels available</h2>
              <p>Upload video items from your dashboard to see them here.</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home;
