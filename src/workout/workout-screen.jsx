import { useState, useEffect, useRef } from "react";
import styles from "./workout-screen.module.css";
import {EXERCISES} from "./exercises.js";
import { CircleTimer }   from '../components/Circle_timer/circle-timer.jsx'
import { Controls }      from '../components/Control/controls.jsx'
import { ExerciseInfo }  from '../components/Info/exercise-info.jsx'
import { OptionsSheet }  from '../components/option/options-sheet.jsx'
import {UpNextCard} from "../components/next/up-next-card.jsx";

export const WorkoutScreen = (
    {
        index,

        onPrevExercise,
        nextExercise,
    }
) => {
    const [timeLeft, setTimeLeft] = useState(EXERCISES[index].duration);
    const [playing, setPlaying] = useState(false);
    const intervalRef           = useRef(null);

    const [showOptions, setShowOptions] = useState(false);
    const [soundOn, setSoundOn] = useState(true);

    const [isDelaying, setIsDelaying] = useState(false);
    const [delay, setDelay]             = useState(0);
    const [delayLeft, setDelayLeft] = useState(0);

    const [showInfo, setShowInfo] = useState(false);
    // const [showUpNext, setShowUpNext] = useState(false);
    const hasAutoAdvanced = useRef(false);

    const exercise = EXERCISES[index];
    const progress = timeLeft / exercise.duration;

    useEffect(() => {
        if (playing) {
            hasAutoAdvanced.current = false
            intervalRef.current = setInterval(() => {
                setTimeLeft(t => {
                    // if (t === 7 && index < nextExercise) {
                    //     setShowUpNext(true)
                    // }

                    if (t <= 1) {
                        clearInterval(intervalRef.current)
                        setTimeLeft(0);
                        // setShowUpNext(false)

                        if (soundOn) {
                            const ctx = new AudioContext()
                            const osc = ctx.createOscillator()
                            osc.connect(ctx.destination)
                            osc.frequency.value = 880
                            osc.start()
                            osc.stop(ctx.currentTime + 0.3)
                        }

                        setTimeout(() => {
                            if (delay > 0) {
                                setIsDelaying(true)
                                setDelayLeft(delay)
                                let countdown = delay
                                const delayInterval = setInterval(() => {
                                    countdown -= 1
                                    setDelayLeft(countdown)
                                    if (countdown <= 0) {
                                        clearInterval(delayInterval)
                                        setIsDelaying(false)
                                        setDelayLeft(0)
                                        setPlaying(false)
                                        nextExercise.activate()
                                    }
                                }, 1000)
                            } else {
                                setPlaying(false)
                                if (!hasAutoAdvanced.current) {
                                    hasAutoAdvanced.current = true
                                    nextExercise.activate()
                                }
                            }
                        }, 2000)

                        return 0
                    }
                    return t - 1
                })
            }, 1000)
        } else {
            clearInterval(intervalRef.current)
        }
        return () => clearInterval(intervalRef.current)
    }, [playing, soundOn, delay, index])

    const handleReset = () => {
        setPlaying(false)
        setTimeLeft(exercise.duration)
        // setShowUpNext(false)
        setIsDelaying(false)
        setDelayLeft(0)
    }

    return (
        <div className={styles.screen}>
            <div className={styles.header}>
                <button className={styles.headerBtn}>✕</button>
                <span className={styles.headerTitle}>{index + 1} of {EXERCISES.length}</span>
                <button className={styles.headerBtn} onClick={() => setShowOptions(true)}>•••</button>
            </div>

            <div className="line1">

                <CircleTimer
                    exercise={exercise}
                    progress={progress}
                    // showUpNext={showUpNext}
                    // nextExercise={nextExercise}
                    onReset={handleReset}
                />

            </div>
            <div className={styles.exerciseName}>
                <span>{exercise.name}</span>
                <button className={styles.infoBtn} onClick={() => setShowInfo(true)}>ⓘ</button>
            </div>
            <div className={styles.timer}>
                {(()=>{

                    const mm = String(Math.floor(timeLeft / 60)).padStart(1, '0');
                    const ss = String(timeLeft % 60).padStart(2, '0');

                    return mm + ":" + ss;
                })()}
            </div>

            {isDelaying && (
                <div className={styles.delayBadge}>
                    Nghỉ {delayLeft}s...
                </div>
            )}

            <Controls
                playing={playing}
                onPlayPause={() => setPlaying(p => !p)}
                onPrev={onPrevExercise}
                onNext={nextExercise?.activate}
                hasNext={!!nextExercise}
            />

            {showInfo && (
                <ExerciseInfo
                    exercise={exercise}
                    onClose={() => setShowInfo(false)}
                />
            )}

            {showOptions && (
                <OptionsSheet
                    soundOn={soundOn}
                    onToggleSound={() => setSoundOn(s => !s)}
                    delay={delay}
                    onSetDelay={setDelay}
                    onClose={() => setShowOptions(false)}
                />
            )}

            {(timeLeft <= 6 && timeLeft >= 3) && nextExercise && (
                <UpNextCard nextExercise={nextExercise} />
            )}
        </div>
    )
};
