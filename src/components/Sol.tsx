import { PointLight } from 'three';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';


const SolarLight: React.FC = () => {
    const lightRef = useRef<PointLight>(null);

    useFrame(({ clock }) => {
        if (lightRef.current) {
            const t = clock.getElapsedTime();
            lightRef.current.position.x = -10 * Math.sin(t);
            lightRef.current.position.z = -10 * Math.cos(t);
        }
    });

    return (
        <pointLight ref={lightRef} position={[0, 0, 10]} color="white" intensity={100} />
    );
};

export default SolarLight