import "../App.css";

export default function UserLogin() {
  return (
    <div className="auth-container">
      <div className="auth-title">User Login</div>
      <a
        className="auth-link"
        href="/food-partner/login"
      >
        Switch to Food Partner
      </a>
      <form className="auth-form">
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
  );
}
