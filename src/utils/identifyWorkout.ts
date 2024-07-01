import { Workout, Workout_Source, Workout_Status } from "hexis/generated/graphql";

const identifyWorkout: Function = () => {
  const isPlannedWorkout: Function = (workout: Workout): boolean => {
    if (!workout) return false;
    // planned workout sources
    if (workout?.source === Workout_Source.User || workout?.source === Workout_Source.Coach) {
      return true;
    }
    if (workout?.source === Workout_Source.TrainingPeaks && workout?.confirmed === false) {
      return true;
    }
    return false;
  };

  const isActualWorkout: Function = (workout: Workout): boolean => {
    if (!workout) return false;
    return !isPlannedWorkout(workout);
  };

  const isCompletedWorkout: Function = (workout: Workout): boolean => {
    if (!workout) return false;
    if (isActualWorkout(workout) && workout?.status !== Workout_Status.Incomplete) return true;
    return false;
  };

  const isIncompletedWorkout: Function = (workout: Workout): boolean => {
    if (!workout) return false;
    return (
      workout?.status === Workout_Status.Incomplete &&
      !(workout?.source === Workout_Source.User || workout?.source === Workout_Source.Coach)
    );
  };

  const isWearableWorkout: Function = (workout: Workout): boolean => {
    const notWearableSources = [Workout_Source.User, Workout_Source.Coach];
    return !workout?.source || !notWearableSources.includes(workout?.source);
  };
  return {
    isPlannedWorkout,
    isActualWorkout,
    isIncompletedWorkout,
    isCompletedWorkout,
    isWearableWorkout,
  };
};

export default identifyWorkout;
