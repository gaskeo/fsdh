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

const exampleSrcPaths: {next: {[folder in FsdFolders]: string}} = {
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

const exampleDestPaths: {next: {[folder in FsdFolders]: string}} = {
    next: {
        "shared": "shared",
        "entities": "entities/exampleEntity",
        "features": "features/exampleFeature",
        "widgets": "widgets/exampleWidget",
        "layouts": "layouts/exampleLayout",
        "pages": "pages/examplePage",
        "app": "app",
    }
};


export {fsdFolders, exampleSrcPaths, exampleDestPaths};
export type {FsdFolders};