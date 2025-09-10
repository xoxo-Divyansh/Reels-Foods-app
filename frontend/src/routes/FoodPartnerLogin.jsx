import "../App.css";

export default function FoodPartnerLogin() {
  return (
    <div className="auth-container">
      <div className="auth-title">Food Partner Login</div>
      <a
        className="auth-link"
        style={{ marginBottom: "1rem", display: "block" }}
        href="/user/login"
      >
        Switch to User
      </a>
      <form className="auth-form">
        <label htmlFor="email">Business Email</label>
        <input id="email" type="email" placeholder="Business Email" required />

        <div className="auth-row">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="contactName">Contact Name</label>
            <input
              id="contactName"
              type="text"
              placeholder="Contact Person Name"
              name="contactName"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              name="phone"
            />
          </div>
        </div>

        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Password" required />

        <button className="auth-btn" type="submit">
          Login
        </button>
      </form>
      <a className="auth-link" href="/food-partner/register">
        Don't have an account? Register
      </a>
    </div>
  );
}
