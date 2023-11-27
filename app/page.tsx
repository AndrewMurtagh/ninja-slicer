'use client';

import React, { useRef, forwardRef, useCallback } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import { Line } from '@react-three/drei';
import { useDropzone } from 'react-dropzone';
import * as THREE from 'three';



const Axes = ({ length }: { length: number }) => {
    return (
        <>
            <Line points={[[0, 0, 0], [length, 0, 0]]} color='red' lineWidth={2} />
            <Line points={[[0, 0, 0], [0, length, 0]]} color='green' lineWidth={2} />
            <Line points={[[0, 0, 0], [0, 0, length]]} color='blue' lineWidth={2} />
        </>
    );
}




const Scene = forwardRef((props: any, ref) => {

    const width = props.buildSpaceDims[0];
    const depth = props.buildSpaceDims[1];
    const height = props.buildSpaceDims[2];

    const controlsRef = useRef<any>();
    const scene_ref = useRef<any>();
    const { camera, raycaster, gl } = useThree();


    useFrame(() => {
        //@ts-ignore
        controlsRef.current && controlsRef.current.update()
    });


    camera.near = 0.4;
    camera.far = 1000;
    camera.up.set(0, 0, 1);
    camera.position.set(50, 10, 50);


    return (
        <scene ref={scene_ref}>
            <ambientLight intensity={0.2} />
            <pointLight intensity={0.2} position={[0, 0, height]} />
            <pointLight intensity={0.2} position={[0, depth, height]} />
            <pointLight intensity={0.2} position={[width, 0, height]} />
            <pointLight intensity={0.2} position={[width, depth, height]} />
            <hemisphereLight intensity={0.8} groundColor={0x1e2424} position={[0, 0, 1]} />
            <OrbitControls
                target={[width / 2, depth / 2, 0]}
                ref={controlsRef}
                args={[camera, gl.domElement]}
                enableRotate
                enablePan={true}
                minPolarAngle={0}
            />
        </scene>
    );
});


export const BuildSpace = ({ width, depth, height }: { width: number; depth: number; height: number; }) => {

    const DIVISIONS = 10;
    const xLines: any = [];
    const yLines: any = [];

    for (let x = 0; x <= Math.floor(width / DIVISIONS); x++) {
        xLines.push(<Line points={[[x * DIVISIONS, 0, 0], [x * DIVISIONS, depth, 0]]} color='aqua' lineWidth={1} />)
    }

    for (let y = 0; y <= Math.floor(depth / DIVISIONS); y++) {
        yLines.push(<Line points={[[0, y * DIVISIONS, 0], [width, y * DIVISIONS, 0]]} color='aqua' lineWidth={1} />)
    }

    return (
        <>
            {xLines}
            {yLines}
            <lineSegments position={[width / 2, depth / 2, height / 2]}>
                <edgesGeometry attach='geometry' args={[new THREE.BoxGeometry(width, depth, height)]} />
                <lineBasicMaterial color='aqua' attach='material' />
            </lineSegments>
        </>
    )
}



const Home = () => {

    const camPos = {
        x: 50,
        y: 10,
        z: 50
    };

    const buildSpaceDims = {

        x: 200,
        y: 200,
        z: 200
    }


    return (
        <div className='w-screen h-screen bg-zinc-950 grid grid-cols-5'>

            <div className=''>

            </div>



            <div className='col-span-3 border-l border-r border-zinc-600'>

                <Canvas>
                    <Scene buildSpaceDims={[buildSpaceDims.x, buildSpaceDims.y, buildSpaceDims.z]} cameraPos={[camPos.x, camPos.y, camPos.z]} />

                    <BuildSpace width={buildSpaceDims.x} depth={buildSpaceDims.y} height={buildSpaceDims.z} />

                    <Axes length={40} />
                </Canvas>
            </div>


            <div className=''>

            </div>
        </div>
    )
}

export default Home;