import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/auth-shared.css";
axios.defaults.withCredentials = true;
// Set axios to send credentials (cookies) with every request by default

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements["user-email"].value;
    const password = e.target.elements["user-password"].value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login successful:", response.data);

      navigate("/");

    } catch (error) {
      // Handle error (e.g., show error message)
      console.error(error);
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-title">User Login</div>
        <a
          className="auth-link"
          style={{ paddingBottom: "1rem", display: "block" }}
          href="/food-partner/login"
        >
          Switch to Food Partner
        </a>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="user-email">Email</label>
          <input id="user-email" type="email" placeholder="Email" required />

          <label htmlFor="user-password">Password</label>
          <input
            id="user-password"
            type="password"
            placeholder="Password"
            required
          />

          <button className="auth-btn" type="submit">
            Login
          </button>
        </form>
        <a className="auth-link" href="/user/register">
          Don't have an account? Register
        </a>
      </div>
    </div>
  );
};

export default UserLogin;
