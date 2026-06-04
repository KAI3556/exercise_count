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
            <div className={styles.screen}>
                {children}
            </div>
            {/*<div className={styles.phone}>*/}
            {/*    <div className={styles.sideBtn} style={{ left: -4, top: 90,  height: 22 }} />*/}
            {/*    <div className={styles.sideBtn} style={{ left: -4, top: 130, height: 32 }} />*/}
            {/*    <div className={styles.sideBtn} style={{ left: -4, top: 172, height: 32 }} />*/}
            {/*    <div className={styles.sideBtn} style={{ right: -4, top: 140, height: 50 }} />*/}
            {/*    <div className={styles.screen}>*/}
            {/*        {children}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
}

export default Header;