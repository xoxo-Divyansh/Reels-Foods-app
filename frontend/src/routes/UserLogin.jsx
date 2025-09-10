import "../App.css";

export default function UserLogin() {
  return (
    <div className="auth-container">
      <div className="auth-title">User Login</div>
      <a
        className="auth-link"
        style={{ marginBottom: "1rem", display: "block" }}
        href="/food-partner/login"
      >
        Switch to Food Partner
      </a>
      <form className="auth-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button className="auth-btn" type="submit">
          Login
        </button>
      </form>
      <a className="auth-link" href="/user/register">
        Don't have an account? Register
      </a>
    </div>
  );
}
