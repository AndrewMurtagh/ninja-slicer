import { BuildSpaceDimensions, CameraPose } from './types';

export const POINT_LIGHT_INTENSITY = 1.0;
export const AMBIENT_LIGHT_INTENSITY = 1.0;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 1000;
export const BUILD_SPACE_GRID_DIVISIONS = 10;
export const BUILD_SPACE_COLOUR = 'gray';
export const AXES_LENGTH = 30;
export const AXES_LINE_WIDTH = 3;

export const INITIAL_BUILD_SPACE_DIMENSIONS: BuildSpaceDimensions = {
    width: 200,
    depth: 200,
    height: 200
};

export const ISOMETRIC_CAMERA_POSE: CameraPose = {
    x: 50,
    y: -50,
    z: 100
};

export const enum CameraPreset {
    Isometric = 'ISOMETRIC',
    Left = 'LEFT',
    Right = 'RIGHT',
    Front = 'FRONT',
    Top = 'TOP'
};