import { create } from "zustand";

const useWorkouts = create((set) => ({
  workouts: [],
  setWorkouts: (newWorkouts) => set({ workouts: newWorkouts }),
  addWorkout: (newWorkout) =>
    set((state) => ({ workouts: [newWorkout, ...state.workouts] })),
}));

export default useWorkouts;
