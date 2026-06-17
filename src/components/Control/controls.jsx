import styles from './controls.module.css'

export const Controls = ({ playing, onPlayPause, onPrev, onNext, hasNext }) => {
    return (
        <div className={styles.controls}>
            <button
                className={styles.ctrlBtn}
                onClick={onPrev}
                disabled={!onPrev}
            >
                ⏮
            </button>

            <button
                className={`${styles.ctrlBtn} ${styles.ctrlBtnPlay}`}
                onClick={onPlayPause}
            >
                {playing ? '⏸' : '▶'}
            </button>

            <button
                className={styles.ctrlBtn}
                onClick={onNext}
                disabled={!hasNext}
            >
                ⏭
            </button>
        </div>
    )
}