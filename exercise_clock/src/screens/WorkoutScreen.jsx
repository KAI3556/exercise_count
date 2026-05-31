import { useState, useEffect, useRef } from 'react'
import styles from './WorkoutScreen.module.css'

const EXERCISES = [
    { id: 1, name: 'Overhead Tricep', emoji: '🙆', duration: 28, color: '#2d6a4f' },
    { id: 2, name: 'Bicep Curl',      emoji: '💪', duration: 30, color: '#1d3557' },
    { id: 3, name: 'Shoulder Press',  emoji: '🏋️', duration: 25, color: '#6d2b3d' },
    { id: 4, name: 'Squat Hold',      emoji: '🧎', duration: 40, color: '#4a3728' },
    { id: 5, name: 'Plank',           emoji: '🤸', duration: 45, color: '#1b4332' },
]

export default function WorkoutScreen() {
    const [index, setIndex]     = useState(0)
    const [timeLeft, setTimeLeft] = useState(EXERCISES[0].duration)
    const [playing, setPlaying] = useState(false)
    const intervalRef           = useRef(null)

    const exercise = EXERCISES[index]
    const progress = timeLeft / exercise.duration

    useEffect(() => {
        if (playing) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(t => {
                    if (t <= 1) {
                        clearInterval(intervalRef.current)
                        setPlaying(false)
                        return 0
                    }
                    return t - 1
                })
            }, 1000)
        } else {
            clearInterval(intervalRef.current)
        }
        return () => clearInterval(intervalRef.current)
    }, [playing])

    useEffect(() => {
        setTimeLeft(exercise.duration)
        setPlaying(false)
    }, [index])

    const handlePrev = () => setIndex(i => Math.max(0, i - 1))
    const handleNext = () => setIndex(i => Math.min(EXERCISES.length - 1, i + 1))

    const R         = 110
    const CIRC      = 2 * Math.PI * R
    const dashOffset = CIRC * (1 - progress)

    const mm = String(Math.floor(timeLeft / 60)).padStart(1, '0')
    const ss = String(timeLeft % 60).padStart(2, '0')

    return (
        <div className={styles.screen}>
            <div className={styles.header}>
                <button className={styles.headerBtn}>✕</button>
                <span className={styles.headerTitle}>{index + 1} of {EXERCISES.length}</span>
                <button className={styles.headerBtn}>•••</button>
            </div>
            <div className={styles.circleWrap}>
                <svg width="260" height="260" viewBox="0 0 260 260">
                    <circle cx="130" cy="130" r={R} fill="none" stroke="#e0e0e0" strokeWidth="10"/>
                    <circle
                        cx="130" cy="130" r={R}
                        fill="none"
                        stroke="#0099FF"
                        strokeWidth="10"
                        strokeDasharray={CIRC}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        transform="rotate(-90 130 130)"
                        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                    />
                    <circle cx="130" cy="130" r="100" fill={exercise.color}/>
                </svg>
                <div className={styles.circleEmoji}>{exercise.emoji}</div>

                <button
                    className={styles.resetFloatBtn}
                    onClick={() => { setPlaying(false); setTimeLeft(exercise.duration) }}
                    title="Reset"
                >
                    ⇄
                </button>
            </div>
            <div className={styles.exerciseName}>
                <span>{exercise.name}</span>
                <button className={styles.infoBtn}>ⓘ</button>
            </div>
            <div className={styles.timer}>
                {mm}:{ss}
            </div>
            <div className={styles.controls}>
                <button className={styles.ctrlBtn} onClick={handlePrev} disabled={index === 0}>
                    ⏮
                </button>
                <button
                    className={`${styles.ctrlBtn} ${styles.ctrlBtnPlay}`}
                    onClick={() => setPlaying(p => !p)}
                >
                    {playing ? '⏸' : '▶'}
                </button>
                <button className={styles.ctrlBtn} onClick={handleNext} disabled={index === EXERCISES.length - 1}>
                    ⏭
                </button>
            </div>
        </div>
    )
}