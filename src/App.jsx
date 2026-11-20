
import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Social from "./pages/Social";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import MakePost from "./pages/MakePost";

const startingPosts = [
  {
    id: 1,
    author: "Shohei",
    authorId: 1,
    rank: 17,
    title: "Chest Day",
    caption: "",
    time: "Today at 12:09 AM",
    location: "Rec Center",
    hasPhoto: true,
    activity: "strength training",
    duration: "1h 31m",
    calories: "500 kcal",
    points: 20,
  },
  {
    id: 2,
    author: "Mookie",
    authorId: 2,
    rank: 50,
    title: "IM Soccer Game",
    caption: "",
    time: "Yesterday at 7:30 PM",
    location: "Lower Sports Field",
    hasPhoto: false,
    activity: "sports",
    duration: "1h",
    calories: "500 kcal",
    points: 50,
  },
];

function App() {
  const [activePage, setActivePage] = useState("Home");
  const [posts, setPosts] = useState(startingPosts);
  const [workouts, setWorkouts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [postGroupId, setPostGroupId] = useState(null);
  const [leaderboardTab, setLeaderboardTab] = useState("Global");
  const [filterBy, setFilterBy] = useState("Cal Poly Students");

  const [currentUser, setCurrentUser] = useState({
    id: 3,
    name: "Shohei",
    school: "Cal Poly",
  });

  function handleCreatePost(post) {
    const newPost = {
      ...post,
      author: currentUser.name,
      authorId: currentUser.id,
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setActivePage("Social");
  }

  function handleDeletePost(postId) {
    setPosts((currentPosts) =>
      currentPosts.filter(
        (post) => post.id !== postId || post.authorId !== currentUser.id
      )
    );
  }

  function handleCreateGroup(newGroup) {
    setGroups((currentGroups) => [...currentGroups, newGroup]);
  }

  function handleRemoveGroupMember(groupId, memberId) {
    setGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              members: group.members.filter((id) => id !== memberId),
            }
          : group
      )
    );
  }

  function handleUpdateProfile(updatedProfile) {
    setCurrentUser((currentUser) => ({
      ...currentUser,
      ...updatedProfile,
    }));

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.authorId === currentUser.id
          ? { ...post, author: updatedProfile.name }
          : post
      )
    );
  }

  function handleMakePost(groupId = null) {
    setPostGroupId(groupId);
    setActivePage("MakePost");
  }

  return (
    <>
      {activePage === "Home" && (
        <Home
          workouts={workouts}
          setWorkouts={setWorkouts}
        />
      )}

      {activePage === "Social" && (
        <Social
          posts={posts}
          groups={groups}
          selectedGroupId={selectedGroupId}
          currentUserId={currentUser.id}
          onSelectGroup={setSelectedGroupId}
          onBackToGroups={() => setSelectedGroupId(null)}
          onMakePost={handleMakePost}
          onCreateGroup={handleCreateGroup}
          onDeletePost={handleDeletePost}
          onRemoveGroupMember={handleRemoveGroupMember}
        />
      )}

      {activePage === "MakePost" && (
        <MakePost
          groups={groups}
          initialGroupId={postGroupId}
          onBack={() => setActivePage("Social")}
          onCreatePost={handleCreatePost}
        />
      )}

      {activePage === "Leaderboard" && (
        <Leaderboard
          groups={groups}
          activeTab={leaderboardTab}
          setActiveTab={setLeaderboardTab}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
        />
      )}

      {activePage === "Profile" && (
        <Profile
          currentUser={currentUser}
          onUpdateProfile={handleUpdateProfile}
          posts={posts}
          workouts={workouts}
          groups={groups}
        />
      )}

      <Navbar
        activePage={activePage === "MakePost" ? "Social" : activePage}
        setActivePage={setActivePage}
      />
    </>
  );
}

export default App;
