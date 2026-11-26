import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ConfirmModal from "../components/ConfirmModal";
import avatar from "../assets/figma/avatar.svg";
import "../styles/Leaderboard.css";
import "../styles/Social.css";

const stats = [
  { label: "Points", value: "97,045" },
  { label: "Streak", value: "10" },
  { label: "Rank", value: "3" },
];

const users = [
  { id: 1, name: "Laleina", points: 200000, isFriend: true },
  { id: 2, name: "Mookie", points: 100110, isFriend: false },
  { id: 3, name: "Shohei", points: 97045, isFriend: true, isCurrentUser: true },
  { id: 4, name: "Haixin", points: 97001, isFriend: true },
  { id: 5, name: "Jonathan", points: 85000, isFriend: true },
  { id: 6, name: "Briggs", points: 82000, isFriend: true },
];

const friends = [5, 6, 4, 3].map((id) =>
  users.find((user) => user.id === id)
);

function Leaderboard({
  groups,
  activeTab,
  setActiveTab,
  filterBy,
  setFilterBy,
  currentUserId,
  onCreateGroup,
  onDeleteGroup,
}) {
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [searchUser, setSearchUser] = useState("");
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [searchFriends, setSearchFriends] = useState("");
  const [selectedFriendIds, setSelectedFriendIds] = useState([]);
  const [openGroupMenu, setOpenGroupMenu] = useState(false);
  const [showDeleteGroup, setShowDeleteGroup] = useState(false);

  const selectedGroup = groups.find(
    (group) => group.id === selectedGroupId
  );

  const filterGroup = groups.find(
    (group) => `group-${group.id}` === filterBy
  );

  const filteredUsers = users.filter((user) => {
    if (filterBy === "Friends" && !user.isFriend) {
      return false;
    }

    if (filterGroup && !filterGroup.members.includes(user.id)) {
      return false;
    }

    return user.name.toLowerCase().includes(searchUser.toLowerCase());
  });

  const rankedUsers = [...filteredUsers].sort(
    (a, b) => b.points - a.points
  );

  const groupUsers = selectedGroup
    ? users
        .filter((user) => selectedGroup.members.includes(user.id))
        .sort((a, b) => b.points - a.points)
    : [];

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchFriends.toLowerCase())
  );

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
      creatorId: currentUserId,
      members: [currentUserId, ...selectedFriendIds],
    };

    onCreateGroup(newGroup);

    setGroupName("");
    setSearchFriends("");
    setSelectedFriendIds([]);
    setIsCreatingGroup(false);
  }

  function handleCancelGroup() {
    setGroupName("");
    setSearchFriends("");
    setSelectedFriendIds([]);
    setIsCreatingGroup(false);
  }

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
                setSelectedGroupId(null);
                setOpenGroupMenu(false);
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
                setSelectedGroupId(null);
                setOpenGroupMenu(false);
              }}
            >
              My Groups
            </button>
          </div>
        )}

        {isCreatingGroup ? (
          <form
            className="social__create-group"
            onSubmit={handleCreateGroup}
          >
            <h2>Create a Group</h2>

            <label htmlFor="leaderboard-group-name">Group Name</label>
            <input
              id="leaderboard-group-name"
              className="social__group-name-input"
              type="text"
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
              required
            />

            <label htmlFor="leaderboard-friend-search">Add Friends</label>
            <div className="social__friend-search">
              <input
                id="leaderboard-friend-search"
                type="search"
                placeholder="Search friends..."
                value={searchFriends}
                onChange={(event) => setSearchFriends(event.target.value)}
              />
              <span>⌕</span>
            </div>

            <div className="social__friend-list">
              {filteredFriends.map((friend) => (
                <label className="social__friend" key={friend.id}>
                  <img src={avatar} alt="" />

                  <span>
                    {friend.name}
                    {friend.isCurrentUser ? " (You)" : ""}
                  </span>

                  <input
                    type="checkbox"
                    checked={
                      friend.id === currentUserId ||
                      selectedFriendIds.includes(friend.id)
                    }
                    disabled={friend.id === currentUserId}
                    onChange={() => handleFriendToggle(friend.id)}
                  />
                </label>
              ))}

              {filteredFriends.length === 0 && (
                <p className="social__empty">No friends found.</p>
              )}
            </div>

            <button className="social__create-submit" type="submit">
              Create Group
            </button>

            <button
              className="social__cancel"
              type="button"
              onClick={handleCancelGroup}
            >
              Cancel
            </button>
          </form>
        ) : activeTab === "Global" ? (
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
            >
              <option value="Cal Poly Students">Cal Poly Students</option>
              <option value="Friends">Friends</option>

              {groups.map((group) => (
                <option key={group.id} value={`group-${group.id}`}>
                  {group.name}
                </option>
              ))}
            </select>

            <input
              className="leaderboard__search"
              type="search"
              placeholder="Search users..."
              value={searchUser}
              onChange={(event) => setSearchUser(event.target.value)}
              aria-label="Search leaderboard users"
            />

            {rankedUsers.length > 0 ? (
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
            ) : (
              <p className="leaderboard__empty">
                No users found. Try another name.
              </p>
            )}
          </>
        ) : (
          <div className="leaderboard__group-section">
            {!selectedGroup ? (
              <div className="social__groups">
                <div className="social__groups-header">
                  <h2>My Groups</h2>
                  <button
                    className="social__create-group-button"
                    onClick={() => setIsCreatingGroup(true)}
                  >
                    + Create Group
                  </button>
                </div>

                {groups.length === 0 ? (
                  <p className="leaderboard__empty">
                    You haven't created any groups yet.
                  </p>
                ) : (
                  <div className="social__group-list">
                    {groups.map((group) => (
                      <button
                        className="social__group-item"
                        key={group.id}
                        onClick={() => setSelectedGroupId(group.id)}
                      >
                        <div>
                          <h3>{group.name}</h3>
                          <p>{group.members.length} members</p>
                        </div>
                        <span className="social__group-arrow">›</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="leaderboard__group-ranking">
                <button
                  onClick={() => {
                    setSelectedGroupId(null);
                    setOpenGroupMenu(false);
                  }}
                >
                  ← Back to Groups
                </button>

                <div className="social__groups-header">
                  <h2>{selectedGroup.name}</h2>

                  {selectedGroup.creatorId === currentUserId && (
                    <div className="social__member-menu">
                      <button
                        className="social__menu-button"
                        type="button"
                        aria-label="Group options"
                        aria-expanded={openGroupMenu}
                        onClick={() => setOpenGroupMenu(!openGroupMenu)}
                      >
                        ⋯
                      </button>

                      {openGroupMenu && (
                        <div className="social__menu">
                          <button
                            type="button"
                            onClick={() => {
                              setOpenGroupMenu(false);
                              setShowDeleteGroup(true);
                            }}
                          >
                            Delete Group
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

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
      </div>

      {showDeleteGroup && selectedGroup && (
        <ConfirmModal
          title="Delete Group?"
          message={`Are you sure you want to delete ${selectedGroup.name}?`}
          confirmText="Delete"
          onConfirm={() => {
            onDeleteGroup(selectedGroup.id);
            setSelectedGroupId(null);
            setShowDeleteGroup(false);
          }}
          onCancel={() => setShowDeleteGroup(false)}
        />
      )}
    </main>
  );
}

export default Leaderboard;