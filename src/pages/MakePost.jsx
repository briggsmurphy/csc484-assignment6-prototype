
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import "../styles/MakePost.css";

// Reads "45 min", "1h" or "1h 31m" as a number of minutes for the input.
function toMinutes(text) {
  if (!text) return "";
  const hours = Number(text.match(/(\d+)h/)?.[1] || 0);
  const minutes = Number(text.match(/(\d+) ?m/)?.[1] || 0);
  return String(hours * 60 + minutes);
}

function MakePost({
  groups,
  initialGroupId,
  post,
  onBack,
  onCreatePost,
  onUpdatePost,
}) {
  const [activity, setActivity] = useState(post?.activity || "");
  const [title, setTitle] = useState(post?.title || "");
  const [caption, setCaption] = useState(post?.caption || "");
  const [duration, setDuration] = useState(toMinutes(post?.duration));
  const [calories, setCalories] = useState(post?.calories?.split(" ")[0] || "");
  const [photo, setPhoto] = useState(null);
  const [audience, setAudience] = useState(() => {
    const groupId = post ? post.groupId : initialGroupId;
    // A deleted group has no option in the list, so fall back to everyone.
    return groups.some((group) => group.id === groupId)
      ? String(groupId)
      : "everyone";
  });
  const photoPreview = photo ? URL.createObjectURL(photo) : post?.photoUrl;

  function handleSubmit(event) {
    event.preventDefault();

    const fields = {
      title: title,
      caption: caption,
      hasPhoto: Boolean(photoPreview),
      photoUrl: photoPreview || null,
      activity: activity,
      duration: duration ? `${duration} min` : "",
      calories: calories ? `${calories} kcal` : "",
      points: duration ? Math.floor(Number(duration) / 5) : null,
      groupId: audience === "everyone" ? null : Number(audience),
    };

    if (post) {
      // An untouched duration keeps its original text and points.
      const unchanged = duration === toMinutes(post.duration);
      onUpdatePost({
        ...post,
        ...fields,
        ...(unchanged && { duration: post.duration, points: post.points }),
      });
      return;
    }

    onCreatePost({
      ...fields,
      id: Date.now(),
      author: "Shohei",
      rank: 17,
      time: "Just now",
      location: "",
    });
  }

  return (
    <main className="page make-post">
      <PageHeader
        title={post ? "Edit Post" : "Make Post"}
        action={
          <button
            className="make-post__back"
            onClick={onBack}
            aria-label="Go back"
          >
            ←
          </button>
        }
      />

      <form className="make-post__form" onSubmit={handleSubmit}>
        <label className="make-post__field">
          <span>Activity</span>
          <select
            value={activity}
            onChange={(event) => setActivity(event.target.value)}
            required
          >
            <option value="">Select Workout</option>
            <option value="strength training">Strength Training</option>
            <option value="running">Running</option>
            <option value="sports">Sports</option>
            <option value="cycling">Cycling</option>
            <option value="walking">Walking</option>
          </select>
        </label>

        <label className="make-post__field">
          <span>Audience</span>
          <select
            value={audience}
            onChange={(event) => setAudience(event.target.value)}
          >
            <option value="everyone">Everyone</option>
            {groups.map((group) => (
              <option key={group.id} value={String(group.id)}>
                {group.name}
              </option>
            ))}
          </select>
        </label>

        <label className="make-post__field">
          <span>Title</span>
          <input
            type="text"
            placeholder="Add title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>

        <label className="make-post__field">
          <span>Caption</span>
          <textarea
            placeholder="Add caption..."
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
          />
        </label>

        <label className="make-post__field">
          <span>Duration (minutes) - Optional</span>
          <input
            type="number"
            min="1"
            placeholder="Example: 45"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
          />
        </label>

        <label className="make-post__field">
          <span>Calories (kcal) - Optional</span>
          <input
            type="number"
            min="0"
            placeholder="Example: 320"
            value={calories}
            onChange={(event) => setCalories(event.target.value)}
          />
        </label>

        <div className="make-post__field">
          <span>Photo</span>
          <label className="make-post__photo">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setPhoto(event.target.files[0] || null)}
            />

            {photoPreview ? (
              <img
                className="make-post__preview"
                src={photoPreview}
                alt="Selected workout"
              />
            ) : (
              <>
                <span className="make-post__camera">📷</span>
                <span>Add Photo(s)</span>
              </>
            )}
          </label>
        </div>

        <button className="make-post__submit" type="submit">
          {post ? "Save Changes" : "Post"}
        </button>
      </form>
    </main>
  );
}

export default MakePost;
