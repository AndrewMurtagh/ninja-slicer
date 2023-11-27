import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { CameraPreset, ISOMETRIC_CAMERA_POSE } from '../lib/consts';
import { useNinjaStore } from '../lib/store';


export const CameraPresets = () => {

    const setCameraPose = useNinjaStore(state => state.setCameraPose);
    const buildSpaceDimensions = useNinjaStore(state => state.buildSpaceDimensions);

    const onCameraPreset = (preset: string) => {

        switch (preset) {
            case CameraPreset.Isometric:
                setCameraPose(ISOMETRIC_CAMERA_POSE);
                break;

            case CameraPreset.Left:
                setCameraPose({
                    x: -buildSpaceDimensions.width / 2,
                    y: buildSpaceDimensions.depth / 2,
                    z: buildSpaceDimensions.height / 2
                });
                break;

            case CameraPreset.Right:
                setCameraPose({
                    x: buildSpaceDimensions.width + buildSpaceDimensions.width / 2,
                    y: buildSpaceDimensions.depth / 2,
                    z: buildSpaceDimensions.height / 2
                });
                break;

            case CameraPreset.Front:
                setCameraPose({
                    x: buildSpaceDimensions.width / 2,
                    y: -buildSpaceDimensions.depth / 2,
                    z: buildSpaceDimensions.height / 2
                });
                break;

            case CameraPreset.Top:
                setCameraPose({
                    x: buildSpaceDimensions.width / 2,
                    y: buildSpaceDimensions.depth / 2,
                    z: buildSpaceDimensions.height / 2
                });
                break;
        }
    };



    return (<div>

        {/* <p className='text-xs text-zinc-400 mb-1 text-center'>Camera position</p> */}

        <ToggleGroup.Root className='flex border border-zinc-500' type='single' onValueChange={onCameraPreset}>
            <ToggleGroup.Item className='p-1 justify-center text-xs hover:bg-zinc-800 bg-zinc-900 inline-flex grow text-white' value={CameraPreset.Isometric}>Isometric</ToggleGroup.Item>
            <ToggleGroup.Item className='p-1 justify-center text-xs hover:bg-zinc-800 bg-zinc-900 inline-flex grow border-l border-zinc-500 text-white' value={CameraPreset.Left}>Left</ToggleGroup.Item>
            <ToggleGroup.Item className='p-1 justify-center text-xs hover:bg-zinc-800 bg-zinc-900 inline-flex grow border-l border-zinc-500 text-white' value={CameraPreset.Right}>Right</ToggleGroup.Item>
            <ToggleGroup.Item className='p-1 justify-center text-xs hover:bg-zinc-800 bg-zinc-900 inline-flex grow border-l border-zinc-500 text-white' value={CameraPreset.Front}>Front</ToggleGroup.Item>
            <ToggleGroup.Item className='p-1 justify-center text-xs hover:bg-zinc-800 bg-zinc-900 inline-flex grow border-l border-zinc-500 text-white' value={CameraPreset.Top}>Top</ToggleGroup.Item>
        </ToggleGroup.Root>

    </div>)
}