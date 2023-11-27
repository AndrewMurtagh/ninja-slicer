import { MouseEvent } from 'react';
import { useNinjaStore } from '../lib/store';
import axios from 'axios';


export 
const SliceButton = () => {
    const canSlice = useNinjaStore(state => state.canSlice);
    const modelFiles = useNinjaStore(state => state.modelFiles);

    const onSlice = async (e: MouseEvent<HTMLElement>) => {

        if (modelFiles.length === 0) {
            alert('You have not uploaded a model to slice.');
        }

        // TODO 
        // - check the model is in the build space

        const formData = new FormData();
        for (const modelFile of modelFiles) {
            formData.append(modelFile.id, modelFile.fileData);
        }


        try {
            const res = await axios({
                method: 'POST',
                url: '/api/slice',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    settings: 'TODO'
                }
            });
            console.log(res.status)
            console.log(res.data)
        } catch (error) {
            console.log(error)

        }

    }

    return (
        <button className='py-1 px-3 text-white hover:bg-green-300 bg-green-400 disabled:opacity-40' disabled={!canSlice} onClick={onSlice}>Slice</button>
    )
}