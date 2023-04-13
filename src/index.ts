import {checkbox} from "./ui/checkbox.js";

async function main() {
    console.log("Select necessary dirs:");
    const selectedDirs = await checkbox({
        items: [
            "pages",
            "layouts",
            "widgets",
            "features",
            "entities",
            "shared"
        ]
    });
    console.log(selectedDirs);
}

main();
