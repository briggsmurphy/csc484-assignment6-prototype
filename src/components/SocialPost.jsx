import profileCircle from "../assets/figma/profile-circle.svg";
import heartIcon from "../assets/figma/heart.svg";
import commentIcon from "../assets/figma/comment.svg";
import dividerHorizontal from "../assets/figma/post-divider-horizontal.svg";
import dividerVertical from "../assets/figma/post-divider-vertical.svg";
import "./SocialPost.css";

function Stat({ label, value }) {
  return (
    <div className="social-post__stat">
      <p>{label}</p>
      <p className="social-post__stat-value">{value}</p>
    </div>
  );
}

function StatDivider() {
  return (
    <span className="social-post__stat-divider rotated-line">
      <img src={dividerVertical} alt="" />
    </span>
  );
}

function SocialPost({ post }) {
  return (
    <article className="social-post">
      <div className="social-post__author">
        <img src={profileCircle} alt="" />
        <h2 className="social-post__name">{post.author}</h2>
        <span className="social-post__rank">#{post.rank}</span>
      </div>

      <h3 className="social-post__title">{post.title}</h3>
      <p className="social-post__meta">
        {post.time} | {post.location}
      </p>

      {post.hasPhoto && <div className="social-post__photo" />}

      <div className="social-post__stats">
        <div className="social-post__stat-row">
          <Stat label="activity" value={post.activity} />
          <StatDivider />
          <Stat label="duration" value={post.duration} />
        </div>
        <img className="social-post__stats-line" src={dividerHorizontal} alt="" />
        <div className="social-post__stat-row">
          <Stat label="calories burned" value={post.calories} />
          <StatDivider />
          <Stat label="points earned" value={post.points} />
        </div>
      </div>

      <div className="social-post__actions">
        <button className="social-post__like" aria-label="Like">
          <img src={heartIcon} alt="" />
        </button>
        <button aria-label="Comment">
          <img src={commentIcon} alt="" />
        </button>
      </div>
    </article>
  );
}

export default SocialPost;
