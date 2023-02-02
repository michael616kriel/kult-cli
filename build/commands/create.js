"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = __importDefault(require("prompts"));
const helpers_1 = require("../utils/helpers");
const createPrompts = [
    {
        type: 'select',
        name: 'value',
        message: 'Create',
        choices: [
            { title: 'Controller', value: 'controller' },
            { title: 'Model', value: 'model' },
            { title: 'Plugin', value: 'plugin' },
        ],
    },
    {
        type: 'text',
        name: 'value',
        message: 'Enter a name:',
    },
];
const create = async () => {
    const responses = [];
    const folderPath = (0, helpers_1.getSourceDir)();
    for (const prompt of createPrompts) {
        const response = await (0, prompts_1.default)(prompt);
        responses.push(response);
    }
    const [createType, createName] = responses.map((item) => item.value);
    switch (createType) {
        case 'controller':
            (0, helpers_1.createController)(folderPath, createName);
            break;
        case 'model':
            (0, helpers_1.createModel)(folderPath, createName);
            break;
        case 'plugin':
            (0, helpers_1.createPlugin)(folderPath, createName);
            break;
    }
};
exports.default = create;
