import circle from "../assets/figma/add-workout-circle.svg";
import verticalLine from "../assets/figma/add-workout-line-vertical.svg";
import horizontalLine from "../assets/figma/add-workout-line-horizontal.svg";
import "./AddWorkoutButton.css";

function AddWorkoutButton({ onClick }) {
  return (
    <button className="add-workout-button" onClick={onClick}>
      <span className="add-workout-button__icon">
        <img src={circle} alt="" />
        <span className="add-workout-button__line rotated-line">
          <img src={verticalLine} alt="" />
        </span>
        <img className="add-workout-button__line" src={horizontalLine} alt="" />
      </span>
      ADD WORKOUT
    </button>
  );
}

export default AddWorkoutButton;
