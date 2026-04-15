import { useState, useContext } from "react";
import { DataStoreContext } from "./data_store";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./footer";
import Nav from "./nav";

function Signup() {
  const { signupUser, signup_user, setSignup_user } = useContext(DataStoreContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      setSignup_user("Please fill in all fields");
      return;
    }

    signupUser(name, email, password);
    setTimeout(() => {
      navigate("/");
    }, 700);
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
                onChange={e => setName(e.target.value)}
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

            <button type="submit" className="btn btn-primary">Signup</button>
          </form>
        </section>

        <section className="message">
          <p className="status">{signup_user}</p>
        </section>

        <p className="alt-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Signup;