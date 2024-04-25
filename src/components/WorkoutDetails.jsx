import { Button } from "./ui/button";
import useWorkouts from "@/zustand/workouts";

export default function WorkoutDetails({ workout }) {
  const removeWorkout = useWorkouts((state) => state.removeWorkout);
  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:3001/api/workouts/" + workout._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      removeWorkout(json._id);
    }
  };
  return (
    <div className="bg-slate-200 shadow-lg my-5 p-5">
      <div className="flex justify-end">
        <Button onClick={handleClick}>Delete</Button>
      </div>
      <h4 className="font-bold">{workout.title}</h4>
      <p className="font-bold">Load (kg): {workout.load}</p>
      <p className="font-bold">Reps: {workout.reps}</p>
      <p>{workout.createdAt}</p>
    </div>
  );
}
