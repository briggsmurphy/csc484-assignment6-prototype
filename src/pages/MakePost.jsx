import { useState } from "react";
import "../styles/MakePost.css";

function MakePost({ groups, initialGroupId, onBack, onCreatePost }) {
  const [activity, setActivity] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [photo, setPhoto] = useState(null);
  const [audience, setAudience] = useState(
    initialGroupId ? String(initialGroupId) : "everyone"
  );

  function handleSubmit(event) {
    event.preventDefault();

    const newPost = {
      id: Date.now(),
      author: "Shohei",
      rank: 17,
      title: title,
      caption: caption,
      time: "Just now",
      location: "",
      hasPhoto: Boolean(photo),
      photoUrl: photo ? URL.createObjectURL(photo) : null,
      activity: activity,
      duration: duration ? `${duration} min` : "",
      calories: calories ? `${calories} kcal` : "",
      points: duration ? Math.floor(Number(duration) / 5) : null,
      groupId: audience === "everyone" ? null : Number(audience),
    };

    onCreatePost(newPost);
  }

  return (
    <main className="page make-post">
      <header className="make-post__header">
        <button
          className="make-post__back"
          onClick={onBack}
          aria-label="Go back"
        >
          ←
        </button>
        <h1>Make Post</h1>
      </header>

      <form className="make-post__form" onSubmit={handleSubmit}>
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

<<<<<<< Updated upstream
        <input
          type="text"
          placeholder="Add title..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <textarea
          placeholder="Add caption..."
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
        />

        <label className="make-post__photo">
=======
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
>>>>>>> Stashed changes
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setPhoto(event.target.files[0])}
          />
          {photo ? (
            <span>{photo.name}</span>
          ) : (
            <>
              <span className="make-post__camera">📷</span>
              <span>Add Photo(s)</span>
            </>
          )}
        </label>

<<<<<<< Updated upstream
=======
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

            {photo ? (
              <img
                className="make-post__preview"
                src={URL.createObjectURL(photo)}
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

>>>>>>> Stashed changes
        <button className="make-post__submit" type="submit">
          Post
        </button>
      </form>
    </main>
  );
}

export default MakePost;