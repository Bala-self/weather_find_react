import { useState } from "react";
import { useDataStore } from "./data_store"; 
import { Link, useNavigate } from "react-router-dom";
import Nav from "./nav";
import Footer from "./footer";

function Signup() {
  const { signupUser, signupMessage, clearSignupMessage } = useDataStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    clearSignupMessage();
    setLoading(true);

    const success = await signupUser(name, email, password);

    setLoading(false);
    if (success) {
      navigate("/");
    }
  }

  return (
    <div className="page-root">
      <Nav />
      <main className="signup-container">
        <header className="form-header">
          <h2>Signup</h2>
        </header>

        <section className="form-section">
          <form onSubmit={handleSignup} className="form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                className="form-input"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              {loading ? "Creating account..." : "Signup"}
            </button>
          </form>
        </section>

        {signupMessage && (
          <section className="message">
            <p className="status">{signupMessage}</p>
          </section>
        )}

        <p className="alt-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Signup;