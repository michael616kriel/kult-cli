"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../utils/helpers");
const projectStruture = [
    {
        name: 'app',
        children: [
            {
                name: 'controllers',
            },
            {
                name: 'models',
            },
        ],
    },
    {
        name: 'config',
        children: [
            {
                name: 'server.ts',
                template: 'config/server',
            },
            {
                name: 'database.ts',
                template: 'config/database',
            },
        ],
    },
    {
        name: 'plugins',
    },
];
const configure = () => {
    const folderPath = (0, helpers_1.getSourceDir)();
    (0, helpers_1.buildProjectStructure)(folderPath, projectStruture);
};
exports.default = configure;
