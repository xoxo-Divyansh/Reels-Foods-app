import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/auth-shared.css";

// Set axios to send credentials (cookies) with every request by default
axios.defaults.withCredentials = true;

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.elements["register-name"].value;
    const email = e.target.elements["register-email"].value;
    const password = e.target.elements["register-password"].value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Registration successful:", response.data);

      navigate("/home");
      
      // Optionally handle success (e.g., redirect or show message)
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-title">User Register</div>
        <a
          className="auth-link"
          style={{ marginBottom: "1rem", display: "block" }}
          href="/food-partner/register"
        >
          Switch to Food Partner
        </a>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="register-name">Full Name</label>
          <input
            id="register-name"
            name="register-name"
            type="text"
            placeholder="Full Name"
            required
          />

          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            name="register-email"
            type="email"
            placeholder="Email"
            required
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            name="register-password"
            type="password"
            placeholder="Password"
            required
          />

          <button className="auth-btn" type="submit">
            Register
          </button>
        </form>
        <a className="auth-link" href="/user/login">
          Already have an account? Login
        </a>
      </div>
    </div>
  );
};

export default UserRegister;
