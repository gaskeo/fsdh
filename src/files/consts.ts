type FsdFolders = "app" | "pages" | "layouts" | "widgets" | "features" | "entities" | "shared";

const fsdFolders: FsdFolders[] = [
    "app",
    "pages",
    "layouts",
    "widgets",
    "features",
    "entities",
    "shared"
];

const examplePaths: {next: {[folder in FsdFolders]: string}} = {
    next: {
        "shared": "assets/next/exampleShared",
        "entities": "assets/next/exampleEntity",
        "features": "assets/next/exampleFeature",
        "widgets": "assets/next/exampleWidget",
        "layouts": "assets/next/exampleLayout",
        "pages": "assets/next/examplePage",
        "app": "assets/next/exampleApp",
    }
};

export {fsdFolders, examplePaths};
export type {FsdFolders};