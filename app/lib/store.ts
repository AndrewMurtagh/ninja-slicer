

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { CameraPose, ModelFile } from './types';
import { ISOMETRIC_CAMERA_POSE } from './consts';

type State = {
    cameraPose: CameraPose;
    canSlice: boolean;
    isSlicing: boolean;
    sliceError: string | null;
    modelFiles: ModelFile[];
    highlightedModelId: string | null;
}

type Actions = {
    setIsSlicing: (slicing: boolean) => void;
    setSliceError: (error: string | null) => void;
    setCameraPose: (pose: CameraPose) => void;
    addModelFile: (modelFile: ModelFile) => void;
    removeModelFile: (id: string) => void;
    setModelScale: (id: string, scale: number) => void;
    setModelRotation: (id: string, degrees: number) => void;
    setHighlightedModelId: (id: string | null) => void;
}

export const useNinjaStore = create<State & Actions>()(immer((set) => ({
    cameraPose: ISOMETRIC_CAMERA_POSE,
    canSlice: false,
    isSlicing: false,
    sliceError: null,
    modelFiles: [],
    highlightedModelId: null,
    setIsSlicing: (slicing: boolean) => set((state) => {
        state.isSlicing = slicing;
    }),
    setSliceError: (error: string | null) => set((state) => {
        state.sliceError = error;
    }),
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
