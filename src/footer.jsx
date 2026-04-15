function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-text">© {year} Weather App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;