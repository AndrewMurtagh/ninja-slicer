import os from 'os';
import fs from 'fs';
import path from 'path';
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

    try {

        // extract settings
        const url = new URL(req.url)
        const settingsParam: any = url.searchParams.get('settings');

        if (!settingsParam) {
            console.log('no settings');
            return Response.json({ 'failure_reason': 'No settings provided' }, { status: 400 });
        }
        const settings = JSON.parse(settingsParam);


        // grab the stl file
        const formData = await req.formData();

        // NOTE: assumes only one entry is sent
        let fileId = '';
        let file: Blob | null = null;
        for (let [key, val] of formData.entries()) {
            fileId = key;
            file = val as Blob | null;
        }

        if (!file) {
            console.log('no file');
            return Response.json({ 'failure_reason': 'No file provided' }, { status: 400 });
        }


        // set up tmp directories and paths
        const inputDir = path.join(os.tmpdir(), 'input');
        if (!fs.existsSync(inputDir)) {
            fs.mkdirSync(inputDir, { recursive: true });
        }
        const inputPath = path.join(inputDir, `${fileId}.stl`);
        console.log(inputPath)

        const outputDir = path.join(os.tmpdir(), 'output');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        const outputPath = path.join(outputDir, `${fileId}.gcode`);
        console.log(outputPath)


        // write file to input
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(inputPath, buffer);


        // assemble the command
        let command = process.env.NODE_ENV === 'production' ?
            path.join(process.cwd(), 'bin', 'prusaslicer-x84') :
            path.join(process.cwd(), 'bin', 'prusaslicer-arm64');

        // console.log('0', command)
        // console.log('1', path.join(process.cwd()))
        // console.log('2', path.join(process.cwd(), 'bin'))
        // console.log('3', path.join(path.join(process.cwd(), 'bin', 'prusaslicer-x64')))
        // console.log('4', fs.readdirSync(path.join(process.cwd(), 'bin')))
        const filepath = path.join(process.cwd(), 'bin', 'test.txt')
        console.log('5', fs.statSync(filepath))

        command += ' --export-gcode';
        command += ' --ensure-on-bed';
        command += ' --loglevel 3';
        command += ` --output ${outputPath}`;

        const x_bed_width = settings.x_bed_width;
        const x_bed_depth = settings.x_bed_depth;
        delete settings.x_bed_width;
        delete settings.x_bed_depth;
        delete settings.x_bed_height;
        command += ` --bed-shape 0x0,${x_bed_width}x0,${x_bed_width}x${x_bed_depth},0x${x_bed_depth}`;

        for (const prop in settings) {
            command += ` --${prop.replaceAll('_', '-')} ${settings[prop]}`;
        }

        command += ` ${inputPath}`

        console.log('running command');
        console.log(command);


        // slice the model
        const res = await execute(command);

        console.log('model sliced');
        console.log(res);

        const gcode = fs.readFileSync(outputPath, { encoding: 'utf8', flag: 'r' });


        // TODO 
        // - can remove tmp directories and files here

        return new Response(gcode, {
            headers: {
                'content-type': 'text-plain'
            },
        });

    } catch (error) {
        console.log('error slicing');
        console.log(error)
        const errorMessage = typeof(error) === 'string' ? error : 'An unknown error has occurred.';
        return Response.json({ 'failure_reason': errorMessage }, { status: 400 });

    }


}
