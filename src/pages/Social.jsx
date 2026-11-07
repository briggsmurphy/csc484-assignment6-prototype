import PageHeader from "../components/PageHeader";
import SocialPost from "../components/SocialPost";
import plusIcon from "../assets/figma/plus.svg";
import "../styles/Social.css";

function Social({ posts, onMakePost }) {
  return (
    <main className="page">
      <PageHeader
        title="Social Feed"
        action={
          <button
            className="social__new-post"
            aria-label="Make a post"
            onClick={onMakePost}
          >
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