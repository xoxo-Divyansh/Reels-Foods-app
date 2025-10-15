import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/auth-shared.css";
axios.defaults.withCredentials = true;

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.elements["businessName"].value;
    const contactName = e.target.elements["contactName"].value;
    const phoneNumber = e.target.elements["phoneNumber"].value;
    const businessEmail = e.target.elements["BusinessEmail"].value;
    const address = e.target.elements["address"].value;
    const password = e.target.elements["password"].value;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/register",
        {
          businessName,
          contactName,
          phoneNumber,
          businessEmail,
          address,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Registration successful:", response.data);

      navigate("/create-food");
    } catch (error) {
      console.error("There was an errror in Registration!", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-title">Food Partner Register</div>
        <a
          className="auth-link"
          style={{ marginBottom: "1rem", display: "block" }}
          href="/user/register"
        >
          Switch to User
        </a>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Business Name</label>
          <input
            id="name"
            type="text"
            placeholder="Business Name"
            name="name"
            required
          />

          <div className="auth-row">
            <label htmlFor="contactName">Contact Name</label>
            <input
              id="contactName"
              type="text"
              placeholder="Contact Name"
              name="contact"
              required
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              name="phone"
            />
          </div>
          <br />
          <label htmlFor="email">Business Email</label>
          <input
            id="email"
            type="email"
            placeholder="Business Email"
            name="businessEmail"
            required
          />

          <label htmlFor="address">Business Address</label>
          <input
            id="address"
            type="text"
            placeholder="Ex. 123 Main Street, City, Country"
            name="address"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            required
          />

          <button className="auth-btn" type="submit">
            Register
          </button>
        </form>

        <a className="auth-link" href="/food-partner/login">
          Already have an account? <span className="login">Login</span>
        </a>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
