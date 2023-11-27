

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { BuildSpaceDimensions, CameraPose, ModelFile } from './types';
import { INITIAL_BUILD_SPACE_DIMENSIONS, ISOMETRIC_CAMERA_POSE } from './consts';

type State = {
    cameraPose: CameraPose;
    canSlice: boolean;
    modelFiles: ModelFile[];
    highlightedModelId: string | null;
}

type Actions = {
    setCameraPose: (pose: CameraPose) => void;
    buildSpaceDimensions: BuildSpaceDimensions;
    addModelFile: (modelFile: ModelFile) => void;
    removeModelFile: (id: string) => void;
    setModelScale: (id: string, scale: number) => void;
    setModelRotation: (id: string, degrees: number) => void;
    setHighlightedModelId: (id: string | null) => void;

}

export const useNinjaStore = create<State & Actions>()(
    immer((set) => ({
        cameraPose: ISOMETRIC_CAMERA_POSE,
        buildSpaceDimensions: INITIAL_BUILD_SPACE_DIMENSIONS,
        canSlice: false,
        modelFiles: [],
        highlightedModelId: null,
        setCameraPose: (pose: CameraPose) => set((state) => {
            state.cameraPose = pose;
        }),
        addModelFile: (modelFile: ModelFile) => set((state) => {
            state.modelFiles.push(modelFile);
            state.canSlice = true;
        }),
        removeModelFile: (id: string) => set((state) => {
            state.modelFiles = state.modelFiles.filter(e => e.id !== id);
            state.canSlice = false;
        }),
        setModelScale: (id: string, scale: number) => set((state) => {
            const model = state.modelFiles.find(e => e.id === id);
            if (model) {
                model.scale = scale;
            }
        }),
        setModelRotation: (id: string, degrees: number) => set((state) => {
            const model = state.modelFiles.find(e => e.id === id);
            if (model) {
                model.rotation = degrees;
            }
        }),
        setHighlightedModelId: (id: string | null) => set((state) => {
            state.highlightedModelId = id;
        }),
    })),
)
