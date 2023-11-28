import { useEffect, useRef } from 'react';
import { useNinjaStore } from '../lib/store';
import { useFrame, useThree } from '@react-three/fiber';
import { AMBIENT_LIGHT_INTENSITY, CAMERA_FAR, CAMERA_NEAR, POINT_LIGHT_INTENSITY } from '../lib/consts';
import { OrbitControls } from '@react-three/drei';
import { useSettingsStore } from '../lib/settings-store';


export const Scene = () => {

    const settings = useSettingsStore(state => state.settings);
    // const buildSpaceDimensions = useNinjaStore(state => state.buildSpaceDimensions);

    const controlsRef = useRef<any>();
    const scene_ref = useRef<any>();
    const { camera, gl } = useThree();
    const cameraPose = useNinjaStore(state => state.cameraPose);


    useFrame(() => {
        controlsRef.current && controlsRef.current.update();
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
            <pointLight intensity={POINT_LIGHT_INTENSITY} position={[0, 0, settings.x_bed_height]} />
            <pointLight intensity={POINT_LIGHT_INTENSITY} position={[0, settings.x_bed_depth, settings.x_bed_height]} />
            <pointLight intensity={POINT_LIGHT_INTENSITY} position={[settings.x_bed_width, 0, settings.x_bed_height]} />
            <pointLight intensity={POINT_LIGHT_INTENSITY} position={[settings.x_bed_width, settings.x_bed_depth, settings.x_bed_height]} />
            <OrbitControls
                target={[settings.x_bed_width / 2, settings.x_bed_depth / 2, 0]}
                ref={controlsRef}
                args={[camera, gl.domElement]}
                enableRotate
                enablePan={true}
                minPolarAngle={0}
            />
        </scene>
    );
};

