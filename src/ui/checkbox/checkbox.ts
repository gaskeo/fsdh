import ansiEscapes from "ansi-escapes";
import {underline, whiteAndGreen} from "../../utils/index.js";

const exit = "\x03";
const upButton = "\u001b[A";
const downButton = "\u001b[B";
const space = "\u0020";
const enter = "\u000d";

interface Checkbox {
    items: string[];
    defaultSelected?: boolean | number[];
    defaultPosition?: number;
    ctrlCErrorMessage?: string;
    title?: string;
}

async function checkbox({
                            title,
                            items,
                            defaultSelected,
                            defaultPosition,
                            ctrlCErrorMessage
                        }: Checkbox) {
    return new Promise<number[]>((resolve, reject) => {
            function buttonHandler(button: string) {
                if (button === exit) {
                    return reject(new Error(ctrlCErrorMessage));
                }

                if ([upButton, "w"].includes(button) && currentPosition !== 0) {
                    currentPosition--;
                    clean();
                    render();
                } else if ([downButton, "s"].includes(button) && currentPosition !== items.length - 1) {
                    currentPosition++;
                    clean();
                    render();
                } else if (button === space) {
                    selectedItems[currentPosition] = 1 - selectedItems[currentPosition];
                    clean();
                    render();
                } else if (button === enter) {
                    after();
                    resolve(selectedItems);
                }
            }

            function setSign(index: number, item: string) {
                let output = selectedItems[index] ? "☑ " : "☐ ";
                output += index === currentPosition ? underline(item) : item;
                return output;
            }

            function render() {
                process.stdout.write((items.map((item, index) => setSign(index, item))).join("\n"));
            }

            function clean() {
                process.stdout.write(ansiEscapes.eraseLines(items.length));
            }

            function prepare() {
                title && process.stdout.write(title + "\n");
                process.stdout.write(`${whiteAndGreen("↑ or w")} up\t` +
                    `${whiteAndGreen("↓ or s")} down\t` +
                    `${whiteAndGreen("space")} toggle\t` +
                    `${whiteAndGreen("enter")} apply\n`);
                process.stdin.setRawMode(true).resume();
                process.stdout.write(ansiEscapes.cursorHide);
                process.stdin.on("data", (buffer) => buttonHandler(buffer.toString())
                );
            }

            function after() {
                process.stdin.setRawMode(false).resume();
                process.stdout.write("\n" + ansiEscapes.cursorShow);
            }

            let currentPosition = defaultPosition || 0;
            let selectedItems: number[];

            if (typeof defaultSelected === "object" && defaultSelected.length === items.length) {
                selectedItems = defaultSelected;
            } else if (defaultSelected === true) {
                selectedItems = items.map(() => 1);
            } else {
                selectedItems = items.map(() => 0);
            }

            prepare();
            render();
        }
    );
}


export {checkbox};