import { useEffect, useState } from "react";

export default function Portfolio() {
  const [workouts, setWorkouts] = useState(null);
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };
    fetchWorkouts();
  }, []);
  return (
    <div className="container justify-center items-center flex">
      {workouts &&
        workouts.map((work) => {
          return <li key={work._id}>{work.title}</li>;
        })}
    </div>
  );
}
