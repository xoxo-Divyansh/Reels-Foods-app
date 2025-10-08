import "../App.css";

export default function FoodPartnerRegister() {
  return (
    <div className="auth-container">
      <div className="auth-title">Food Partner Register</div>
      <a
        className="auth-link"
        style={{ marginBottom: "1rem", display: "block" }}
        href="/user/register"
      >
        Switch to User
      </a>
      <form className="auth-form">
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
          <label htmlFor="phone">Phone Number</label>
          <input
            id="contactName"
            type="text"
            placeholder="Contact Name"
            name="contactName"
            required
            style={{ marginRight: "1rem" }}
          />
          <input
            id="phone"
            type="tel"
            placeholder="Phone Number"
            name="phone"
          />
        </div>

        <label htmlFor="email">Business Email</label>
        <input
          id="email"
          type="email"
          placeholder="Business Email"
          name="email"
          required
        />

        <label htmlFor="address">Business Address</label>
        <input
          id="address"
          type="text"
          placeholder="Business Address"
          name="address"
        />

        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          placeholder="Address"
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
  );
}
