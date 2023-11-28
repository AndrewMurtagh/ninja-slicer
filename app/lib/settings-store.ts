import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type Settings = {
    rotate: number;
    scale: number;
    layer_height: number;
    first_layer_height: number;
    fill_density: number;
    skirt_distance: number;
    brim_width: number;
    filament_diameter: number;
    temperature: number;
    first_layer_temperature: number;
    bed_temperature: number;
    first_layer_bed_temperature: number;
    x_bed_width: number;
    x_bed_depth: number;
    x_bed_height: number;
    nozzle_diameter: number;
    retract_length: number;
    retract_lift: number;
}

type State = {
    settings: Settings;
}

const INITIAL_SETTINGS = {
    rotate: 0, // degrees
    scale: 1, // factor
    layer_height: 0.3, // mm
    first_layer_height: 0.35, // mm
    fill_density: 0.2, // percentage as a deciment
    skirt_distance: 6, // mm
    brim_width: 0, // mm
    filament_diameter: 1.75, // mm
    temperature: 200, // c
    first_layer_temperature: 200,  // c
    bed_temperature: 0,  // c
    first_layer_bed_temperature: 0,  // c
    x_bed_width: 200, // mm
    x_bed_depth: 200, // mm
    x_bed_height: 200, // mm
    nozzle_diameter: 0.4, // mm
    retract_length: 2, // mm
    retract_lift: 0, // mm
};

type Actions = {
    updateSetting: (id: string, value: number) => void;
    resetSettings: () => void;
}

export const useSettingsStore = create<State & Actions>()(immer((set) => ({
    settings: INITIAL_SETTINGS,
    updateSetting: (id: string, value: number) => set((state) => {
        state.settings[id as keyof Settings] = value;
    }),
    resetSettings: () => set((state) => {
        state.settings = INITIAL_SETTINGS;
    })
})));
