import { useEffect, useRef } from 'react';
import { useNinjaStore } from '../lib/store';
import { useFrame, useThree } from '@react-three/fiber';
import { AMBIENT_LIGHT_INTENSITY, CAMERA_FAR, CAMERA_NEAR, POINT_LIGHT_INTENSITY } from '../lib/consts';
import { OrbitControls } from '@react-three/drei';


export const Scene = () => {

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

