//Leaderboard.jsx
import PageHeader from "../components/PageHeader";
import avatar from "../assets/figma/avatar.svg";
import caretDown from "../assets/figma/caret-down.svg";
import "../styles/Leaderboard.css";

const stats = [
  { label: "Points", value: "97,045" },
  { label: "Streak", value: "10" },
  { label: "Rank", value: "3" },
];

const rankings = [
  { rank: 1, name: "Aidan Lui", points: "200,000 pts" },
  { rank: 2, name: "Laleina Mercado", points: "100,110 pts" },
  { rank: 3, name: "You", points: "97,045 points", isCurrentUser: true },
  { rank: 4, name: "Haixin Huang", points: "97,001 points" },
];

function Leaderboard() {
  return (
    <main className="page">
      <PageHeader title="Leaderboard" />
      <div className="leaderboard">
        <div className="leaderboard__stats">
          {stats.map(({ label, value }) => (
            <div key={label} className="leaderboard__stat">
              <p>{label}</p>
              <p className="leaderboard__stat-value">{value}</p>
            </div>
          ))}
        </div>

        <p className="leaderboard__filter-label">Filter by</p>
        <button className="leaderboard__filter">
          Cal Poly Students
          <img src={caretDown} alt="" />
        </button>

        <ol className="leaderboard__list">
          {rankings.map(({ rank, name, points, isCurrentUser }) => (
            <li
              key={rank}
              className={isCurrentUser ? "leaderboard__row leaderboard__row--you" : "leaderboard__row"}
            >
              <span className="leaderboard__rank">{rank}</span>
              <img src={avatar} alt="" />
              <div>
                <p>{name}</p>
                <p>{points}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}

export default Leaderboard;
