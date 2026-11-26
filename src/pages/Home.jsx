import { useState } from "react";
import PageHeader from "../components/PageHeader";
import AddWorkoutButton from "../components/AddWorkoutButton";
import ConfirmModal from "../components/ConfirmModal";
import "../styles/Home.css";

function Home({ workouts, setWorkouts }) {
  const [showForm, setShowForm] = useState(false);
  const [activity, setActivity] = useState("Strength Training");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [duration, setDuration] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);

  function handleSave(event) {
    event.preventDefault();

    const newWorkout = {
      id: Date.now(),
      activity,
      date,
      duration,
    };

    setWorkouts([...workouts, newWorkout]);
    setShowForm(false);
    setDuration("");
  }

  function handleDeleteWorkout(workoutId) {
    setWorkoutToDelete(workoutId);
    setOpenMenuId(null);
  }

  function confirmDeleteWorkout() {
    if (workoutToDelete !== null) {
      setWorkouts((currentWorkouts) =>
        currentWorkouts.filter((workout) => workout.id !== workoutToDelete)
      );
    }

    setWorkoutToDelete(null);
  }

  return (
    <main className="page">
      <PageHeader title="Workout History" />

      {!showForm && (
        <div className="home__add-workout">
          <AddWorkoutButton onClick={() => setShowForm(true)} />
        </div>
      )}

      {showForm && (
        <form className="workout-form" onSubmit={handleSave}>
          <h2>Add Workout</h2>

          <label>Activity</label>
          <select
            value={activity}
            onChange={(event) => setActivity(event.target.value)}
          >
            <option>Strength Training</option>
            <option>Running</option>
            <option>Sports</option>
            <option>Cycling</option>
            <option>Walking</option>
          </select>

          <label>Workout Date</label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />

          <label>Duration (minutes)</label>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            placeholder="Example: 60"
            required
          />

          <button type="submit">Save Workout</button>

          <button
            className="workout-form__cancel"
            type="button"
            onClick={() => {
              setShowForm(false);
              setDuration("");
            }}
          >
            Cancel
          </button>
        </form>
      )}

      <div className="workout-history">
        {workouts.map((workout) => (
          <div className="workout-history__item" key={workout.id}>
            <div className="workout-history__menu-container">
              <button
                className="workout-history__menu-button"
                type="button"
                aria-label={`Options for ${workout.activity} workout`}
                aria-expanded={openMenuId === workout.id}
                onClick={() =>
                  setOpenMenuId(
                    openMenuId === workout.id ? null : workout.id
                  )
                }
              >
                ⋯
              </button>

              {openMenuId === workout.id && (
                <div className="workout-history__menu">
                  <button
                    type="button"
                    onClick={() => handleDeleteWorkout(workout.id)}
                  >
                    Delete Workout
                  </button>
                </div>
              )}
            </div>

            <h3>{workout.activity}</h3>
            <p>{workout.date}</p>
            <p>{workout.duration} minutes</p>
          </div>
        ))}
      </div>

      {workoutToDelete !== null && (
        <ConfirmModal
          title="Delete Workout?"
          message="Are you sure you want to delete this workout?"
          confirmText="Delete"
          onConfirm={confirmDeleteWorkout}
          onCancel={() => setWorkoutToDelete(null)}
        />
      )}
    </main>
  );
}

export default Home;