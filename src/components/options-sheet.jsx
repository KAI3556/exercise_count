import styles from "../workout/workout-screen.module.css";

const DELAY_OPTIONS = [0, 5, 10, 15, 20, 25, 30]

export const OptionsSheet = ({ soundOn, onToggleSound, delay, onSetDelay, onClose }) => {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.bottomSheet} onClick={e => e.stopPropagation()}>
                <div className={styles.sheetHandle} />
                <h2 className={styles.sheetTitle}>Options</h2>

                <p className={styles.sheetLabel}>SOUND</p>
                <div className={styles.optionRow}>
                    <span className={styles.optionText}>Play a sound at the end of each exercise</span>
                    <div
                        className={`${styles.toggle} ${soundOn ? styles.toggleOn : ''}`}
                        onClick={onToggleSound}
                    >
                        <div className={styles.toggleThumb} />
                    </div>
                </div>

                <p className={styles.sheetLabel}>TIMER DELAY</p>
                <p className={styles.optionText} style={{ marginBottom: 12 }}>
                    Add a delay to the end of each exercise
                </p>
                {DELAY_OPTIONS.map(sec => (
                    <button
                        key={sec}
                        className={`${styles.delayBtn} ${delay === sec ? styles.delayBtnActive : ''}`}
                        onClick={() => onSetDelay(sec)}
                    >
                        {sec === 0 ? 'Off' : `${sec} seconds`}
                    </button>
                ))}

                <button className={styles.sheetClose} onClick={onClose}>Đóng</button>
            </div>
        </div>
    )
};

