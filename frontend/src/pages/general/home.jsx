import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import "../../styles/home.css";
import toast, { Toaster } from "react-hot-toast";


const Home = () => {
  const [videos, setVideos] = useState([]);
  const [likes, setLikes] = useState({});
  const [saves, setSaves] = useState({});
  const [counts, setCounts] = useState({}); // 🧩 For Like, Comment, Share counts
  const videoRefs = useRef(new Map());

  const containerRef = useRef(null);
  // Lock body scroll while reels active
  useEffect(() => {
    console.log("Videos loaded:", videos);

    document.body.classList.add("reels-locked");
    return () => document.body.classList.remove("reels-locked");
  }, [videos]);

  // Fetch videos from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((res) => {
        const items = res?.data?.foodItems || [];
        setVideos(items);

        // 🧩 Initialize counts (random or from backend)
        const initialCounts = {};
        items.forEach((item) => {
          initialCounts[item._id] = {
            likes: Math.floor(Math.random()),
            comments: Math.floor(Math.random()),
            shares: Math.floor(Math.random()),
          };
        });
        setCounts(initialCounts);
      })
      .catch((err) => {
        console.warn("Error fetching food items:", err.message);
        setVideos([]);
      });
  }, []);

  // FetchSaved .......
  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/food/saved", {
          withCredentials: true,
        });
        const savedIds = {};
        res.data.savedItems.forEach((item) => {
          savedIds[item._id] = true;
        });
        setSaves(savedIds); // Update your saves state
      } catch (err) {
        console.error("Error fetching saved videos:", err.message);
      }
    };
    fetchSaved();
  }, []);

  // IntersectionObserver to autoplay/pause videos
  useEffect(() => {
    if (!containerRef.current || videos.length === 0) return;

    const options = { threshold: 0.6 };
    const tryPlay = async (video) => {
      if (!video) return;
      try {
        video.muted = true;
        const p = video.play();
        if (p && typeof p.then === "function") await p;
        const reel = video.closest(".reel");
        if (reel) reel.removeAttribute("data-needs-play");
      } catch {
        const reel = video.closest(".reel");
        if (reel) reel.setAttribute("data-needs-play", "true");
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

// Handle Like toggle + counter update
const toggleLike = (id) => {
  setLikes((prev) => {
    const isLiked = !prev[id]; // new like state
    // Show toast depending on action
    if (isLiked) toast("You liked this video ❤️");
    else toast("You unliked this video 💔");

    return { ...prev, [id]: isLiked };
  });

  setCounts((prev) => ({
    ...prev,
    [id]: {
      ...prev[id],
      likes: prev[id].likes + (likes[id] ? -1 : 1),
    },
  }));
};

  // Dummy comment handler (for future modal)
  const handleComment = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        comments: prev[id].comments + 1,
      },
    }));
    toast("Comment feature coming soon 😄");
  };

  // Share handler
  const handleShare = (id) => {
    navigator.clipboard.writeText(window.location.href);
    setCounts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        shares: prev[id].shares + 1,
      },
    }));
     toast.success("Link copied! 🔗");
  };

  // Save toggle
  const toggleSave = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/food/save/${id}`,
        {},
        { withCredentials: true }
      );

      console.log("Saved video:", res.data);

      setSaves((prev) => ({ ...prev, [id]: !prev[id] }));
      toast.success ("Video saved!");
    } catch (err) {
      console.error("Error saving video:", err.response?.data || err.message);
      toast.error("Failed to save video");
    }
  };

  const setVideoRef = (id) => (el) => {
    if (!el) videoRefs.current.delete(id);
    else videoRefs.current.set(id, el);
  };

  return (
    <div className="reels-root">
      <div className="reels-container" ref={containerRef}>
        {videos.length > 0 ? (
          videos.map((item) => (
            <section className="reel" key={item._id}>
              {/* Action Buttons */}
              <div className="reel-actions">
                {/* ❤️ Like */}
                <button
                  className={`action-btn ${likes[item._id] ? "liked" : ""}`}
                  onClick={() => toggleLike(item._id)}
                  aria-label="Like"
                >
                  {likes[item._id] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ff3366"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 
                      2 12.28 2 8.5 2 5.42 4.42 
                      3 7.5 3c1.74 0 3.41 0.81 4.5 
                      2.09C13.09 3.81 14.76 3 16.5 
                      3 19.58 3 22 5.42 22 
                      8.5c0 3.78-3.4 6.86-8.55 
                      11.54L12 21.35z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 
                        0 016.364 0L12 7.636l1.318-1.318a4.5 
                        4.5 0 116.364 6.364L12 
                        20.364l-7.682-7.682a4.5 
                        4.5 0 010-6.364z"
                      />
                    </svg>
                  )}
                </button>
                <span className="count-text">
                  {counts[item._id]?.likes || 0}
                </span>

                {/* 💬 Comment */}
                <button
                  className="action-btn"
                  aria-label="Comment"
                  onClick={() => handleComment(item._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 15a2 2 0 01-2 2H7l-4 
                      4V5a2 2 0 012-2h14a2 2 0 
                      012 2v10z"
                    />
                  </svg>
                </button>
                <span className="count-text">
                  {counts[item._id]?.comments || 0}
                </span>

                {/* 🔁 Share */}
                <button
                  className="action-btn"
                  aria-label="Share"
                  onClick={() => handleShare(item._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 12v8a2 2 0 002 
                      2h12a2 2 0 002-2v-8M16 
                      6l-4-4m0 0L8 6m4-4v12"
                    />
                  </svg>
                </button>
                <span className="count-text">
                  {counts[item._id]?.shares || 0}
                </span>

                {/* 🔖 Save */}
                <button
                  className={`action-btn ${saves[item._id] ? "saved" : ""}`}
                  onClick={() => toggleSave(item._id)}
                  aria-label="Save"
                >
                  {saves[item._id] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffd700"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        d="M6 2a2 2 0 00-2 2v18l8-4 
                      8 4V4a2 2 0 00-2-2H6z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 5a2 2 0 012-2h10a2 
                        2 0 012 2v16l-7-3.5L5 
                        21V5z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Video */}
              <video
                ref={setVideoRef(item._id)}
                className="reel-video"
                src={item.video}
                autoPlay
                playsInline
                preload="metadata"
                muted
                loop
              />

              {/* Overlay */}
              <div className="reel-overlay">
                <div className="reel-meta">
                  <p className="reel-desc">{item.description}</p>
                  <Link
                    className="visit-btn"
                    to={`/food-partner/${item.foodPartner}`}
                  >
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
              <p>Upload videos from your dashboard to see them here.</p>
            </div>
          </section>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
      
         {/* Toast container */}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default Home;
