import "./AddWorkoutButton.css";

function AddWorkoutButton({ onClick }) {
  return (
    <button
      className="add-workout-button"
      onClick={onClick}
      type="button"
    >
      <span className="add-workout-button__icon" aria-hidden="true">
        +
      </span>
      Add Workout
    </button>
  );
}

export default AddWorkoutButton;