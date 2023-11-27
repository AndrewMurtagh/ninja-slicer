'use client';

import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber';
import { useNinjaStore } from './lib/store';
import { SliceButton } from './components/SliceButton';
import { Scene } from './components/Scene';
import { BuildSpace } from './components/BuildSpace';
import { Axes } from './components/Axes';
import { STLModel } from './components/STLModel';
import { CameraPresets } from './components/CameraPresets';
import { ModelChooser } from './components/ModelChooser';
import { Settings } from './components/Settings';


const Home = () => {

    const modelFiles = useNinjaStore(state => state.modelFiles);

    return (
        <div className='w-screen h-screen bg-zinc-950 grid grid-cols-5 box-border'>

            <div className='m-3 flex flex-col justify-between'>

                <SliceButton />

                <ModelChooser />

                <CameraPresets />

            </div>



            <div className='m-3 col-span-3 border border-green-600 cursor-pointer'>

                <Canvas>
                    <Scene />

                    <BuildSpace />

                    <Axes />

                    {modelFiles.map(modelFile => <STLModel key={modelFile.id} modelFile={modelFile} />)}

                </Canvas>
            </div>


            <div className='m-3'>

                <Settings />
              
            </div>
        </div>
    )
}

export default Home;