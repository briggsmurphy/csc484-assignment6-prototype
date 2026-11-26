
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import profileCircle from "../assets/figma/profile-circle.svg";
import heartIcon from "../assets/figma/heart.svg";
import commentIcon from "../assets/figma/comment.svg";
import "./SocialPost.css";

function SocialPost({
  post,
  interaction,
  currentUserId,
  onDelete,
  onLike,
  onAddComment,
}) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const liked = (interaction?.likedBy || []).includes(currentUserId);
  const likeCount = interaction?.likes ?? post.likes ?? 0;
  const comments = interaction?.comments ?? post.comments ?? [];

  const canDelete = post.authorId === currentUserId;

  function handleLike() {
    onLike(post.id);
  }

  function handleComment(event) {
    event.preventDefault();

    if (newComment.trim() === "") {
      return;
    }

    onAddComment(post.id, newComment.trim());
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
