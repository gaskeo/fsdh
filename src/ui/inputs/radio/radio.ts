import {underline} from "../../../utils/index";
import {after, buttons, clean, prepare, render} from "../shared";

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
                    selectedItem = currentPosition;
                } else if (button === buttons.enter) {
                    after(listener);
                    resolve(selectedItem);
                    return;
                }
                clean(items.length + 1);
                render(items, setSign);
            }

            function setSign(index: number, item: string) {
                let output = selectedItem === index ? "☒ " : "☐ ";
                output += index === currentPosition ? underline(item) : item;
                return output;
            }

            let currentPosition = defaultPosition || 0;
            let selectedItem: number;

            if (defaultSelected && 0 <= defaultSelected && defaultSelected < items.length) {
                selectedItem = defaultSelected;
            } else selectedItem = 0;

            prepare(title || "", listener);
            render(items, setSign);
        }
    );
}


export {radio};