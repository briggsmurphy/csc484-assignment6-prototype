
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import profileImage from "../assets/figma/profile-circle.svg";
import "../styles/Profile.css";

function Profile({ currentUser, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);

  function handleSave(event) {
    event.preventDefault();

    if (name.trim() === "") {
      return;
    }

    onUpdateProfile({ name: name.trim() });
    setIsEditing(false);
  }

  function handleCancel() {
    setName(currentUser.name);
    setIsEditing(false);
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

        {isEditing ? (
          <form className="profile__edit-form" onSubmit={handleSave}>
            <label htmlFor="profile-name">Display Name</label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            <div className="profile__edit-buttons">
              <button className="profile__save" type="submit">
                Save
              </button>

              <button
                className="profile__cancel"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h2 className="profile__name">{currentUser.name}</h2>
            <p className="profile__school">{currentUser.school}</p>

            <button
              className="profile__edit"
              onClick={() => {
                setName(currentUser.name);
                setIsEditing(true);
              }}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default Profile;
