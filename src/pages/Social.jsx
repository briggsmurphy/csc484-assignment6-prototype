//Social.jsx
import PageHeader from "../components/PageHeader";
import SocialPost from "../components/SocialPost";
import plusIcon from "../assets/figma/plus.svg";
import "../styles/Social.css";

const posts = [
  {
    id: 1,
    author: "Shohei",
    rank: 17,
    title: "Chest Day",
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
    time: "Yesterday at 7:30 PM",
    location: "Lower Sports Field",
    hasPhoto: false,
    activity: "sports",
    duration: "1h",
    calories: "500 kcal",
    points: 50,
  },
];

function Social() {
  return (
    <main className="page">
      <PageHeader
        title="Social Feed"
        action={
          <button className="social__new-post" aria-label="Make a post">
            <img src={plusIcon} alt="" />
          </button>
        }
      />
      <div className="social__feed">
        {posts.map((post) => (
          <SocialPost key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}

export default Social;
