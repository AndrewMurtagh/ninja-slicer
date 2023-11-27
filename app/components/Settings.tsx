import * as Accordion from '@radix-ui/react-accordion';
import * as Tabs from '@radix-ui/react-tabs';
import { BiRefresh } from 'react-icons/bi';
import * as Form from '@radix-ui/react-form';

type State = {
    print: {
        layers: {
            'layer-height': number;
            'first-layer-height': number;
        },
        infile: {
            'fill-density': number;
        }
    }
}

export const Settings = () => {


    const onRefreshSettings = () => {
        // TODO
        alert('Refreshing all settings')
    }

    const settings = {
        print: {
            layers: {
                layer_height: 0.3, // mm
                first_layer_height: 0.35, //  mm
            },
            infill: {
                fill_density: 20, // %
            },
            skirt_and_brim: {
                skirt_distance: 6, // mm
                brim_width: 0, // mm
            },
            support: {
                // TODO
            }
        },
        filament: {
            filament: {
                diameter: 1.75, // mm
            },
            cooling: {
                temperature: 200, // c?
                first_layer_temperature: 200, // c?
                bed_temperature: 0, // c?
                first_layer_bed_temperature: 0, // c?
            }
        },
        machine: {
            machine: {
                width: 200, // mm
                depth: 200, // mm
                height: 200 // mm
            },
            extruder: {
                nozzle_diameter: 0.4, // mm
                retract_length: 2, // mm
                retract_lift: 0, // mm
            }
        }
    }

    const onSettingsChange = (setting: string, value: string | number) => {
        alert('setting changed')
    }

    return (
        <Tabs.Root defaultValue='print' className='flex flex-col'>

            <Tabs.List className='w-full flex border-l border-r border-t border-zinc-500'>
                <Tabs.Trigger value='print' className='p-1 justify-center hover:bg-zinc-800 bg-zinc-900 flex grow border-l border-zinc-500 text-white data-[state=active]:bg-green-700'>Print</Tabs.Trigger>
                <Tabs.Trigger value='filament' className='p-1 justify-center hover:bg-zinc-800 bg-zinc-900 flex grow border-l border-zinc-500 text-white data-[state=active]:bg-green-700'>Filament</Tabs.Trigger>
                <Tabs.Trigger value='machine' className='p-1 justify-center hover:bg-zinc-800 bg-zinc-900 flex grow border-l border-zinc-500 text-white data-[state=active]:bg-green-700'>Machine</Tabs.Trigger>
                <button className='p-1 justify-center hover:bg-zinc-800 bg-zinc-900 flex items-center justify-center grow border-l border-zinc-500 text-white' onClick={onRefreshSettings}><BiRefresh /></button>
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
                                            value={settings.print.layers.layer_height}
                                            onChange={(e) => onSettingsChange('layer_height', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>

                                <Form.Field name='first_layer_height' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>First layer height [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={0.05}
                                            type='number'
                                            value={settings.print.layers.first_layer_height}
                                            onChange={(e) => onSettingsChange('first_layer_height', Number(e.target.value))} />
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
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Fill density [%]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={1}
                                            type='number'
                                            value={settings.print.infill.fill_density}
                                            onChange={(e) => onSettingsChange('fill_density', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                            </Form.Root>
                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value='skirt_brim'>
                        <Accordion.Header>
                            <Accordion.Trigger className='text-zinc-300 border border-zinc-500 bg-zinc-900 w-full data-[state=open]:bg-green-700'>Skirt &amp; brim</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className='text-zinc-300 p-3 border-x border-zinc-500'>
                            <Form.Root onSubmit={e => e.preventDefault()}>
                                <Form.Field name='skirt_distance' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Skirt distance [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={1}
                                            type='number'
                                            value={settings.print.skirt_and_brim.skirt_distance}
                                            onChange={(e) => onSettingsChange('skirt_distance', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>

                                <Form.Field name='brim_width' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Brim width [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={1}
                                            type='number'
                                            value={settings.print.skirt_and_brim.brim_width}
                                            onChange={(e) => onSettingsChange('brim_width', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                            </Form.Root>
                        </Accordion.Content>
                    </Accordion.Item>

                    <Accordion.Item value='support'>
                        <Accordion.Header>
                            <Accordion.Trigger className='text-zinc-300 border border-zinc-500 bg-zinc-900 w-full data-[state=open]:bg-green-700'>Support</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className='text-zinc-300 p-3 border-x border-zinc-500 border-b border-zinc-500'>
                            <p>TODO: support settings</p>
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
                                <Form.Field name='diameter' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Diameter [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={0.01}
                                            type='number'
                                            value={settings.filament.filament.diameter}
                                            onChange={(e) => onSettingsChange('diameter', Number(e.target.value))} />
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
                                            value={settings.filament.cooling.temperature}
                                            onChange={(e) => onSettingsChange('temperature', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field name='first_layer_temperature' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>First layer temperature [C]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={10}
                                            type='number'
                                            value={settings.filament.cooling.first_layer_temperature}
                                            onChange={(e) => onSettingsChange('first_layer_temperature', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field name='bed_temperature' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Bed temperature [C]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={10}
                                            type='number'
                                            value={settings.filament.cooling.bed_temperature}
                                            onChange={(e) => onSettingsChange('bed_temperature', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field name='first_layer_bed_temperature' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>First layer bed temp. [C]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={10}
                                            type='number'
                                            value={settings.filament.cooling.first_layer_bed_temperature}
                                            onChange={(e) => onSettingsChange('first_layer_bed_temperature', Number(e.target.value))} />
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
                                <Form.Field name='width' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Bed width [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={10}
                                            type='number'
                                            value={settings.machine.machine.width}
                                            onChange={(e) => onSettingsChange('width', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field name='depth' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Bed depth [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={10}
                                            type='number'
                                            value={settings.machine.machine.depth}
                                            onChange={(e) => onSettingsChange('depth', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field name='height' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Bed height [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={10}
                                            type='number'
                                            value={settings.machine.machine.height}
                                            onChange={(e) => onSettingsChange('height', Number(e.target.value))} />
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
                                            value={settings.machine.extruder.nozzle_diameter}
                                            onChange={(e) => onSettingsChange('nozzle_diameter', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field name='retract_length' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Retract length [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={0.05}
                                            type='number'
                                            value={settings.machine.extruder.retract_length}
                                            onChange={(e) => onSettingsChange('retract_length', Number(e.target.value))} />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Field name='retract_lift' className='flex items-center justify-between'>
                                    <Form.Label className='text-xs text-zinc-400 mb-1 text-center'>Retract lift [mm]</Form.Label>
                                    <Form.Control asChild>
                                        <input
                                            className='bg-zinc-600 border-zinc-500 py-2 px-3 mb-3 cursor-pointer rounded text-xs text-zinc-400'
                                            step={0.05}
                                            type='number'
                                            value={settings.machine.extruder.retract_lift}
                                            onChange={(e) => onSettingsChange('retract_lift', Number(e.target.value))} />
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