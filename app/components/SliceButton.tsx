import { MouseEvent } from 'react';
import { useNinjaStore } from '../lib/store';
import axios, { AxiosError } from 'axios';
import { useSettingsStore } from '../lib/settings-store';
import { Spinner } from './Spinner';


export
    const SliceButton = () => {

        const canSlice = useNinjaStore(state => state.canSlice);
        const modelFiles = useNinjaStore(state => state.modelFiles);
        const isSlicing = useNinjaStore(state => state.isSlicing);
        const setIsSlicing = useNinjaStore(state => state.setIsSlicing);
        const sliceError = useNinjaStore(state => state.sliceError);
        const setSliceError = useNinjaStore(state => state.setSliceError);
        const settings = useSettingsStore(state => state.settings);

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
                setIsSlicing(true);
                setSliceError(null);
                const res = await axios({
                    method: 'POST',
                    url: '/api/slice',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'text/plain',
                    },
                    params: {
                        settings: JSON.stringify(settings)
                    }
                });
                console.log(res.data)
                setSliceError(null);

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setSliceError(error.response?.data.failure_reason);
                } else {
                    setSliceError('An unknown error occured');
                }
                setIsSlicing(false);

            } finally {
                setTimeout(() => {
                    setSliceError(null);
                }, 3000)
            }

        }

        return (
            <div className='flex flex-col'>
            <button className='py-1 px-3 text-white flex flex-row justify-center items-center hover:bg-green-300 bg-green-400 disabled:opacity-40' disabled={!isSlicing && !canSlice} onClick={onSlice}>
                <span>Slice</span>
                <span>&ensp;</span>
                <span>{isSlicing && <Spinner />} </span>
            </button>

            {sliceError && <p className='text-red-400 text-sm text-center mt-2'>{sliceError}</p>}
            </div>
        )
    }