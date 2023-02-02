"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const prompts_1 = __importDefault(require("prompts"));
const create_1 = __importDefault(require("./create"));
const configure_1 = __importDefault(require("./configure"));
const mainPrompt = {
    type: 'select',
    name: 'type',
    message: 'Welcome to KultCLI',
    choices: [
        { title: 'Configure', value: 'configure' },
        { title: 'Generate', value: 'create' },
    ],
};
const run = async () => {
    const action = await (0, prompts_1.default)(mainPrompt);
    switch (action.type) {
        case 'configure':
            (0, configure_1.default)();
            break;
        case 'create':
            (0, create_1.default)();
            break;
    }
};
exports.run = run;
