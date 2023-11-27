import { useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { ModelFile } from '../lib/types';
import * as THREE from 'three';
//@ts-ignore
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useNinjaStore } from '../lib/store';


export const STLModel = ({ modelFile }: { modelFile: ModelFile; }) => {

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