// src/Nuven.tsx
import nuvem from "../assets/3d/low_poly_cloud.glb";
import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

// Tipo do modelo GLTF
type GLTFResult = GLTF & {
    nodes: any;
    materials: any;
};

// Definindo as propriedades do componente
interface NuvenProps {
    position: [number, number, number];
    scale: [number, number, number];
    rotate: number;
}

function Nuven({ position, scale, rotate }: NuvenProps) {
    const gltf = useGLTF(nuvem) as unknown as GLTFResult;
    const ref = useRef<THREE.Group>(null);

    // Clona o gltf.scene para cada instância de nuvem
    const clonedScene = gltf.scene.clone();

    // Converte a rotação de graus para radianos
    const rotationInRadians = (rotate * Math.PI) / 180;

    useEffect(() => {
        if (ref.current) {
            ref.current.rotation.y = rotationInRadians;
        }
    }, [rotationInRadians, position]);

    return (
        <primitive
            ref={ref}
            object={clonedScene}
            position={position}
            scale={scale}
        />
    );
}

export default Nuven;
