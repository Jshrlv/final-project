import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{ background: "#222", color: "white", padding: "15px", textAlign: "center" }}>
      <h1>Simple Company</h1>
      <nav>
        <Link to="/" style={{ color: "white", margin: "0 15px", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/form" style={{ color: "white", margin: "0 15px", textDecoration: "none" }}>
          Form
        </Link>
      </nav>
    </header>
  );
}

export default Header;