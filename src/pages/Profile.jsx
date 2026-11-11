// Profile.jsx
import PageHeader from "../components/PageHeader";
import profileImage from "../assets/figma/profile-circle.svg";
import "../styles/Profile.css";

function Profile() {
  function handleLogout() {
    alert("Log out is not available in this prototype.");
  }

  return (
    <main className="page">
      <PageHeader title="Profile" />

      <div className="profile">
        <img
          className="profile__image"
          src={profileImage}
          alt="Profile"
        />

        <h2 className="profile__name">Shohei</h2>

        <button
          className="profile__logout"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </main>
  );
}

export default Profile;