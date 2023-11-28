import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { BUILD_SPACE_COLOUR, BUILD_SPACE_GRID_DIVISIONS } from '../lib/consts';
import { useSettingsStore } from '../lib/settings-store';


export const BuildSpace = () => {

    const settings = useSettingsStore(state => state.settings);

    const xLines: React.JSX.Element[] = [];
    const yLines: React.JSX.Element[] = [];

    for (let x = 0; x <= Math.floor(settings.x_bed_width / BUILD_SPACE_GRID_DIVISIONS); x++) {
        xLines.push(<Line key={`x${x}`} points={[[x * BUILD_SPACE_GRID_DIVISIONS, 0, 0], [x * BUILD_SPACE_GRID_DIVISIONS, settings.x_bed_depth, 0]]} color={BUILD_SPACE_COLOUR} lineWidth={1} />)
    }

    for (let y = 0; y <= Math.floor(settings.x_bed_depth / BUILD_SPACE_GRID_DIVISIONS); y++) {
        yLines.push(<Line key={`y${y}`} points={[[0, y * BUILD_SPACE_GRID_DIVISIONS, 0], [settings.x_bed_width, y * BUILD_SPACE_GRID_DIVISIONS, 0]]} color={BUILD_SPACE_COLOUR} lineWidth={1} />)
    }

    return (
        <>
            {xLines}
            {yLines}
            <lineSegments position={[settings.x_bed_width / 2, settings.x_bed_depth / 2, settings.x_bed_height / 2]}>
                <edgesGeometry attach='geometry' args={[new THREE.BoxGeometry(settings.x_bed_width, settings.x_bed_depth, settings.x_bed_height)]} />
                <lineBasicMaterial color={BUILD_SPACE_COLOUR} attach='material' />
            </lineSegments>
        </>
    )
}

