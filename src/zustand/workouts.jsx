import { create } from "zustand";

const useWorkouts = create((set) => ({
  workouts: [],
  setWorkouts: (newWorkouts) => set({ workouts: newWorkouts }),
  addWorkout: (newWorkout) =>
    set((state) => ({ workouts: [newWorkout, ...state.workouts] })),
  removeWorkout: (workoutId) =>
    set((state) => ({
      workouts: state.workouts.filter((workout) => workout._id !== workoutId),
    })),
}));

export default useWorkouts;
