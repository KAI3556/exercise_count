import styles from './up-next-card.module.css'

export const UpNextCard = ({ nextExercise }) => {
    return (
        <div className={styles.upNextCard}>
            <div className={styles.upNextImgWrap} style={{ background: nextExercise.color }}>
                {nextExercise.img
                    ? <img src={nextExercise.img} className={styles.upNextImg} alt="" />
                    : <div className={styles.upNextImgFallback}></div>
                }
            </div>
            <span className={styles.upNextLabel}>Up Next</span>
        </div>
    )
}