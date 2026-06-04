// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import Header from './Khung/Header.jsx'
import WorkoutScreen from './screens/WorkoutScreen.jsx'
import './App.css'

function App() {
    return (
        <Header>
            <WorkoutScreen />
        </Header>
    );
}

export default App;