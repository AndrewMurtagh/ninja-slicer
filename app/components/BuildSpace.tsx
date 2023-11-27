import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { BUILD_SPACE_COLOUR, BUILD_SPACE_GRID_DIVISIONS } from '../lib/consts';
import { useNinjaStore } from '../lib/store';


export const BuildSpace = () => {

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

