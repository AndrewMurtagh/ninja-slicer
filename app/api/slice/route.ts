import { Settings } from '@/app/lib/settings-store';
import { exec } from 'child_process';

const execute = (command: string) => new Promise((resolve, reject) => {
    exec(command, (err, stout, sterr) => {
        if (err) {
            reject(sterr);
        } else {
            resolve(stout);
        }
    });
});


/*
.prusaslicer \
--export-gcode \
--ensure-on-bed \
--loglevel 3 \
--bed-shape 0x0,200x0,200x200,0x200 \
--output ./output.gcode \
--rotate 0 \
--scale 1 \
--layer-height 0.3 \
--first-layer-height 0.35 \
--fill-density 0.2 \
--skirt-distance 6 \
--brim-width 0 \
--filament-diameter 1.75 \
--temperature 200 \
--first-layer-temperature 200 \
--bed-temperature 0 \
--first-layer-bed-temperature 0 \
--nozzle-diameter 0.4 \
--retract-length 2 \
--retract-lift 0 \
./input.stl
*/


export const POST = async (req: Request) => {

    const url = new URL(req.url)
    const settingsParam: any = url.searchParams.get('settings');
    

    if (!settingsParam) {
        return Response.json({ 'res': 'failed' }, { status: 400 });
    }

    const settings = JSON.parse(settingsParam);

    let command = process.env.NODE_ENV === 'production' ? './bin/prusaslicer-x84' : './bin/prusaslicer-arm64';
    command += ' --export-gcode';
    command += ' --ensure-on-bed';
    command += ' --loglevel 3';
    command += ' --output ./output.gcode';

    const x_bed_width = settings.x_bed_width;
    const x_bed_depth = settings.x_bed_depth;
    delete settings.x_bed_width;
    delete settings.x_bed_depth;
    delete settings.x_bed_height;
    command += ` --bed-shape 0x0,${x_bed_width}x0,${x_bed_width}x${x_bed_depth},0x${x_bed_depth}`;

    for (const prop in settings) {
        command += ` --${prop.replaceAll('_', '-')} ${settings[prop]}`;
    }

    command += ` ./input.stl`

    console.log('running command');
    console.log(command);


    try {
        const res = await execute(command);

        console.log('model sliced');
        console.log(res);

        return Response.json({ 'res': 'success' });

    } catch (error) {
        console.log('error slicing');
        console.log(error)
        return Response.json({ 'res': 'failed' }, { status: 400 });

    }


}
