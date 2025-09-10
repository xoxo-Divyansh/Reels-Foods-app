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
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
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
