import React from "react";
import "../../styles/Footer.css";

const links = {
  lang: [
    "English(US)",
    "עברית",
    "العربية",
    "Русский",
    "Français(France)",
    "Español",
    "ภาษาไทย",
    "Deutsch",
    "Português (Brasil)",
    "Italiano",
    "हिन्दी",
  ],
  links: [
    "Sign Up",
    "Log In",
    "Messenger ",
    "Facebook Lite",
    "Watch",
    "Places",
    "Games",
    "Marketplace",
    "Facebook Pay",
    "Oculus",
    "Portal",
    "Instagram",
    "Bulletin",
    "Local",
    "Fundraisers",
    "Services",
    "Voting Information Center",
    "Groups",
    "About",
    "Create Ad",
    "Create Page",
    "Developers",
    "Careers",
    "Privacy",
    "Cookies",
    "Ad choices",
    "Terms",
    "Help",
    "Contact Uploading & Non-Users",
  ],
};

function Footer() {
  return (
    <div className="footer-container">
      <div className="upper-foot">
        <p>
          {links.lang.map((item) => {
            return (
              <a className="lang" href="#">
                {item}
              </a>
            );
          })}
          <button>+</button>
        </p>
        <hr />
      </div>
      <div className="bottom-foot">
        {links.links.map((item) => {
          return (
            <a className="links" href="#">
              {item}
            </a>
          );
        })}
      </div>
      <p>FakeMeta @2022</p>
    </div>
  );
}

export default Footer;
