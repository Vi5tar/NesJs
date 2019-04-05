# NesJs

Yet another NES emulator, in javascript.

In development.

The CPU emulation seems to be mostly functional, although it is not cycle-accurate and none of the undocumented opcodes are implemented. The PPU emulation also seems to be mostly functional, but is also not cycle-accurate. There is some rudimentary APU emulation (only the 2 pulse channels, and no sweeps, envelopes or length counters).

Supports mapper 0 (NROM), 1 (MMC1), 2 (UxROM), 3 (CNROM), 4 (MMC3) and 7 (AxROM). The MMC3's IRQ emulation is not really accurate though.

Controllers 1 and 2 are emulated, with the following mapping:

| Button | Controller 1    | Controller 2 |
| ------ | --------------- | ------------ |
| Left   | Left arrow key  | J            |
| Right  | Right arrow key | L            |
| Up     | Up arrow key    | I            |
| Down   | Down arrow key  | K            |
| Start  | Enter           | P            |
| Select | Shift           | O            |
| B      | A               | T            |
| A      | Z               | G            |

Roms can be loaded from zip-files as well, which will load the first file with a .nes extension it can find.

# Usage

- Clone this repository.
- Download [zip.js](https://gildas-lormeau.github.io/zip.js/).
- Create a `lib` folder and copy `WebContent/zip.js` and `WebContent/inflate.js` from zip.js into it.
- Open `index.html` in a browser. Messing around with the browsers autoplay policy might be required.

Commenting out `js/main.js`, and uncommenting the `js/nestest.nes.js`, `js/nestest.log.js` and `js/testing.js` scripts runs a simple test comparing this emulator running nestest with a 'golden' nestest log. Currently runs equally until it starts using undocumented opcodes.

# Credits

Thanks to the resources at [the nesdev wiki](http://wiki.nesdev.com/w/index.php/Nesdev_Wiki) and [the nesdev forums](https://forums.nesdev.com) for the test roms, documentation and some code snippets used for this.

Uses the [zip.js](https://gildas-lormeau.github.io/zip.js/) library for zipped rom loading support.
