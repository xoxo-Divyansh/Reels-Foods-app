import "../App.css";

export default function UserRegister() {
  return (
    <div className="auth-container">
      <div className="auth-title">User Register</div>
      <a
        className="auth-link"
        style={{ marginBottom: "1rem", display: "block" }}
        href="/food-partner/register"
      >
        Switch to Food Partner
      </a>
      <form className="auth-form">
        <label htmlFor="register-name">Full Name</label>
        <input
          id="register-name"
          type="text"
          placeholder="Full Name"
          required
        />

        <label htmlFor="register-email">Email</label>
        <input id="register-email" type="email" placeholder="Email" required />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
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
  );
}
