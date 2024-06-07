// src/App.tsx
import React from 'react';
import Scene from './components/Scene';
import './App.css';
import { Canvas } from '@react-three/fiber';

const App: React.FC = () => {
  return (
    <div className="App">
      <Canvas style={{ height: "100vh" }} className='bg-gradient-to-b from-sky-300 to-sky-600'>
        <Scene />
      </Canvas>
      <div className='h-screen bg-slate-800'>
      </div>
    </div>
  );
}

export default App;
