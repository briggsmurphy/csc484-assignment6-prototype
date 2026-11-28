import homeIcon from "../assets/figma/nav-home.svg";
import socialIcon from "../assets/figma/nav-social.svg";
import leaderboardIcon from "../assets/figma/nav-leaderboard.svg";
import profileIcon from "../assets/figma/nav-profile.svg";
import "./Navbar.css";

const tabs = [
  { page: "Home", icon: homeIcon },
  { page: "Social", icon: socialIcon },
  { page: "Leaderboard", icon: leaderboardIcon },
  { page: "Profile", icon: profileIcon },
];

function Navbar({ activePage, setActivePage }) {
  return (
    <nav className="navbar">
      {tabs.map(({ page, icon }) => (
        <button
          key={page}
          className={page === activePage ? "navbar__tab navbar__tab--active" : "navbar__tab"}
          aria-current={page === activePage ? "page" : undefined}
          onClick={() => setActivePage(page)}
        >
          <span className="navbar__icon">
            <img src={icon} alt="" />
          </span>
          {page}
        </button>
      ))}
    </nav>
  );
}

export default Navbar;
