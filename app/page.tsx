'use client';

import axios from 'axios';
import { useRef, useEffect, MouseEvent, useCallback, useState } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Form from '@radix-ui/react-form';
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber';
import * as Accordion from '@radix-ui/react-accordion';
import { OrbitControls, Line } from '@react-three/drei';
import { useDropzone } from 'react-dropzone';
import * as THREE from 'three';
import { BiRefresh, BiSolidTrash } from 'react-icons/bi';
import { v4 as uuid } from 'uuid';
import { BuildSpaceDimensions, CameraPose, ModelFile } from './lib/types';
import {
    AMBIENT_LIGHT_INTENSITY, AXES_LINE_WIDTH, BUILD_SPACE_COLOUR, BUILD_SPACE_GRID_DIVISIONS,
    CAMERA_FAR, CAMERA_NEAR, CameraPreset, INITIAL_BUILD_SPACE_DIMENSIONS, ISOMETRIC_CAMERA_POSE,
    POINT_LIGHT_INTENSITY, AXES_LENGTH
} from './lib/consts';
//@ts-ignore
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useNinjaStore } from './lib/store';








const Axes = ({ length }: { length: number }) => {
    return (
        <>
            <Line points={[[0, 0, 0], [length, 0, 0]]} color='red' lineWidth={AXES_LINE_WIDTH} />
            <Line points={[[0, 0, 0], [0, length, 0]]} color='green' lineWidth={AXES_LINE_WIDTH} />
            <Line points={[[0, 0, 0], [0, 0, length]]} color='blue' lineWidth={AXES_LINE_WIDTH} />
        </>
    );
}


