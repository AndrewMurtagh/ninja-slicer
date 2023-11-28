import * as Accordion from '@radix-ui/react-accordion';
import * as Tabs from '@radix-ui/react-tabs';
import { BiRefresh } from 'react-icons/bi';
import * as Form from '@radix-ui/react-form';
import { useSettingsStore } from '../lib/settings-store';


export const Settings = () => {

    const settings = useSettingsStore(state => state.settings);
    const updateSetting = useSettingsStore(state => state.updateSetting);
    const resetSettings = useSettingsStore(state => state.resetSettings);


    return (
        <Tabs.Root defaultValue='print' className='flex flex-col'>

            <Tabs.List className='w-full flex border-l border-r border-t border-zinc-500'>
                <Tabs.Trigger value='print' className='p-1 justify-center hover:bg-zinc-800 bg-zinc-900 flex grow border-l border-zinc-500 text-white data-[state=active]:bg-green-700'>Print</Tabs.Trigger>
                <Tabs.Trigger value='filament' className='p-1 justify-center hover:bg-zinc-800 bg-zinc-900 flex grow border-l border-zinc-500 text-white data-[state=active]:bg-green-700'>Filament</Tabs.Trigger>
                <Tabs.Trigger value='machine' className='p-1 justify-center hover:bg-zinc-800 bg-zinc-900 flex grow border-l border-zinc-500 text-white data-[state=active]:bg-green-700'>Machine</Tabs.Trigger>
                <button className='p-1 justify-center hover:bg-zinc-800 bg-zinc-900 flex items-center justify-center grow border-l border-zinc-500 text-white' onClick={resetSettings}><BiRefresh /></button>
            </Tabs.List>

            <Tabs.Content value='print'>
                <Accordion.Root type='multiple'>
                    <Accordion.Item value='layers'>
                        <Accordion.Header>
                            <Accordion.Trigger className='text-zinc-300 border border-zinc-500 bg-zinc-900 w-full data-[state=open]:bg-green-700'>Layers</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className='text-zinc-300 p-3 border-x border-zinc-500'>
                            <Form.Root onSubmit={e => e.preventDefault()}>
                                <Form.Field name='layer_height' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Layer height [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={0.05}
                                            type='number'
                                            value={settings.layer_height}
                                            onChange={(e) => updateSetting('layer_height', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>

                                <Form.Field name='first_layer_height' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>First layer height [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={0.05}
                                            type='number'
                                            value={settings.first_layer_height}
                                            onChange={(e) => updateSetting('first_layer_height', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>


                            </Form.Root>
                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value='infill'>
                        <Accordion.Header>
                            <Accordion.Trigger className='text-zinc-300 border border-zinc-500 bg-zinc-900 w-full data-[state=open]:bg-green-700'>Infill</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className='text-zinc-300 p-3 border-x border-zinc-500'>
                            <Form.Root onSubmit={e => e.preventDefault()}>
                                <Form.Field name='fill_density' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Fill density [decimal]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={1}
                                            type='number'
                                            value={settings.fill_density}
                                            onChange={(e) => updateSetting('fill_density', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                            </Form.Root>
                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value='skirt_brim'>
                        <Accordion.Header>
                            <Accordion.Trigger className='text-zinc-300 border border-zinc-500 bg-zinc-900 w-full data-[state=open]:bg-green-700'>Skirt &amp; brim</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className='text-zinc-300 p-3 border-x border-zinc-500 border-b border-zinc-500'>
                            <Form.Root onSubmit={e => e.preventDefault()}>
                                <Form.Field name='skirt_distance' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Skirt distance [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={1}
                                            type='number'
                                            value={settings.skirt_distance}
                                            onChange={(e) => updateSetting('skirt_distance', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>

                                <Form.Field name='brim_width' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Brim width [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={1}
                                            type='number'
                                            value={settings.brim_width}
                                            onChange={(e) => updateSetting('brim_width', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                            </Form.Root>
                        </Accordion.Content>
                    </Accordion.Item>


                </Accordion.Root>
            </Tabs.Content>

            <Tabs.Content value='filament'>

                <Accordion.Root type='multiple'>

                    <Accordion.Item value='filament'>
                        <Accordion.Header>
                            <Accordion.Trigger className='text-zinc-300 border border-zinc-500 bg-zinc-900 w-full data-[state=open]:bg-green-700'>Filament</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className='text-zinc-300 p-3 border-x border-zinc-500'>

                            <Form.Root onSubmit={e => e.preventDefault()}>
                                <Form.Field name='filament_diameter' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Filament diameter [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={0.01}
                                            type='number'
                                            value={settings.filament_diameter}
                                            onChange={(e) => updateSetting('filament_diameter', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                            </Form.Root>

                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value='cooling'>
                        <Accordion.Header>
                            <Accordion.Trigger className='text-zinc-300 border border-zinc-500 bg-zinc-900 w-full data-[state=open]:bg-green-700'>Cooling</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className='text-zinc-300 p-3 border-x border-zinc-500 border-b border-zinc-500'>
                            <Form.Root onSubmit={e => e.preventDefault()}>
                                <Form.Field name='temperature' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Temperature [C]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={10}
                                            type='number'
                                            value={settings.temperature}
                                            onChange={(e) => updateSetting('temperature', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field name='first_layer_temperature' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>First layer temperature [C]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={10}
                                            type='number'
                                            value={settings.first_layer_temperature}
                                            onChange={(e) => updateSetting('first_layer_temperature', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field name='bed_temperature' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Bed temperature [C]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={10}
                                            type='number'
                                            value={settings.bed_temperature}
                                            onChange={(e) => updateSetting('bed_temperature', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field name='first_layer_bed_temperature' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>First layer bed temp. [C]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={10}
                                            type='number'
                                            value={settings.first_layer_bed_temperature}
                                            onChange={(e) => updateSetting('first_layer_bed_temperature', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                            </Form.Root>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>

            </Tabs.Content>



            <Tabs.Content value='machine'>

                <Accordion.Root type='multiple'>

                    <Accordion.Item value='machine'>
                        <Accordion.Header>
                            <Accordion.Trigger className='text-zinc-300 border border-zinc-500 bg-zinc-900 w-full data-[state=open]:bg-green-700'>Machine</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className='text-zinc-300 p-3 border-x border-zinc-500'>
                            <Form.Root onSubmit={e => e.preventDefault()}>
                                <Form.Field name='x_bed_width' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Bed width [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={10}
                                            type='number'
                                            value={settings.x_bed_width}
                                            onChange={(e) => updateSetting('x_bed_width', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field name='x_bed_depth' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Bed depth [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={10}
                                            type='number'
                                            value={settings.x_bed_depth}
                                            onChange={(e) => updateSetting('x_bed_depth', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field name='x_bed_height' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Bed height [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={10}
                                            type='number'
                                            value={settings.x_bed_height}
                                            onChange={(e) => updateSetting('x_bed_height', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                            </Form.Root>
                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value='extruder'>
                        <Accordion.Header>
                            <Accordion.Trigger className='text-zinc-300 border border-zinc-500 bg-zinc-900 w-full data-[state=open]:bg-green-700'>Extruder</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className='text-zinc-300 p-3 border-x border-zinc-500 border-b border-zinc-500'>
                            <Form.Root onSubmit={e => e.preventDefault()}>
                                <Form.Field name='nozzle_diameter' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Nozzle diameter [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={0.05}
                                            type='number'
                                            value={settings.nozzle_diameter}
                                            onChange={(e) => updateSetting('nozzle_diameter', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field name='retract_length' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Retract length [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={0.05}
                                            type='number'
                                            value={settings.retract_length}
                                            onChange={(e) => updateSetting('retract_length', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field name='retract_lift' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Retract lift [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={0.05}
                                            type='number'
                                            value={settings.retract_lift}
                                            onChange={(e) => updateSetting('retract_lift', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                            </Form.Root>
                        </Accordion.Content>
                    </Accordion.Item>

                </Accordion.Root>

            </Tabs.Content>

        </Tabs.Root>

    )
}