import { Line } from '@react-three/drei';
import { AXES_LENGTH, AXES_LINE_WIDTH } from '../lib/consts';

export const Axes = () => {
    return (
        <>
            <Line points={[[0, 0, 0], [AXES_LENGTH, 0, 0]]} color='red' lineWidth={AXES_LINE_WIDTH} />
            <Line points={[[0, 0, 0], [0, AXES_LENGTH, 0]]} color='green' lineWidth={AXES_LINE_WIDTH} />
            <Line points={[[0, 0, 0], [0, 0, AXES_LENGTH]]} color='blue' lineWidth={AXES_LINE_WIDTH} />
        </>
    );
}