import React from "react";
import { Footer } from "flowbite-react";

const FooterBar = () => {
  return (
    <Footer>
      <div className="flex w-full justify-between p-6">
        <Footer.Copyright by="354 Range Squadron" href="#" year={2020} />
        <Footer.LinkGroup>
          {/* <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link> */}
        </Footer.LinkGroup>
      </div>
    </Footer>
  );
};

export default FooterBar;
