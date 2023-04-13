import ansiEscapes from "ansi-escapes";

const exit = "\x03";
const upButton = "\u001b[A";
const downButton = "\u001b[B";
const space = "\u0020";
const enter = "\u000d";

function greenBackground(content: string) {
    return `\x1b[1;42m${content}\x1b[0m`;
}

interface Checkbox {
    items: string[];
    defaultSelected?: boolean | number[];
    defaultPosition?: number;
}

async function checkbox({items, defaultSelected, defaultPosition}: Checkbox) {
    return new Promise((resolve, reject) => {
            function buttonHandler(button: string) {
                if (button === exit) {
                    return reject(new Error('User abort'));
                }

                if (button === upButton && currentPosition !== 0) {
                    currentPosition--;
                    clean();
                    render();
                } else if (button === downButton && currentPosition !== items.length - 1) {
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

            function setSign(index: number) {
                if (index === currentPosition) {
                    if (selectedItems[index]) return greenBackground("[X]");
                    return greenBackground("[ ]");
                } else if (selectedItems[index]) return "[X]";
                return "[ ]";
            }

            function render() {
                process.stdout.write((items.map((item, index) => `${setSign(index)} ${item}`)).join("\n"));
            }

            function clean() {
                process.stdout.write(ansiEscapes.eraseLines(items.length));
            }

            function prepare() {
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