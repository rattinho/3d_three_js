// src/Scene.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, PrimitiveProps, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Planet from './Planet';
import SolarLight from './Sol';
import { Group, PerspectiveCamera as PerspectiveCameraType } from 'three';
import Nuven from './Nuven';
import gsap from 'gsap';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';


const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const Scene: React.FC = () => {

    const planetRef = useRef<Group>(null);
    const nuvensRef = useRef<Group>(null);

    const [scrollY, setScrollY] = useState(0);

    useFrame(() => {
        if (nuvensRef.current) {
            nuvensRef.current.rotation.y -= 0.005
        }
        if (planetRef.current) {
            planetRef.current.rotation.z = -0.3
        }
    })

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (planetRef.current) {
            gsap.to(planetRef.current.position, {
                y: -scrollY * 0.01,
                duration: 0.3,
                ease: "back",
            });
        }
        if (nuvensRef.current) {
            nuvensRef.current.children.forEach((cloud, index) => {
                console.log(index)
                gsap.to(cloud.position, {
                    y: -scrollY * 0.01 + (index * 0.01),
                    duration: (index + 1) * 0.7,
                    ease: "back"
                });
            });
        }
    }, [scrollY]);

    return (
        <group>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
            <pointLight color={"white"} position={[10, 10, 10]} intensity={100} />
            <hemisphereLight color={"#ffffff"} groundColor={"#818181"} intensity={1} />
            <SolarLight />
            <group ref={planetRef}>
                <Planet />
            </group>
            <group ref={nuvensRef}>
                <group>
                    <Nuven position={[1.8, .2, 1.8]} scale={[.02, .02, .02]} rotate={60} />
                </group>
                <group>
                    <Nuven position={[-1, .5, 2.5]} scale={[.02, .02, .02]} rotate={0} />
                </group>
                <group>
                    <Nuven position={[-2.6, .7, .5]} scale={[.02, .02, .02]} rotate={-60} />
                </group>
            </group>
            {
                isMobile ?
                    ''
                    :
                    <OrbitControls enableZoom={false} enablePan={false} />
            }
        </group>
    );
};

export default Scene;
