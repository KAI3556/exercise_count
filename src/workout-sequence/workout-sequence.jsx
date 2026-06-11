import {useState} from "react";
import {WorkoutScreen} from "../workout/workout-screen.jsx";
import {EXERCISES} from "../workout/exercises.js";

export const WorkoutSequence = () => {
    const [index, setIndex]     = useState(1);

    return (
        <WorkoutScreen key={index} {...{
            index,

            ...index > 0 && {
                onPrevExercise: () => setIndex(index - 1),
            },
            ...index < EXERCISES.length - 1 && {
                nextExercise: {
                    color: EXERCISES[index+1].color,
                    img: EXERCISES[index+1].img,
                    activate: () => setIndex(index + 1),
                },
                // onNextExercise: () => setIndex(index + 1),
            },
        }}/>
    );
};

