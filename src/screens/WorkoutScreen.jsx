import { useState, useEffect, useRef } from 'react'
import styles from './WorkoutScreen.module.css'
import img1 from '../images/over-head.webp'

const EXERCISES = [
    { id: 1, name: 'Overhead Tricep', img: img1, duration: 10, color: '#2d6a4f',
        instructions: 'Đứng thẳng, nâng một tay lên đầu, gập khuỷu tay ra sau đầu. Dùng tay kia giữ khuỷu tay và kéo nhẹ xuống. Giữ nguyên tư thế.',
        benefits: 'Tricep, Vai, Cánh tay sau' },

    { id: 2, name: 'Bicep Curl', img: null, duration: 30, color: '#1d3557',
        instructions: 'Đứng thẳng, giữ tạ ở hai tay. Từ từ nâng tạ lên về phía vai, giữ khuỷu tay sát người. Hạ xuống chậm rãi.',
        benefits: 'Bicep, Cẳng tay' },

    { id: 3, name: 'Shoulder Press', img: null, duration: 10, color: '#6d2b3d',
        instructions: 'Ngồi hoặc đứng thẳng lưng. Nâng tạ ngang vai, lòng bàn tay hướng ra ngoài. Đẩy thẳng lên trên rồi hạ xuống.',
        benefits: 'Vai, Tricep, Ngực trên' },

    { id: 4, name: 'Squat Hold', img: null, duration: 40, color: '#4a3728',
        instructions: 'Đứng chân rộng bằng vai. Hạ người xuống như ngồi ghế, đùi song song với sàn. Giữ nguyên tư thế trong suốt thời gian.',
        benefits: 'Đùi trước, Mông, Bắp chân' },

    { id: 5, name: 'Plank', img: null, duration: 45, color: '#1b4332',
        instructions: 'Nằm sấp, chống hai tay thẳng hoặc chống khuỷu tay. Nâng người lên tạo thành đường thẳng từ đầu đến gót chân. Giữ bụng căng.',
        benefits: 'Bụng, Lưng dưới, Vai, Core' },
]

export default function WorkoutScreen() {
    const [index, setIndex]     = useState(0)
    const [timeLeft, setTimeLeft] = useState(EXERCISES[0].duration)
    const [playing, setPlaying] = useState(false)
    const intervalRef           = useRef(null)

    const [showOptions, setShowOptions] = useState(false)
    const [soundOn, setSoundOn] = useState(true)

    const [isDelaying, setIsDelaying] = useState(false)
    const [delay, setDelay]             = useState(0)
    const [delayLeft, setDelayLeft] = useState(0)

    const [showInfo, setShowInfo] = useState(false)
    const [showReady, setShowReady] = useState(false)
    const [showUpNext, setShowUpNext] = useState(false)
    const hasAutoAdvanced = useRef(false)

    const exercise = EXERCISES[index]
    const progress = timeLeft / exercise.duration

    useEffect(() => {
        if (playing) {
            hasAutoAdvanced.current = false
            intervalRef.current = setInterval(() => {
                setTimeLeft(t => {
                    if (t === 7 && index < EXERCISES.length - 1) {
                        setShowUpNext(true)
                    }

                    if (t <= 1) {
                        clearInterval(intervalRef.current)
                        setShowUpNext(false)

                        if (soundOn) {
                            const ctx = new AudioContext()
                            const osc = ctx.createOscillator()
                            osc.connect(ctx.destination)
                            osc.frequency.value = 880
                            osc.start()
                            osc.stop(ctx.currentTime + 0.3)
                        }

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
                                    setShowUpNext(false)
                                    setIndex(i => Math.min(i + 1, EXERCISES.length - 1))
                                }
                            }, 1000)
                        } else {
                            setShowUpNext(false)
                            setPlaying(false)
                            if (!hasAutoAdvanced.current) {
                                hasAutoAdvanced.current = true
                                setIndex(i => Math.min(i + 1, EXERCISES.length - 1))
                            }
                        }
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

    useEffect(() => {
        setTimeLeft(exercise.duration)
        setPlaying(false)
        setShowUpNext(false)
        setIsDelaying(false)
        setDelayLeft(0)
    }, [index])

    const handlePrev = () => {
        setShowUpNext(false)
        setIsDelaying(false)
        setDelayLeft(0)
        setIndex(i => Math.max(0, i - 1))
    }

    const handleNext = () => {
        setShowUpNext(false)
        setIsDelaying(false)
        setDelayLeft(0)
        setIndex(i => Math.min(EXERCISES.length - 1, i + 1))
    }

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
                <button className={styles.headerBtn} onClick={() => setShowOptions(true)}>•••</button>
            </div>
            <div className={styles.circleWrap}>
                <svg width="260" height="260" viewBox="0 0 260 260">
                    <circle cx="130" cy="130" r={R} fill="none" stroke="#e0e0e0" strokeWidth="10"/>
                    <circle
                        cx="130" cy="130" r={R}
                        fill="none"
                        stroke="#FF9900"
                        strokeWidth="10"
                        strokeDasharray={CIRC}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        transform="rotate(-90 130 130)"
                        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                    />
                    <circle cx="130" cy="130" r="100" fill={exercise.color}/>
                </svg>

                {exercise.img
                    ? <img src={exercise.img} className={styles.circleEmoji} alt={exercise.name} />
                    : <div></div>
                }

                {showUpNext && index < EXERCISES.length - 1 && (() => {
                    const nextExercise = EXERCISES.find(e => e.id === exercise.id + 1)
                    return nextExercise ? (
                        <div className={styles.upNextCard}>
                            <div className={styles.upNextImgWrap} style={{ background: nextExercise.color }}>
                                {nextExercise.img
                                    ? <img src={nextExercise.img} className={styles.upNextImg} alt="" />
                                    : <div></div>
                                }
                            </div>
                            <span className={styles.upNextLabel}>Up Next</span>
                        </div>
                    ) : null
                })()}

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
                <button className={styles.infoBtn} onClick={() => setShowInfo(true)}>ⓘ</button>
            </div>
            <div className={styles.timer}>
                {mm}:{ss}
            </div>

            {isDelaying && (
                <div className={styles.delayBadge}>
                    Nghỉ {delayLeft}s...
                </div>
            )}

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
            {showInfo && (
                <div className={styles.overlay} onClick={() => setShowInfo(false)}>
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
                    </div>
                </div>
            )}

            {showOptions && (
                <div className={styles.overlay} onClick={() => setShowOptions(false)}>
                    <div className={styles.bottomSheet} onClick={e => e.stopPropagation()}>
                        <div className={styles.sheetHandle} />
                        <h2 className={styles.sheetTitle}>Options</h2>

                        <p className={styles.sheetLabel}>SOUND</p>
                        <div className={styles.optionRow}>
                            <span className={styles.optionText}>Play a sound at the end of each exercise</span>
                            <div
                                className={`${styles.toggle} ${soundOn ? styles.toggleOn : ''}`}
                                onClick={() => setSoundOn(s => !s)}
                            >
                                <div className={styles.toggleThumb} />
                            </div>
                        </div>

                        <p className={styles.sheetLabel}>TIMER DELAY</p>
                        <p className={styles.optionText} style={{ marginBottom: 12 }}>
                            Add a delay to the end of each exercise
                        </p>
                        {[0, 5, 10, 15, 20, 25, 30].map(sec => (
                            <button
                                key={sec}
                                className={`${styles.delayBtn} ${delay === sec ? styles.delayBtnActive : ''}`}
                                onClick={() => setDelay(sec)}
                            >
                                {sec === 0 ? 'Off' : `${sec} seconds`}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}