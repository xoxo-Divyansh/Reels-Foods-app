import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/auth-shared.css";
axios.defaults.withCredentials = true;

const FoodPartnerLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const businessEmail = e.target.elements["businessEmail"].value;
    const password = e.target.elements["password"].value;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/login",
        { businessEmail, password },
        { withCredentials: true }
      );
      console.log("Login successful:", response.data);

      navigate("/create-food");
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-title">Food Partner Login</div>
        <a
          className="auth-link"
          style={{ marginBottom: "1rem", display: "block" }}
          href="/user/login"
        >
          Switch to User
        </a>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Business Email</label>
          <input
            id="email"
            type="email"
            name="businessEmail"
            placeholder="Business Email"
            required
          />

          {/* Contact name and phone removed for login - only email and password required */}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            required
          />

          <button className="auth-btn" type="submit">
            Login
          </button>
        </form>
        <a className="auth-link" href="/food-partner/register">
          Don't have an account? Register
        </a>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
