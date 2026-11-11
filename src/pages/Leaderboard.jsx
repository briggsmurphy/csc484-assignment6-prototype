
import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import avatar from "../assets/figma/avatar.svg";
import caretDown from "../assets/figma/caret-down.svg";
import "../styles/Leaderboard.css";

const stats = [
  { label: "Points", value: "97,045" },
  { label: "Streak", value: "10" },
  { label: "Rank", value: "3" },
];

// Sample users and their points
const users = [
  { id: 1, name: "Laleina", points: 200000, isFriend: true },
  { id: 2, name: "James", points: 100110, isFriend: false },
  { id: 3, name: "You", fullName: "James Oden", points: 97045, isFriend: true, isCurrentUser: true },
  { id: 4, name: "Haixin", points: 97001, isFriend: true },
  { id: 5, name: "Jonathan", points: 85000, isFriend: true },
  { id: 6, name: "Briggs", points: 82000, isFriend: true },
];

const friends = [5, 6, 4, 3].map((id) =>
  users.find((user) => user.id === id)
);

function Leaderboard() {
  const [activeTab, setActiveTab] = useState("Global");
  const [filterBy, setFilterBy] = useState("Cal Poly Students");
  const [groups, setGroups] = useState(() => {
  const savedGroups = sessionStorage.getItem("leaderboardGroups");
  return savedGroups ? JSON.parse(savedGroups) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("leaderboardGroups", JSON.stringify(groups));
  }, [groups]);

  const [selectedGroup, setSelectedGroup] = useState(null);

  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [searchFriends, setSearchFriends] = useState("");
  const [selectedFriendIds, setSelectedFriendIds] = useState([]);

  function handleFriendToggle(friendId) {
    if (selectedFriendIds.includes(friendId)) {
      setSelectedFriendIds(
        selectedFriendIds.filter((id) => id !== friendId)
      );
    } else {
      setSelectedFriendIds([...selectedFriendIds, friendId]);
    }
  }

  function handleCreateGroup(event) {
    event.preventDefault();

    const newGroup = {
      id: Date.now(),
      name: groupName.trim(),
      members: [3, ...selectedFriendIds],
    };

    setGroups([...groups, newGroup]);

    // Automatically show the new group in the leaderboard filter
    setFilterBy(`group-${newGroup.id}`);
    setActiveTab("Global");

    setGroupName("");
    setSearchFriends("");
    setSelectedFriendIds([]);
    setIsCreatingGroup(false);
    setSelectedGroup(null);
  }

  // Find the group selected in the leaderboard filter
  const filterGroup = groups.find(
    (group) => `group-${group.id}` === filterBy
  );

  // Filter the users
  const filteredUsers = users.filter((user) => {
    if (filterBy === "Friends") {
      return user.isFriend;
    }

    if (filterGroup) {
      return filterGroup.members.includes(user.id);
    }

    return true;
  });

  // Sort users from highest points to lowest
  const rankedUsers = [...filteredUsers].sort(
    (a, b) => b.points - a.points
  );

  // Get members of a selected group
  const groupUsers = selectedGroup
    ? users
        .filter((user) => selectedGroup.members.includes(user.id))
        .sort((a, b) => b.points - a.points)
    : [];

  // Search friends by name
const filteredFriends = friends.filter((friend) =>
  (friend.fullName || friend.name)
    .toLowerCase()
    .includes(searchFriends.toLowerCase())
);

  return (
    <main className="page">
      <PageHeader title="Leaderboard" />

      <div className="leaderboard">
        {!isCreatingGroup && (
          <div className="leaderboard__tabs">
            <button
              className={
                activeTab === "Global"
                  ? "leaderboard__tab leaderboard__tab--active"
                  : "leaderboard__tab"
              }
              onClick={() => {
                setActiveTab("Global");
                setSelectedGroup(null);
              }}
            >
              Global
            </button>

            <button
              className={
                activeTab === "Groups"
                  ? "leaderboard__tab leaderboard__tab--active"
                  : "leaderboard__tab"
              }
              onClick={() => {
                setActiveTab("Groups");
                setSelectedGroup(null);
              }}
            >
              My Groups
            </button>
          </div>
        )}

        {activeTab === "Global" && !isCreatingGroup && (
          <>
            <div className="leaderboard__stats">
              {stats.map(({ label, value }) => (
                <div key={label} className="leaderboard__stat">
                  <p>{label}</p>
                  <p className="leaderboard__stat-value">{value}</p>
                </div>
              ))}
            </div>

            <p className="leaderboard__filter-label">Filter by</p>

            <select
              className="leaderboard__filter"
              value={filterBy}
              onChange={(event) => setFilterBy(event.target.value)}
              style={{
                backgroundImage: `url(${caretDown})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                backgroundSize: "16px",
              }}
            >
              <option value="Cal Poly Students">Cal Poly Students</option>
              <option value="Friends">Friends</option>

              {groups.map((group) => (
                <option key={group.id} value={`group-${group.id}`}>
                  {group.name}
                </option>
              ))}
            </select>

            <ol className="leaderboard__list">
              {rankedUsers.map((user, index) => (
                <li
                  key={user.id}
                  className={
                    user.isCurrentUser
                      ? "leaderboard__row leaderboard__row--you"
                      : "leaderboard__row"
                  }
                >
                  <span className="leaderboard__rank">{index + 1}</span>
                  <img src={avatar} alt="" />
                  <div>
                    <p>{user.name}</p>
                    <p>{user.points.toLocaleString()} pts</p>
                  </div>
                </li>
              ))}
            </ol>
          </>
        )}

        {activeTab === "Groups" && !isCreatingGroup && (
          <div className="leaderboard__group-section">
            {!selectedGroup ? (
              <>
                <button
                  className="leaderboard__create-group"
                  onClick={() => setIsCreatingGroup(true)}
                >
                  + Create a Group
                </button>

                <div className="leaderboard__groups">
                  <p className="leaderboard__groups-title">Your Groups</p>

                  {groups.length === 0 ? (
                    <p className="leaderboard__empty">
                      You haven't created any groups yet.
                    </p>
                  ) : (
                    groups.map((group) => (
                      <button
                        className="leaderboard__group-item"
                        key={group.id}
                        onClick={() => setSelectedGroup(group)}
                      >
                        {group.name}
                      </button>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="leaderboard__group-ranking">
                <button onClick={() => setSelectedGroup(null)}>
                  ← Back to Groups
                </button>

                <h2>{selectedGroup.name}</h2>
                <p className="leaderboard__groups-title">
                  Group Rankings
                </p>

                <ol className="leaderboard__list">
                  {groupUsers.map((user, index) => (
                    <li
                      key={user.id}
                      className={
                        user.isCurrentUser
                          ? "leaderboard__row leaderboard__row--you"
                          : "leaderboard__row"
                      }
                    >
                      <span className="leaderboard__rank">{index + 1}</span>
                      <img src={avatar} alt="" />
                      <div>
                        <p>{user.name}</p>
                        <p>{user.points.toLocaleString()} pts</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

        {isCreatingGroup && (
          <form
            className="leaderboard__create-screen"
            onSubmit={handleCreateGroup}
          >
            <label htmlFor="group-name">Group Name</label>

            <input
              id="group-name"
              className="leaderboard__group-name-input"
              type="text"
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
              required
            />

            <label htmlFor="friend-search">Add Friends</label>

            <div className="leaderboard__friend-search">
              <input
                id="friend-search"
                type="search"
                placeholder="Search friends..."
                value={searchFriends}
                onChange={(event) => setSearchFriends(event.target.value)}
              />
              <span>⌕</span>
            </div>

            <div className="leaderboard__friend-list">
              {filteredFriends.map((friend) => (
                <label
                  className="leaderboard__friend"
                  key={friend.id}
                >
                  <img src={avatar} alt="" />

                  <span>
                    {friend.fullName || friend.name}
                    {friend.isCurrentUser ? " (You)" : ""}
                  </span>

                  <input
                    type="checkbox"
                    checked={
                      friend.isCurrentUser ||
                      selectedFriendIds.includes(friend.id)
                    }
                    disabled={friend.isCurrentUser}
                    onChange={() => handleFriendToggle(friend.id)}
                  />
                </label>
              ))}

              {filteredFriends.length === 0 && (
                <p className="leaderboard__empty">
                  No friends found.
                </p>
              )}
            </div>

            <button
              className="leaderboard__create-submit"
              type="submit"
            >
              Create Group
            </button>

            <button
              className="leaderboard__cancel"
              type="button"
              onClick={() => {
                setIsCreatingGroup(false);
                setGroupName("");
                setSearchFriends("");
                setSelectedFriendIds([]);
              }}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

export default Leaderboard;
