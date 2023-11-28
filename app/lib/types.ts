export type CameraPose = {
    x: number;
    y: number;
    z: number;
};

export type ModelFile = {
    id: string;
    name: string;
    url: string;
    fileData: File;
    scale: number;
    rotation: number;
};