const Scene = () => {

    const buildSpaceDimensions = useNinjaStore(state => state.buildSpaceDimensions);

    const controlsRef = useRef<any>();
    const scene_ref = useRef<any>();
    const { camera, raycaster, gl } = useThree();
    const cameraPose = useNinjaStore(state => state.cameraPose);


    useFrame(() => {
        //@ts-ignore
        controlsRef.current && controlsRef.current.update()
    });

    camera.near = CAMERA_NEAR;
    camera.far = CAMERA_FAR;
    camera.up.set(0, 0, 1);

    useEffect(() => {
        camera.position.set(cameraPose.x, cameraPose.y, cameraPose.z);
    }, [cameraPose])

    return (
        <scene ref={scene_ref}>
            <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
            <pointLight intensity={POINT_LIGHT_INTENSITY} position={[0, 0, buildSpaceDimensions.height]} />
            <pointLight intensity={POINT_LIGHT_INTENSITY} position={[0, buildSpaceDimensions.depth, buildSpaceDimensions.height]} />
            <pointLight intensity={POINT_LIGHT_INTENSITY} position={[buildSpaceDimensions.width, 0, buildSpaceDimensions.height]} />
            <pointLight intensity={POINT_LIGHT_INTENSITY} position={[buildSpaceDimensions.width, buildSpaceDimensions.depth, buildSpaceDimensions.height]} />
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
};



const BuildSpace = () => {

    const buildSpaceDimensions = useNinjaStore(state => state.buildSpaceDimensions);

    const DIVISIONS = BUILD_SPACE_GRID_DIVISIONS;
    const xLines: any = [];
    const yLines: any = [];

    for (let x = 0; x <= Math.floor(buildSpaceDimensions.width / DIVISIONS); x++) {
        xLines.push(<Line key={`x${x}`} points={[[x * DIVISIONS, 0, 0], [x * DIVISIONS, buildSpaceDimensions.depth, 0]]} color={BUILD_SPACE_COLOUR} lineWidth={1} />)
    }

    for (let y = 0; y <= Math.floor(buildSpaceDimensions.depth / DIVISIONS); y++) {
        yLines.push(<Line key={`y${y}`} points={[[0, y * DIVISIONS, 0], [buildSpaceDimensions.width, y * DIVISIONS, 0]]} color={BUILD_SPACE_COLOUR} lineWidth={1} />)
    }

    return (
        <>
            {xLines}
            {yLines}
            <lineSegments position={[buildSpaceDimensions.width / 2, buildSpaceDimensions.depth / 2, buildSpaceDimensions.height / 2]}>
                <edgesGeometry attach='geometry' args={[new THREE.BoxGeometry(buildSpaceDimensions.width, buildSpaceDimensions.depth, buildSpaceDimensions.height)]} />
                <lineBasicMaterial color={BUILD_SPACE_COLOUR} attach='material' />
            </lineSegments>
        </>
    )
}




const STLModel = ({ modelFile }: { modelFile: ModelFile; }) => {

    const [highlighted, setHighlighted] = useState(false);
    const geom = useLoader(STLLoader, modelFile.url);
    const buildSpaceDimensions = useNinjaStore(state => state.buildSpaceDimensions);
    const highlightedModelId = useNinjaStore(state => state.highlightedModelId);
    const setHighlightedModelId = useNinjaStore(state => state.setHighlightedModelId);

    // if(props.oob) {
    //     colour = 0xCC3C3C
    //   } else 
    let colour;
    if (highlightedModelId === modelFile.id && highlighted) {
        colour = 0x76db76
    } else if (highlightedModelId === modelFile.id && !highlighted) {
        colour = 0x3ccc3c
    } else if (highlightedModelId !== modelFile.id && highlighted) {
        colour = 0xffd75e
    } else if (highlightedModelId !== modelFile.id && !highlighted) {
        colour = 0xffc719
    }

    return (
        <>
            <mesh
                position={[buildSpaceDimensions.width / 2, buildSpaceDimensions.depth / 2, 0]}
                onPointerOver={e => setHighlighted(true)}
                onPointerOut={e => setHighlighted(false)}
                onClick={() => setHighlightedModelId(modelFile.id)}
                onPointerMissed={() => setHighlightedModelId(null)}
                scale={[modelFile.scale, modelFile.scale, modelFile.scale]}
                rotation={[0, 0, THREE.MathUtils.degToRad(modelFile.rotation)]}>
                <primitive object={geom} attach='geometry' />
                <meshPhongMaterial attach='material' color={colour} side={THREE.DoubleSide} />
            </mesh>
        </>
    )
}


const SliceButton = () => {
    const canSlice = useNinjaStore(state => state.canSlice);
    const modelFiles = useNinjaStore(state => state.modelFiles);

    const onSlice = async (e: MouseEvent<HTMLElement>) => {

        if (modelFiles.length === 0) {
            alert('You have not uploaded a model to slice.');
        }

        // TODO 
        // - check the model is in the build space

        const formData = new FormData();
        for (const modelFile of modelFiles) {
            formData.append(modelFile.id, modelFile.fileData);
        }


        try {
            const res = await axios({
                method: 'POST',
                url: '/api/slice',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    settings: 'TODO'
                }
            });
            console.log(res.status)
            console.log(res.data)
        } catch (error) {
            console.log(error)

        }

    }

    return (
        <button className='py-1 px-3 rounded text-white hover:bg-green-300 bg-green-400 disabled:bg-green-300' disabled={!canSlice} onClick={onSlice}>Slice</button>
    )
}

