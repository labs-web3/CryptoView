import { useEffect } from "react";
import WorkoutDetails from "@/components/WorkoutDetails";
import WorkoutForm from "@/components/WorkoutForm";
import useWorkouts from "@/zustand/workouts";

export default function Portfolio() {
  // Utilisez la décomposition pour obtenir workouts et setWorkouts depuis le store
  const { workouts, setWorkouts } = useWorkouts();
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:3001/api/workouts/");
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json); // Utilisez setWorkouts pour mettre à jour l'état
      }
    };

    fetchWorkouts();
  }, [setWorkouts]); // Ajoutez setWorkouts comme dépendance pour assurer la mise à jour si nécessaire
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
