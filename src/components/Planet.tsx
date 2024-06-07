
import teste from "../assets/3d/low_poly_planet_earth.glb"
import * as THREE from 'three';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';



// Tipo do modelo GLTF
type GLTFResult = GLTF & {
    nodes: any;
    materials: any;
};


const Planet: React.FC = () => {
    const gltf = useGLTF(teste) as unknown as GLTFResult;
    const ref = useRef<THREE.Group>(null);

    // Adiciona rotação ao Planet
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.005;
        }
    });

    return <primitive ref={ref} object={gltf.scene} position={[0, -1, 0]} />;
};

export default Planet;