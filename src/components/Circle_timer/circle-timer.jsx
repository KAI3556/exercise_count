import styles from './circle-timer.module.css'
import { UpNextCard } from './resetFloatBtn/up-next-card.jsx'

export const CircleTimer = ({ exercise, progress, showUpNext, nextExercise, onReset }) => {
    const R          = 110
    const CIRC       = 2 * Math.PI * R
    const dashOffset = CIRC * (1 - progress)

    return (
        <div className={styles.circleWrap}>
            <svg width="260" height="260" viewBox="0 0 260 260">
                <circle cx="130" cy="130" r={R} fill="none" stroke="#e0e0e0" strokeWidth="10"/>
                <circle
                    cx="130" cy="130" r={R}
                    fill="none" stroke="#FF9900" strokeWidth="10"
                    strokeDasharray={CIRC} strokeDashoffset={dashOffset}
                    strokeLinecap="round" transform="rotate(-90 130 130)"
                    style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                />
                <circle cx="130" cy="130" r="100" fill={exercise.color}/>
            </svg>

            {exercise.img
                ? <img src={exercise.img} className={styles.circleEmoji} alt={exercise.name} />
                : <div></div>
            }

            {showUpNext && nextExercise && (
                <UpNextCard nextExercise={nextExercise} />
            )}

            <button className={styles.resetFloatBtn} onClick={onReset} title="Reset">⇄</button>
        </div>
    )
}