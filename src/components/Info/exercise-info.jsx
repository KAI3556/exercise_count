import styles from './exercise-info.module.css'

export const ExerciseInfo = ({ exercise, onClose }) => {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.bottomSheet} onClick={e => e.stopPropagation()}>
                <div className={styles.sheetHandle} />
                <h2 className={styles.sheetTitle}>{exercise.name}</h2>

                {exercise.img && (
                    <img src={exercise.img} className={styles.sheetImg} alt={exercise.name} />
                )}

                <p className={styles.sheetLabel}>INSTRUCTIONS</p>
                <p className={styles.sheetText}>{exercise.instructions}</p>

                <p className={styles.sheetLabel}>BENEFITS</p>
                <p className={styles.sheetText}>{exercise.benefits}</p>

                <button className={styles.sheetClose} onClick={onClose}>Đóng</button>
            </div>
        </div>
    )
}