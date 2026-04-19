import { useState } from "react";
import { useDataStore } from "./data_store";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./nav";
import Footer from "./footer";

function Login() {
  const { loginUser, loginMessage, clearLoginMessage } = useDataStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    clearLoginMessage();
    setLoading(true);

    const success = await loginUser(email, password);

    setLoading(false);
    if (success) {
      navigate("/home");
    }
  }

  return (
    <div className="page-root">
      <Nav />
      <main className="login-container">
        <header className="form-header">
          <h2>Login</h2>
        </header>

        <section className="form-section">
          <form onSubmit={handleLogin} className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="form-input"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="form-input"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </section>

        {loginMessage && (
          <section className="message">
            <p className="status">{loginMessage}</p>
          </section>
        )}

        <p className="alt-link">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Login;