import styles from './Header.module.css'
import { useState, useEffect } from 'react'

function Header({ children }) {
    const [time, setTime] = useState("00:00");
    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, "0");
            const m = String(now.getMinutes()).padStart(2, "0");
            setTime(`${h}:${m}`);
        };
        tick();
        const id = setInterval(tick, 10000);
        return () => clearInterval(id);
    }, []);

    return (
        <>
            <div className={styles.phone}>
                <div className={styles.sideBtn} style={{ left: -4, top: 90,  height: 22 }} />
                <div className={styles.sideBtn} style={{ left: -4, top: 130, height: 32 }} />
                <div className={styles.sideBtn} style={{ left: -4, top: 172, height: 32 }} />
                <div className={styles.sideBtn} style={{ right: -4, top: 140, height: 50 }} />
                <div className={styles.screen}>
                    <div className={styles.statusBar}>
                        <span className={styles.statusTime}>{time}</span>
                        <div className={styles.statusIcons}>
                            <div className={styles.signalBars}>
                                {[4, 7, 10, 13].map((h, i) => (
                                    <span
                                        key={i}
                                        className={styles.signalBar}
                                        style={{ height: h, opacity: i === 3 ? 0.4 : 1 }}
                                    />
                                ))}
                            </div>
                            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" style={{ marginLeft: 2 }}>
                                <path d="M7.5 2.5C9.8 2.5 11.9 3.5 13.3 5.1L14.5 3.9C12.7 1.9 10.2.8 7.5.8S2.3 1.9.5 3.9l1.2 1.2C3.1 3.5 5.2 2.5 7.5 2.5z" fill="black" opacity="0.4"/>
                                <path d="M7.5 5C9 5 10.3 5.6 11.3 6.6L12.5 5.4C11.2 4.1 9.4 3.3 7.5 3.3S3.8 4.1 2.5 5.4l1.2 1.2C4.7 5.6 6 5 7.5 5z" fill="black" opacity="0.7"/>
                                <path d="M7.5 7.5c.9 0 1.7.4 2.3 1L11 7.3C10.1 6.5 8.8 6 7.5 6S4.9 6.5 4 7.3l1.2 1.2c.6-.6 1.4-1 2.3-1z" fill="black"/>
                                <circle cx="7.5" cy="10.5" r="1.3" fill="black"/>
                            </svg>
                            <svg width="25" height="12" viewBox="0 0 25 12" fill="none" style={{ marginLeft: 2 }}>
                                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="black" strokeOpacity="0.35"/>
                                <rect x="2" y="2" width="17" height="8" rx="2" fill="black"/>
                                <path d="M23 4v4a2 2 0 000-4z" fill="black" opacity="0.4"/>
                            </svg>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
}

export default Header;