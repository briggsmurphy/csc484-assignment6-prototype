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

  function handleCreatePost(post) {
    setPosts([post, ...posts]);
    setActivePage("Social");
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
          onMakePost={() => setActivePage("MakePost")}
        />
      )}

      {activePage === "MakePost" && (
        <MakePost
          onBack={() => setActivePage("Social")}
          onCreatePost={handleCreatePost}
        />
      )}

      {activePage === "Leaderboard" && (
        <Leaderboard
          groups={groups}
          setGroups={setGroups}
        />
      )}

      {activePage === "Profile" && <Profile />}

      <Navbar setActivePage={setActivePage} />
    </>
  );
}

export default App;
