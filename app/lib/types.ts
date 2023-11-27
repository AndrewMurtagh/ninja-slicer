export type CameraPose = {
    x: number;
    y: number;
    z: number;
};

export type BuildSpaceDimensions = {
    width: number;
    depth: number;
    height: number;
};


export type ModelFile = {
    id: string;
    name: string;
    url: string;
    fileData: File;
    scale: number;
    rotation: number;
};
