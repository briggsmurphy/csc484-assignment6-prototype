//Home.jsx
import PageHeader from "../components/PageHeader";
import AddWorkoutButton from "../components/AddWorkoutButton";
import "../styles/Home.css";

function Home() {
  return (
    <main className="page">
      <PageHeader title="Workout History" />
      <div className="home__add-workout">
        <AddWorkoutButton />
      </div>
    </main>
  );
}

export default Home;
