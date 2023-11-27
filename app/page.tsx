'use client';

import { create } from 'zustand';
import { useRef, forwardRef, useEffect, MouseEvent, useCallback } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Line } from '@react-three/drei';
import { useDropzone } from 'react-dropzone';
import * as THREE from 'three';
import { v4 as uuid } from 'uuid';



const INITIAL_BUILD_SPACE_DIMENSIONS: BuildSpaceDimensions = {
    width: 200,
    depth: 200,
    height: 200
};

const ISOMETRIC_CAMERA_POSE: CameraPose = {
    x: 50,
    y: -50,
    z: 100
};

const enum CameraPreset {
    Isometric = 'ISOMETRIC',
    Left = 'LEFT',
    Right = 'RIGHT',
    Front = 'FRONT',
    Top = 'TOP'
};




type CameraPose = {
    x: number;
    y: number;
    z: number;
};

type BuildSpaceDimensions = {
    width: number;
    depth: number;
    height: number;
};


type ModelFile = {
    id: string;
    name: string;
    url: string;
};


interface NinjaState {
    cameraPose: CameraPose;
    setCameraPose: (newPose: CameraPose) => void;
    buildSpaceDimensions: BuildSpaceDimensions;
    canSlice: boolean;
    modelFiles: ModelFile[];
    addModelFile: (modelFile: ModelFile) => void;
    removeModelFile: (id: string) => void;

}


const useNinjaStore = create<NinjaState>((set) => ({
    cameraPose: ISOMETRIC_CAMERA_POSE,
    setCameraPose: (newPose: CameraPose) => set((state) => ({ cameraPose: newPose })),
    buildSpaceDimensions: INITIAL_BUILD_SPACE_DIMENSIONS,
    canSlice: false,
    modelFiles: [],
    addModelFile: (modelFile) => set((state) => ({ modelFiles: [...state.modelFiles, modelFile], canSlice: true })),
    removeModelFile: (id) => set((state) => ({ modelFiles: state.modelFiles.filter(e => e.id !== id), canSlice: false })),

}))


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

    const buildSpaceDimensions = useNinjaStore(state => state.buildSpaceDimensions);

    const controlsRef = useRef<any>();
    const scene_ref = useRef<any>();
    const { camera, raycaster, gl } = useThree();
    const cameraPose = useNinjaStore(state => state.cameraPose);



    useFrame(() => {
        //@ts-ignore
        controlsRef.current && controlsRef.current.update()
    });


    camera.near = 0.4;
    camera.far = 1000;
    camera.up.set(0, 0, 1);

    useEffect(() => {
        camera.position.set(cameraPose.x, cameraPose.y, cameraPose.z);
    }, [cameraPose])

    return (
        <scene ref={scene_ref}>
            <ambientLight intensity={0.2} />
            <pointLight intensity={0.2} position={[0, 0, buildSpaceDimensions.height]} />
            <pointLight intensity={0.2} position={[0, buildSpaceDimensions.depth, buildSpaceDimensions.height]} />
            <pointLight intensity={0.2} position={[buildSpaceDimensions.width, 0, buildSpaceDimensions.height]} />
            <pointLight intensity={0.2} position={[buildSpaceDimensions.width, buildSpaceDimensions.depth, buildSpaceDimensions.height]} />
            <hemisphereLight intensity={0.8} groundColor={0x1e2424} position={[0, 0, 1]} />
            <OrbitControls
                target={[buildSpaceDimensions.width / 2, buildSpaceDimensions.depth / 2, 0]}
                ref={controlsRef}
                args={[camera, gl.domElement]}
                enableRotate
                enablePan={true}
                minPolarAngle={0}
            />
        </scene>
    );
});



const BuildSpace = () => {

    const buildSpaceDimensions = useNinjaStore(state => state.buildSpaceDimensions);

    const DIVISIONS = 10;
    const xLines: any = [];
    const yLines: any = [];

    for (let x = 0; x <= Math.floor(buildSpaceDimensions.width / DIVISIONS); x++) {
        xLines.push(<Line key={`x${x}`} points={[[x * DIVISIONS, 0, 0], [x * DIVISIONS, buildSpaceDimensions.depth, 0]]} color='aqua' lineWidth={1} />)
    }

    for (let y = 0; y <= Math.floor(buildSpaceDimensions.depth / DIVISIONS); y++) {
        yLines.push(<Line key={`y${y}`} points={[[0, y * DIVISIONS, 0], [buildSpaceDimensions.width, y * DIVISIONS, 0]]} color='aqua' lineWidth={1} />)
    }

    return (
        <>
            {xLines}
            {yLines}
            <lineSegments position={[buildSpaceDimensions.width / 2, buildSpaceDimensions.depth / 2, buildSpaceDimensions.height / 2]}>
                <edgesGeometry attach='geometry' args={[new THREE.BoxGeometry(buildSpaceDimensions.width, buildSpaceDimensions.depth, buildSpaceDimensions.height)]} />
                <lineBasicMaterial color='aqua' attach='material' />
            </lineSegments>
        </>
    )
}




