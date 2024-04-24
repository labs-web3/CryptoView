export default function WorkoutDetails({ workout }) {
  return (
    <>
      <h4 className="font-bold">{workout.title}</h4>
      <p className="font-bold">Load (kg): {workout.load}</p>
      <p className="font-bold">Reps: {workout.reps}</p>
      <p>{workout.createdAt}</p>
    </>
  );
}
