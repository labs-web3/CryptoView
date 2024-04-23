export default function WorkoutDetails({ workout }) {
  return (
    <div className="container justify-center items-center flex flex-col">
      <h4 className="font-bold">{workout.title}</h4>
      <p className="font-bold">Load (kg): {workout.load}</p>
      <p className="font-bold">Reps: {workout.reps}</p>
      <p>{workout.createdAt}</p>
    </div>
  );
}
