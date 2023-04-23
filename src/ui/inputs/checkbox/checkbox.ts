import {underline} from "../../../utils/index";
import {after, buttons, clean, prepare, render} from "../shared";

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
            clean(3);
            const listener = (buffer: Buffer) => buttonHandler(buffer.toString());

            function buttonHandler(button: string) {
                if (button === buttons.exit) {
                    after(listener);
                    return reject(new Error(ctrlCErrorMessage));
                }

                if ([buttons.upButton, "w"].includes(button)) {
                    if (currentPosition > 0) {
                        currentPosition--;
                    } else return;
                } else if ([buttons.downButton, "s"].includes(button) && currentPosition !== items.length - 1) {
                    currentPosition++;
                } else if (button === buttons.space) {
                    selectedItems[currentPosition] = 1 - selectedItems[currentPosition];
                } else if (button === buttons.enter) {
                    after(listener);
                    resolve(selectedItems);
                    return;
                }
                clean(items.length + 1);
                render(items, setSign);
            }

            function setSign(index: number, item: string) {
                let output = selectedItems[index] ? "☑ " : "☐ ";
                output += index === currentPosition ? underline(item) : item;
                return output;
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

            prepare(title || "", listener);
            render(items, setSign);
        }
    );
}


export {checkbox};