const Home = () => {

    const setCameraPose = useNinjaStore(state => state.setCameraPose);
    const buildSpaceDimensions = useNinjaStore(state => state.buildSpaceDimensions);
    const canSlice = useNinjaStore(state => state.canSlice);
    const modelFiles = useNinjaStore(state => state.modelFiles);
    const addModelFile = useNinjaStore(state => state.addModelFile);
    const removeModelFile = useNinjaStore(state => state.removeModelFile);



    const onCameraPreset = (preset: string) => {

        switch (preset) {
            case CameraPreset.Isometric:
                setCameraPose(ISOMETRIC_CAMERA_POSE);
                break;

            case CameraPreset.Left:
                setCameraPose({
                    x: -buildSpaceDimensions.width / 2,
                    y: buildSpaceDimensions.depth / 2,
                    z: buildSpaceDimensions.height / 2
                });
                break;

            case CameraPreset.Right:
                setCameraPose({
                    x: buildSpaceDimensions.width + buildSpaceDimensions.width / 2,
                    y: buildSpaceDimensions.depth / 2,
                    z: buildSpaceDimensions.height / 2
                });
                break;

            case CameraPreset.Front:
                setCameraPose({
                    x: buildSpaceDimensions.width / 2,
                    y: -buildSpaceDimensions.depth / 2,
                    z: buildSpaceDimensions.height / 2
                });
                break;

            case CameraPreset.Top:
                setCameraPose({
                    x: buildSpaceDimensions.width / 2,
                    y: buildSpaceDimensions.depth / 2,
                    z: buildSpaceDimensions.height / 2
                });
                break;
        }
    };


    const onSlice = (e: MouseEvent<HTMLElement>) => {
        alert('slicing');
    }

    const onDrop = useCallback((acceptedFiles: any) => {

        /*
        TODO 
        - check size and type is okay
        */

        for (const file of acceptedFiles) {
            const url = URL.createObjectURL(file);

            addModelFile({
                id: uuid(),
                name: file.name,
                url
            });
        }



    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })



    return (
        <div className='w-screen h-screen bg-zinc-950 grid grid-cols-5'>

            <div className=''>


                <div className=''>
                    <button className='bg-green-300 disabled:bg-red-300' disabled={!canSlice} onClick={onSlice}>Slice</button>
                </div>

                <div className=''>
                    <div {...getRootProps()} className='bg-zinc-500 border border-green-300'>
                        <input {...getInputProps()} />
                        <p>Drop or click here to load models</p>
                    </div>

                    {
                        modelFiles.map(modelFile => <div key={modelFile.id} className='p-1'>
                            <p className='text-zinc-200'>{modelFile.name}</p>
                            <button className='border text-zinc-200' onClick={() => removeModelFile(modelFile.id)}>remove</button>
                        </div>)
                    }
                </div>

                <div className=''>


                    <ToggleGroup.Root type='single' onValueChange={onCameraPreset}>
                        <ToggleGroup.Item className='border border-red-400 text-white' value={CameraPreset.Isometric}>Isometric</ToggleGroup.Item>
                        <ToggleGroup.Item className='border border-red-400 text-white' value={CameraPreset.Left}>Left</ToggleGroup.Item>
                        <ToggleGroup.Item className='border border-red-400 text-white' value={CameraPreset.Right}>Right</ToggleGroup.Item>
                        <ToggleGroup.Item className='border border-red-400 text-white' value={CameraPreset.Front}>Front</ToggleGroup.Item>
                        <ToggleGroup.Item className='border border-red-400 text-white' value={CameraPreset.Top}>Top</ToggleGroup.Item>
                    </ToggleGroup.Root>

                </div>

            </div>



            <div className='col-span-3 border-l border-r border-zinc-600'>

                <Canvas>
                    <Scene />

                    <BuildSpace />

                    <Axes length={40} />

                </Canvas>
            </div>


            <div className=''>

            </div>
        </div>
    )
}

export default Home;