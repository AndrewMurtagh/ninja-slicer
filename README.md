# Ninja slicer

[Demo site](https://ninja-slicer.vercel.app/)

![Screenshot](/res/ninja-slicer.png)

A (very incomplete) project to build a browser-based 3D printing slicer.

Built with Next.js, Three.js, Zustand, Radix, TailwindCSS, PrusaSlicer, and Vercel.

The actual slicer used is [PrusaSlicer [2.7.0]](https://github.com/prusa3d/PrusaSlicer), full credit for that work lies with them.


<details>
<summary>TODO</summary>

- [ ] Show upload and slicing progress
- [ ] Scale model axes independently
- [ ] Keyboard shortcuts
- [ ] Check model is not out of bounds
- [ ] Check file type and size is okay when uploaded
- [ ] Add machine model to scene
- [ ] Run slicer as library instead of through CMD line
- [ ] Process slicing jobs in the background instead 
- [ ] Update `canSlice` correctly
- [ ] Hover over model in sidebar should highlight it in the build space
- [ ] Clicking on a model will focus the model behind it
- [ ] Toggle axes and build space view
- [ ] Move model around
- [ ] Validate settings
- [ ] Move `buildSpaceDimens` to settings store
- [ ] Import printers and pre-fill settings
- [ ] Limit to one model only
- [ ] Show result of slicing to user
- [ ] merge settings-store and ninja-store
</details>





<!-- PrusaSlicer-2.7.0+linux-x64-GTK3-202311231454.tar.bz2 and PrusaSlicer-2.7.0+MacOS-universal-202311231501.dmg -->
<!-- Both of which are tracked using Git LFS, it will need to be enabled in Vercel. -->



## Disclaimer

This has been built as a fun project and has not been extensively tested on real printers. Please use with caution. The authors do not claim responsibility for any damage caused.


## Notes

PrusaSlicer command takes the form below. The values here are the defaults used.

```
.prusaslicer \
    --export-gcode \
    --ensure-on-bed \
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
    --bed-shape 0x0,200x0,200x200,0x200 \
    --nozzle-diameter 0.4 \
    --retract-length 2 \
    --retract-lift 0 \
    --loglevel 3 \
    --output ./output.gcode \
    ./input.stl
```

## License

This work is licensed under AGPL v3.