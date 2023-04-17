# FSDH 

Package for Frontend developers who use [FSD architecture](https://feature-sliced.design/).

## Usage

### `fsdh init`

You can create folders and example files for your project.

![init.gif](doc/images/overview/init.gif?raw=true)

`fsdh` can create this structure:
```
.
├── app
│   └── hocs
│       └── exampleHoc
│           ├── index.ts
│           └── model
│               └── exampleHoc.tsx
├── entities
│   ├── index.ts
│   └── ui
│       └── exampleEntity.tsx
├── features
│   ├── index.ts
│   └── ui
│       └── exampleFeature.tsx
├── layouts
│   ├── index.ts
│   └── ui
│       └── exampleLayout.tsx
├── pages
│   ├── index.ts
│   └── ui
│       └── examplePage.tsx
├── shared
│   └── ui
│       └── exampleComponent
│           ├── index.ts
│           └── ui
│               └── exampleComponent.tsx
└── widgets
    ├── index.ts
    └── ui
        └── exampleWidget.tsx
```

### `fsdh create`

You can create **slices** with this command. 

![create.gif](doc/images/overview/create.gif?raw=true)

This command will create this architecture of slice: 

* `index.ts` - has import and export statement 
* `ui/{name}.tsx` - has empty interface for props, empty `styled` const if `styled-components` specified
* `model/{name}.ts` - has empty model function
* `styles/{name}.module.[s]css` - has empty root class for your component

If you select `css/scss/styled-components` option, `fsdh` generate slice only with one of them. Priority of these options: 
1. `styled-components`
2. `scss`
3. `css`

For example, if you select `styled-components` and `scss`, `fsdh` will generate slice with `styled-components`.

#### Params

You can create slice in non-interactive mode:

```
fsdh create {path} {options}
```

Options: 
* `m`: add `model`
* `sc`: add `styled-components`
* `s`: add `scss`
* `c` add `css`

> `cs` option create slice with `scss` because of priority of styling options.

For example, this command create slice `myWidget` in path `widgets/` with `model` and `styled-components`: 

```
fsdh create widgets/myWidget msc
```

## Installation 

### NPM

Use a npm package manager:

```
npm i --global fsdh
```

### Source

You can build `fsdh` from sources: 

```
git clone https://github.com/gaskeo/fsdh
cd fsdh
npm install 
npm build
```

After this commands you can run `fsdh`: 

```
npm start [init | create]
```

