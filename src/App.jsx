import { useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Social from "./pages/Social";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";

function App() {
  const [activePage, setActivePage] = useState("Home");

  return (
    <>
      {activePage === "Home" && <Home />}
      {activePage === "Social" && <Social />}
      {activePage === "Leaderboard" && <Leaderboard />}
      {activePage === "Profile" && <Profile />}

      <Navbar activePage={activePage} setActivePage={setActivePage} />
    </>
  );
}

export default App;
