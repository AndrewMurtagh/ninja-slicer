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


export const POST = async (req: Request) => {

    let command = process.env.NODE_ENV === 'production' ? './bin/prusaslicer-x84 --help' : './bin/prusaslicer-arm64 --help';
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
        return Response.json({ 'res': 'failed' });

    }


}
