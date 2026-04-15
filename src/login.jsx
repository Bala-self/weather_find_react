import { useState, useContext } from "react";
import { DataStoreContext } from "./data_store";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./nav";
import Footer from "./footer";

function Login() {
  const { loginUser, log_user, setLog_user } = useContext(DataStoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      setLog_user("Please fill in all fields");
    } else {
      loginUser(email, password);
      setTimeout(() => {
        navigate("/home");
      }, 600);
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
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </section>

        <section className="message">
          <p className="status">{log_user}</p>
        </section>

        <p className="alt-link">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Login;