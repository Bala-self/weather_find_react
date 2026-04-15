import Nav from "./nav";
import Home from "./home";
import Footer from "./footer";

function Fullmain() {
  return (
    <div className="page-root">
      <Nav />
      <Home />
      <Footer />
    </div>
  );
}

export default Fullmain;