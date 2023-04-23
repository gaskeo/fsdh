import ansiEscapes from "ansi-escapes";

import {whiteAndGreen} from "../../utils/index";

export function render(items: string[], setSign: (index: number, item: string) => string) {
    process.stdout.write((
        items.map((item, index) => setSign(index, item))).join("\n") + "\n");
}

export function clean(lines: number) {
    process.stdout.write(ansiEscapes.eraseLines(lines));
}

export function prepare(title: string, listener: (key: Buffer) => void) {
    process.stdin.setRawMode(true);
    process.stdin.resume();

    title && process.stdout.write(title + "\n");
    process.stdout.write(`${whiteAndGreen("↑ or W")} up\t` +
        `${whiteAndGreen("↓ or S")} down\t` +
        `${whiteAndGreen("Space")} toggle\t` +
        `${whiteAndGreen("Enter")} apply\n`);
    process.stdout.write(ansiEscapes.cursorHide);
    process.stdin.on("data", listener);
}

export function after(listener: (key: Buffer) => void) {
    process.stdout.write(ansiEscapes.cursorShow);
    process.stdin.setRawMode(false).resume();
    process.stdin.off("data", listener);
}

export const buttons = {
    exit: "\x03",
    upButton: "\u001b[A",
    downButton: "\u001b[B",
    space: "\u0020",
    enter: "\u000d"
};
