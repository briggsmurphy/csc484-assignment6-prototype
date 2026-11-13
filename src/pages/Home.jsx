import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import AddWorkoutButton from "../components/AddWorkoutButton";
import "../styles/Home.css";

function Home() {
  const [showForm, setShowForm] = useState(false);

  // Load previously saved workouts when Home opens.
  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = sessionStorage.getItem("workouts");
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  });

  // Save workouts whenever the list changes.
  useEffect(() => {
    sessionStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  const [activity, setActivity] = useState("Strength Training");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [duration, setDuration] = useState("");

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

  return (
    <main className="page">
      <PageHeader title="Workout History" />

      <div className="home__add-workout">
        <AddWorkoutButton onClick={() => setShowForm(!showForm)} />
      </div>

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
        </form>
      )}

      <div className="workout-history">
        {workouts.map((workout) => (
          <div className="workout-history__item" key={workout.id}>
            <h3>{workout.activity}</h3>
            <p>{workout.date}</p>
            <p>{workout.duration} minutes</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
