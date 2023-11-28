import * as Accordion from '@radix-ui/react-accordion';
import * as Form from '@radix-ui/react-form';
import { useDropzone } from 'react-dropzone';
import { v4 as uuid } from 'uuid';
import { useNinjaStore } from '../lib/store';
import { useCallback } from 'react';
import { BiRefresh, BiSolidTrash } from 'react-icons/bi';


export const ModelChooser = () => {

    const highlightedModelId = useNinjaStore(state => state.highlightedModelId);
    const setModelScale = useNinjaStore(state => state.setModelScale);
    const setModelRotation = useNinjaStore(state => state.setModelRotation);
    const addModelFile = useNinjaStore(state => state.addModelFile);
    const removeModelFile = useNinjaStore(state => state.removeModelFile);
    const modelFiles = useNinjaStore(state => state.modelFiles);

    const onDrop = useCallback((acceptedFiles: any) => {

        for (const file of acceptedFiles) {
            const url = URL.createObjectURL(file);

            addModelFile({
                id: uuid(),
                name: file.name,
                url,
                fileData: file,
                scale: 1,
                rotation: 0
            });
        }



    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });



    return (
        <div>
            {/* <p className='text-xs text-zinc-400 mb-1 text-center'>Models</p> */}

            <div {...getRootProps()} className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 rounded cursor-pointer text-xs text-zinc-400'>
                <input {...getInputProps()} />
                <p>Drop or click here to load models</p>
            </div>

            <Accordion.Root type='multiple'>
                {
                    modelFiles.map(modelFile =>
                        <Accordion.Item key={modelFile.id} value={modelFile.id} className='w-full'>
                            <Accordion.Header className='w-full'>
                                <Accordion.Trigger className={`${highlightedModelId === modelFile.id ? 'bg-green-700' : 'bg-zinc-700 data-[state=open]:bg-green-700'} px-3 hover:bg-zinc-400  w-full p-1 flex justify-between`}>
                                    <p className='text-zinc-300'>{modelFile.name}</p>
                                </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content className='bg-zinc-700 p-3'>
                                <button className='hover:bg-zinc-700 text-zinc-200 p-1' onClick={() => { setModelScale(modelFile.id, 1); setModelRotation(modelFile.id, 1); }}><BiRefresh /></button>
                                <button className='hover:bg-zinc-700 text-zinc-200 p-1' onClick={() => removeModelFile(modelFile.id)}><BiSolidTrash /></button>


                                <Form.Root onSubmit={e => e.preventDefault()}>
                                    <Form.Field name='scale' className='flex items-center justify-between'>
                                        <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Scale</Form.Label>
                                        <Form.Control asChild>
                                            <input
                                                className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                                step={0.1}
                                                type='number'
                                                value={modelFile.scale}
                                                onChange={(e) => setModelScale(modelFile.id, Number(e.target.value))} />
                                        </Form.Control>
                                    </Form.Field>

                                    <Form.Field name='rotation' className='flex items-center justify-between'>
                                        <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Rotation</Form.Label>
                                        <Form.Control asChild>
                                            <input
                                                className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                                step={10}
                                                type='number'
                                                value={modelFile.rotation}
                                                onChange={(e) => setModelRotation(modelFile.id, Number(e.target.value))} />
                                        </Form.Control>
                                    </Form.Field>


                                </Form.Root>
                            </Accordion.Content>
                        </Accordion.Item>
                    )
                }
            </Accordion.Root>
        </div>
    )
}