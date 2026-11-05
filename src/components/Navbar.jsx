import groupIcon from "../assets/group_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import homeIcon from "../assets/home_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 (1).svg";
import personIcon from "../assets/person_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import trophyIcon from "../assets/trophy_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import "./Navbar.css";

function Navbar({ setActivePage }) {
  return (
    <nav className="navbar">
      <button onClick={() => setActivePage("Home")}>
        <img src={homeIcon} alt="" />
        Home
      </button>

      <button onClick={() => setActivePage("Social")}>
        <img src={groupIcon} alt="" />
        Social
      </button>

      <button onClick={() => setActivePage("Leaderboard")}>
        <img src={trophyIcon} alt="" />
        Leaderboard
      </button>

      <button onClick={() => setActivePage("Profile")}>
        <img src={personIcon} alt="" />
        Profile
      </button>
    </nav>
  );
}

export default Navbar;