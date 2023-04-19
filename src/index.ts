import {create, init, version} from "./commands/index";

async function main() {
    const args = process.argv;
    if (args.length <= 2) {
        return;
    }

    const command = args[2];

    if (["v", "V", "version", "Version", "--version", "-v", "-V"].includes(command)) return version();
    if (command === "init") return init();
    if (command === "create") return create();
}

main().catch((reason) => {
    console.log(`\nexit: ${reason?.message}`);
}).then(() => process.exit(0));

process.on('SIGINT', function () {
    process.exit();
});