const whiteAndGreen = (text: string) => `\x1b[97m\x1b[42m${text}\x1b[0m`;

const underline = (text: string) => `\x1b[4m${text}\x1b[0m`;

export {whiteAndGreen, underline};