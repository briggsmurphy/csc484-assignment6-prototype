
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import SocialPost from "../components/SocialPost";
import ConfirmModal from "../components/ConfirmModal";
import plusIcon from "../assets/figma/plus.svg";
import avatar from "../assets/figma/avatar.svg";
import "../styles/Social.css";

const users = [
  { id: 1, name: "Laleina", points: 200000, isFriend: true },
  { id: 2, name: "Mookie", points: 100110, isFriend: false },
  { id: 3, name: "Shohei", fullName: "Shohei", points: 97045, isFriend: true, isCurrentUser: true },
  { id: 4, name: "Haixin", points: 97001, isFriend: true },
  { id: 5, name: "Jonathan", points: 85000, isFriend: true },
  { id: 6, name: "Briggs", points: 82000, isFriend: true },
];

const friends = [5, 6, 4, 3].map((id) =>
  users.find((user) => user.id === id)
);

function Social({
  posts,
  postInteractions,
  groups,
  selectedGroupId,
  onSelectGroup,
  onBackToGroups,
  onMakePost,
  onCreateGroup,
  onEditPost,
  onDeletePost,
  onLikePost,
  onAddComment,
  onRemoveGroupMember,
  onDeleteGroup,
  currentUserId,
}) {
  const [activeTab, setActiveTab] = useState("Global");
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [searchFriends, setSearchFriends] = useState("");
  const [searchUsers, setSearchUsers] = useState("");
  const [selectedFriendIds, setSelectedFriendIds] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [openMemberMenuId, setOpenMemberMenuId] = useState(null);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [openGroupMenu, setOpenGroupMenu] = useState(false);
  const [showDeleteGroup, setShowDeleteGroup] = useState(false);

  const selectedGroup = groups.find(
    (group) => group.id === selectedGroupId
  );

  function handleTabChange(tab) {
    setActiveTab(tab);
    setIsCreatingGroup(false);
    setOpenGroupMenu(false);
    onBackToGroups();
  }

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

  function handleRemoveMember(memberId) {
    setMemberToRemove(memberId);
    setOpenMemberMenuId(null);
  }

  function confirmRemoveMember() {
    if (memberToRemove !== null && selectedGroup) {
      onRemoveGroupMember(selectedGroup.id, memberToRemove);
    }

    setMemberToRemove(null);
  }

  const memberToRemoveInfo = users.find(
    (user) => user.id === memberToRemove
  );

  const memberToRemoveName = memberToRemoveInfo
    ? memberToRemoveInfo.fullName || memberToRemoveInfo.name
    : "this member";

  const filteredFriends = friends.filter((friend) =>
    (friend.fullName || friend.name)
      .toLowerCase()
      .includes(searchFriends.toLowerCase())
  );

  const groupPosts = posts.filter(
    (post) => post.groupId === selectedGroupId
  );

  const filters = [
    "All",
    "Strength",
    "Running",
    "Sports",
    "Cycling",
    "Walking",
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesUser = post.author
      ?.toLowerCase()
      .includes(searchUsers.toLowerCase());

    if (activeFilter === "All") {
      return matchesUser;
    }

    const activity = post.activity?.toLowerCase();
    const selectedActivity =
      activeFilter === "Strength"
        ? "strength training"
        : activeFilter.toLowerCase();

    return matchesUser && activity === selectedActivity;
  });

  return (
    <main className="page">
      <PageHeader
        title={selectedGroup ? selectedGroup.name : "Social Feed"}
        action={
          !isCreatingGroup && !selectedGroup && (
            <button
              className="social__new-post"
              aria-label="Make a post"
              onClick={() => onMakePost(null)}
            >
              <img src={plusIcon} alt="" />
            </button>
          )
        }
      />

      <div className="social">
        {!selectedGroup && !isCreatingGroup && (
          <div className="social__tabs">
            <button
              className={
                activeTab === "Global"
                  ? "social__tab social__tab--active"
                  : "social__tab"
              }
              onClick={() => handleTabChange("Global")}
            >
              Global
            </button>

            <button
              className={
                activeTab === "My Groups"
                  ? "social__tab social__tab--active"
                  : "social__tab"
              }
              onClick={() => handleTabChange("My Groups")}
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

            <label htmlFor="group-name">Group Name</label>
            <input
              id="group-name"
              className="social__group-name-input"
              type="text"
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
              required
            />

            <label htmlFor="friend-search">Add Friends</label>
            <div className="social__friend-search">
              <input
                id="friend-search"
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
                    {friend.fullName || friend.name}
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
        ) : selectedGroup ? (
          <>
            <button
              className="social__back"
              onClick={() => {
                setOpenGroupMenu(false);
                onBackToGroups();
              }}
            >
              ← Back to My Groups
            </button>

            <section className="social__group-details">
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

              <p>{selectedGroup.members.length} members</p>

              <div className="social__members">
                {selectedGroup.members.map((memberId) => {
                  const member = users.find(
                    (user) => user.id === memberId
                  );

                  const isCreator =
                    selectedGroup.creatorId === currentUserId;

                  const canRemove =
                    isCreator && memberId !== selectedGroup.creatorId;

                  return (
                    <div className="social__member" key={memberId}>
                      <img src={avatar} alt="" />

                      <span>
                        {member
                          ? member.fullName || member.name
                          : "Member"}
                        {memberId === selectedGroup.creatorId && " (Creator)"}
                      </span>

                      {canRemove && (
                        <div className="social__member-menu">
                          <button
                            className="social__menu-button"
                            type="button"
                            aria-label="Member options"
                            aria-expanded={openMemberMenuId === memberId}
                            onClick={() =>
                              setOpenMemberMenuId(
                                openMemberMenuId === memberId
                                  ? null
                                  : memberId
                              )
                            }
                          >
                            ⋯
                          </button>

                          {openMemberMenuId === memberId && (
                            <div className="social__menu">
                              <button
                                type="button"
                                onClick={() => handleRemoveMember(memberId)}
                              >
                                Remove Member
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                className="social__group-post-button"
                onClick={() => onMakePost(selectedGroup.id)}
              >
                + Make a Post to This Group
              </button>
            </section>

            <section className="social__feed">
              <h2 className="social__feed-title">Group Posts</h2>

              {groupPosts.map((post) => (
                <SocialPost
                  key={post.id}
                  post={post}
                  interaction={postInteractions[post.id]}
                  currentUserId={currentUserId}
                  onEdit={onEditPost}
                  onDelete={onDeletePost}
                  onLike={onLikePost}
                  onAddComment={onAddComment}
                />
              ))}

              {groupPosts.length === 0 && (
                <p className="social__empty">
                  No posts in this group yet. Make the first post!
                </p>
              )}
            </section>
          </>
        ) : activeTab === "Global" ? (
          <>
            <section className="social__intro">
              <h2>Community Feed</h2>
              <p>See what other Cal Poly students are doing.</p>
            </section>

            <section className="social__search">
              <input
                type="search"
                placeholder="Search users..."
                value={searchUsers}
                onChange={(event) => setSearchUsers(event.target.value)}
                aria-label="Search posts by user"
              />
            </section>

            <section className="social__filters">
              <h3>Explore workouts</h3>

              <div className="social__filter-list">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className={
                      activeFilter === filter
                        ? "social__filter social__filter--active"
                        : "social__filter"
                    }
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={activeFilter === filter}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </section>

            <section className="social__feed">
              <h2 className="social__feed-title">Recent Posts</h2>

              {filteredPosts.map((post) => (
                <SocialPost
                  key={post.id}
                  post={post}
                  interaction={postInteractions[post.id]}
                  currentUserId={currentUserId}
                  onEdit={onEditPost}
                  onDelete={onDeletePost}
                  onLike={onLikePost}
                  onAddComment={onAddComment}
                />
              ))}

              {filteredPosts.length === 0 && (
                <p className="social__empty">
                  No posts found. Try another name or workout type.
                </p>
              )}
            </section>
          </>
        ) : (
          <section className="social__groups">
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
              <p className="social__empty">
                You haven't created any groups yet.
              </p>
            ) : (
              <div className="social__group-list">
                {groups.map((group) => (
                  <button
                    className="social__group-item"
                    key={group.id}
                    onClick={() => onSelectGroup(group.id)}
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
          </section>
        )}
      </div>

      {showDeleteGroup && selectedGroup && (
        <ConfirmModal
          title="Delete Group?"
          message={`Are you sure you want to delete ${selectedGroup.name}?`}
          confirmText="Delete"
          onConfirm={() => {
            onDeleteGroup(selectedGroup.id);
            setShowDeleteGroup(false);
          }}
          onCancel={() => setShowDeleteGroup(false)}
        />
      )}

      {memberToRemove !== null && (
        <ConfirmModal
          title="Remove Group Member?"
          message={`Are you sure you want to remove ${memberToRemoveName} from this group?`}
          confirmText="Remove"
          onConfirm={confirmRemoveMember}
          onCancel={() => setMemberToRemove(null)}
        />
      )}
    </main>
  );
}

export default Social;
