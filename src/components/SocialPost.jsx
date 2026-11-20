
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import profileCircle from "../assets/figma/profile-circle.svg";
import heartIcon from "../assets/figma/heart.svg";
import commentIcon from "../assets/figma/comment.svg";
import "./SocialPost.css";

function SocialPost({ post, currentUserId, onDelete }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const canDelete = post.authorId === currentUserId;

  function handleLike() {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }

    setLiked(!liked);
  }

  function handleComment(event) {
    event.preventDefault();

    if (newComment.trim() === "") {
      return;
    }

    setComments([...comments, newComment.trim()]);
    setNewComment("");
  }

  function handleDelete() {
    if (canDelete) {
      onDelete(post.id);
    }

    setShowDeleteModal(false);
  }

  return (
    <article className="social-post">
      <div className="social-post__author">
        <img src={profileCircle} alt="" />

        <div className="social-post__author-info">
          <h2 className="social-post__name">{post.author}</h2>
          <p className="social-post__meta">
            #{post.rank} · {post.time}
          </p>
        </div>

        {canDelete && (
          <div className="social-post__menu-container">
            <button
              className="social-post__menu-button"
              onClick={() => setShowMenu(!showMenu)}
              aria-label="Post options"
              aria-expanded={showMenu}
              type="button"
            >
              ⋯
            </button>

            {showMenu && (
              <div className="social-post__menu">
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>

<<<<<<< Updated upstream
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
=======
      <div className="social-post__content">
        <div className="social-post__activity-row">
          <span className="social-post__activity">{post.activity}</span>
        </div>

        <div className="social-post__details">
          <h3 className="social-post__title">{post.title}</h3>

          {post.caption && (
            <p className="social-post__caption">{post.caption}</p>
          )}

          {post.location && (
            <p className="social-post__location">{post.location}</p>
          )}
        </div>

        {post.hasPhoto && post.photoUrl && (
          <img
            className="social-post__photo"
            src={post.photoUrl}
            alt="Workout"
          />
        )}

        {(post.duration || post.calories || post.points != null) && (
          <div className="social-post__stats">
            {post.duration && (
              <div className="social-post__stat">
                <strong>{post.duration}</strong>
                <span>Duration</span>
              </div>
            )}

            {post.calories && (
              <div className="social-post__stat">
                <strong>{post.calories}</strong>
                <span>Calories</span>
              </div>
            )}

            {post.points != null && (
              <div className="social-post__stat">
                <strong>{post.points}</strong>
                <span>Points earned</span>
              </div>
            )}
          </div>
        )}
>>>>>>> Stashed changes
      </div>

      <div className="social-post__actions">
        <button
          className={
            liked
              ? "social-post__like social-post__like--active"
              : "social-post__like"
          }
          onClick={handleLike}
          aria-label={liked ? "Unlike post" : "Like post"}
          aria-pressed={liked}
          type="button"
        >
          <img src={heartIcon} alt="" />
          <span>{likeCount} Likes</span>
        </button>

        <button
          className="social-post__comment-button"
          onClick={() => setShowComments(!showComments)}
          aria-label="Show comments"
          aria-expanded={showComments}
          type="button"
        >
          <img src={commentIcon} alt="" />
          <span>{comments.length} Comments</span>
        </button>
      </div>

      {showComments && (
        <div className="social-post__comments">
          <h3>Comments</h3>

          {comments.length === 0 && (
            <p className="social-post__no-comments">No comments yet.</p>
          )}

          {comments.map((comment, index) => (
            <p className="social-post__comment" key={index}>
              <strong>You:</strong> {comment}
            </p>
          ))}

          <form
            className="social-post__comment-form"
            onSubmit={handleComment}
          >
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
            />
            <button type="submit">Post</button>
          </form>
        </div>
      )}

      {showDeleteModal && (
        <ConfirmModal
          title="Delete Post?"
          message="Are you sure you want to delete this post? This action cannot be undone."
          confirmText="Delete"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </article>
  );
}

export default SocialPost;