const Home = () => {

    const setCameraPose = useNinjaStore(state => state.setCameraPose);
    const buildSpaceDimensions = useNinjaStore(state => state.buildSpaceDimensions);
    const modelFiles = useNinjaStore(state => state.modelFiles);
    const addModelFile = useNinjaStore(state => state.addModelFile);
    const removeModelFile = useNinjaStore(state => state.removeModelFile);
    const highlightedModelId = useNinjaStore(state => state.highlightedModelId);
    const setModelScale = useNinjaStore(state => state.setModelScale);
    const setModelRotation = useNinjaStore(state => state.setModelRotation);


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


    const onDrop = useCallback((acceptedFiles: any) => {

        for (const file of acceptedFiles) {
            const url = URL.createObjectURL(file);

            addModelFile({
                id: uuid(),
                name: file.name,
                url,
                fileData: file,
                scale: 1,
                rotation: 0
            });
        }



    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });



    return (
        <div className='w-screen h-screen bg-zinc-950 grid grid-cols-5 box-border'>

            <div className='m-3 p-3 flex flex-col border border-green-600 justify-between'>


                <SliceButton />

                <div>

                    <p className='text-xs text-zinc-400 mb-1 text-center'>Models</p>
                    <div {...getRootProps()} className='bg-zinc-600 rounded border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'>
                        <input {...getInputProps()} />
                        <p>Drop or click here to load models</p>
                    </div>

                    <Accordion.Root type='multiple'>
                        {
                            modelFiles.map(modelFile =>
                                <Accordion.Item key={modelFile.id} value={modelFile.id} className='w-full'>
                                    <Accordion.Header className='w-full'>
                                        <Accordion.Trigger className={`${highlightedModelId === modelFile.id ? 'bg-green-700' : 'bg-zinc-700 data-[state=open]:bg-green-700'} px-3 hover:bg-zinc-400  w-full p-1 flex rounded justify-between`}>
                                            <p className='text-zinc-300'>{modelFile.name}</p>
                                        </Accordion.Trigger>
                                    </Accordion.Header>
                                    <Accordion.Content className='bg-zinc-700 p-3 rounded'>
                                        <button className='hover:bg-zinc-700 text-zinc-200 p-1 rounded' onClick={() => { setModelScale(modelFile.id, 1); setModelRotation(modelFile.id, 1); }}><BiRefresh /></button>
                                        <button className='hover:bg-zinc-700 text-zinc-200 p-1 rounded' onClick={() => removeModelFile(modelFile.id)}><BiSolidTrash /></button>


                                        <Form.Root onSubmit={e => e.preventDefault()}>
                                            <Form.Field name='scale' className='flex items-center justify-between'>
                                                <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Scale</Form.Label>
                                                <Form.Control asChild>
                                                    <input
                                                        className='bg-zinc-600 rounded border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                                        step={0.1}
                                                        type='number'
                                                        value={modelFile.scale}
                                                        onChange={(e) => setModelScale(modelFile.id, Number(e.target.value))} />
                                                </Form.Control>
                                            </Form.Field>

                                            <Form.Field name='rotation' className='flex items-center justify-between'>
                                                <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Rotation</Form.Label>
                                                <Form.Control asChild>
                                                    <input
                                                        className='bg-zinc-600 rounded border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                                        step={10}
                                                        type='number'
                                                        value={modelFile.rotation}
                                                        onChange={(e) => setModelRotation(modelFile.id, Number(e.target.value))} />
                                                </Form.Control>
                                            </Form.Field>


                                        </Form.Root>
                                    </Accordion.Content>
                                </Accordion.Item>
                            )
                        }
                    </Accordion.Root>
                </div>


                <div>

                    <p className='text-xs text-zinc-400 mb-1 text-center'>Camera position</p>

                    <ToggleGroup.Root className='flex border rounded border-zinc-500' type='single' onValueChange={onCameraPreset}>
                        <ToggleGroup.Item className='p-1 justify-center text-xs hover:bg-zinc-800 inline-flex grow text-white' value={CameraPreset.Isometric}>Isometric</ToggleGroup.Item>
                        <ToggleGroup.Item className='p-1 justify-center text-xs hover:bg-zinc-800 inline-flex grow border-l border-zinc-500 text-white' value={CameraPreset.Left}>Left</ToggleGroup.Item>
                        <ToggleGroup.Item className='p-1 justify-center text-xs hover:bg-zinc-800 inline-flex grow border-l border-zinc-500 text-white' value={CameraPreset.Right}>Right</ToggleGroup.Item>
                        <ToggleGroup.Item className='p-1 justify-center text-xs hover:bg-zinc-800 inline-flex grow border-l border-zinc-500 text-white' value={CameraPreset.Front}>Front</ToggleGroup.Item>
                        <ToggleGroup.Item className='p-1 justify-center text-xs hover:bg-zinc-800 inline-flex grow border-l border-zinc-500 text-white' value={CameraPreset.Top}>Top</ToggleGroup.Item>
                    </ToggleGroup.Root>

                </div>

            </div>



            <div className='m-3 col-span-3 border border-green-600 cursor-pointer'>

                <Canvas>
                    <Scene />

                    <BuildSpace />

                    <Axes length={AXES_LENGTH} />

                    {modelFiles.map(modelFile => <STLModel key={modelFile.id} modelFile={modelFile} />)}

                </Canvas>
            </div>


            <div className='m-3 p-3 border border-green-600'>

            </div>
        </div>
    )
}

export default Home;