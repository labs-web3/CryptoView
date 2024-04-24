import { useEffect, useState } from "react";
import WorkoutDetails from "@/components/WorkoutDetails";
import WorkoutForm from "@/components/WorkoutForm";

export default function Portfolio() {
  const [workouts, setWorkouts] = useState(null);
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:3001/api/workouts/");
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };
    fetchWorkouts();
  }, []);
  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-10 items-center h-full">
        <div className="col-span-1">
          {workouts &&
            workouts.map((work) => {
              return (
                <WorkoutDetails key={work._id} workout={work}></WorkoutDetails>
              );
            })}
        </div>
        <div className="col-span-1">
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
}
