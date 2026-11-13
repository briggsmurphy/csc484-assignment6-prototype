
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import "../styles/MakePost.css";

function MakePost({ onBack, onCreatePost }) {
  const [activity, setActivity] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const newPost = {
      id: Date.now(),
      author: "Shohei",
      rank: 17,
      title: title,
      caption: caption,
      time: "Just now",
      location: "Cal Poly",
      hasPhoto: Boolean(photo),
      photoUrl: photo ? URL.createObjectURL(photo) : null,
      activity: activity,
      duration: "—",
      calories: "—",
      points: 0,
    };

    onCreatePost(newPost);
  }

  return (
    <main className="page make-post">
      <PageHeader
        title="Make Post"
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

        <button className="make-post__submit" type="submit">
          Post
        </button>
      </form>
    </main>
  );
}

export default MakePost;
