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
                    if (selectedItems[index]) return "☑  ";
                    return "☐  ";
                } else if (selectedItems[index]) return "☑ ";
                return "☐ ";
            }

            function render() {
                process.stdout.write((items.map((item, index) => `${setSign(index)} ${item}`)).join("\n"));
            }

            function clean() {
                process.stdout.write(ansiEscapes.eraseLines(items.length));
            }

            function prepare() {
                title && process.stdout.write(title + "\n");
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

interface VectorToValues<T> {
    vector: number[];
    data: T[];
}

function vectorToValues<T>({vector, data}: VectorToValues<T>): T[] {
    if (vector.length !== data.length) {
        return [];
    }

    return data.filter((_, index) => vector[index]);
}

export {checkbox, vectorToValues};