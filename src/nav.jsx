import { Link, useNavigate } from "react-router-dom";
import { useDataStore } from "./data_store";

function Nav() {
  const { logoutUser } = useDataStore();
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/");
  }

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-header">
          <h1 className="nav-title">Weather App</h1>
        </div>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/home" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">Contact</a>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={handleLogout}
              style={{ background: "none", border: "none", cursor: "pointer" }}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;