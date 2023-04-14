import ansiEscapes from "ansi-escapes";
import {underline, whiteAndGreen} from "../../utils/index.js";

const exit = "\x03";
const upButton = "\u001b[A";
const downButton = "\u001b[B";
const space = "\u0020";
const enter = "\u000d";

interface Radio {
    items: string[];
    defaultSelected?: number;
    defaultPosition?: number;
    ctrlCErrorMessage?: string;
    title?: string;
}

async function radio({
                         title,
                         items,
                         defaultSelected,
                         defaultPosition,
                         ctrlCErrorMessage
                     }: Radio) {
    return new Promise<number>((resolve, reject) => {
            const listener = (buffer: Buffer) => buttonHandler(buffer.toString());

            function buttonHandler(button: string) {
                if (button === exit) {
                    after();
                    return reject(new Error(ctrlCErrorMessage));
                }

                if ([upButton, "w"].includes(button)) {
                    if (currentPosition > 0) {
                        currentPosition--;
                    } else return;
                } else if ([downButton, "s"].includes(button) && currentPosition !== items.length - 1) {
                    currentPosition++;
                } else if (button === space) {
                    selectedItem = currentPosition;
                } else if (button === enter) {
                    after();
                    resolve(selectedItem);
                    return;
                }
                clean();
                render();
            }

            function setSign(index: number, item: string) {
                let output = selectedItem === index ? "☒ " : "☐ ";
                output += index === currentPosition ? underline(item) : item;
                return output;
            }

            function render() {
                process.stdout.write((
                    items.map((item, index) => setSign(index, item))).join("\n") + "\n");
            }

            function clean() {
                process.stdout.write(ansiEscapes.eraseLines(items.length + 1));
            }

            function prepare() {
                process.stdin.setRawMode(true);
                process.stdin.resume();

                title && process.stdout.write(title + "\n");
                process.stdout.write(`${whiteAndGreen("↑ or w")} up\t` +
                    `${whiteAndGreen("↓ or s")} down\t` +
                    `${whiteAndGreen("space")} toggle\t` +
                    `${whiteAndGreen("enter")} apply\n`);
                process.stdout.write(ansiEscapes.cursorHide);
                process.stdin.on("data", listener);
            }

            function after() {
                process.stdin.setRawMode(false).resume();
                process.stdout.write(ansiEscapes.cursorShow);
                process.stdin.off("data", listener);
            }

            let currentPosition = defaultPosition || 0;
            let selectedItem: number;

            if (defaultSelected && 0 <= defaultSelected && defaultSelected < items.length) {
                selectedItem = defaultSelected;
            } else selectedItem = 0;

            prepare();
            render();
        }
    );
}


export {radio};