import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>Made with ❤ by PotterHead: {currentYear}</p>
    </footer>
  );
}

export default Footer;