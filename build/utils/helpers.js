"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSourceDir = exports.createPlugin = exports.createModel = exports.createController = exports.buildProjectStructure = exports.getTemplate = void 0;
const fs_1 = require("fs");
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = require("path");
const lodash_1 = require("lodash");
handlebars_1.default.registerHelper('pascalCase', function (value) {
    return (0, lodash_1.startCase)((0, lodash_1.camelCase)(value)).replace(/ /g, '');
});
handlebars_1.default.registerHelper('kebabCase', function (value) {
    return (0, lodash_1.kebabCase)(value);
});
handlebars_1.default.registerHelper('titleCase', function (value) {
    return (0, lodash_1.startCase)((0, lodash_1.camelCase)(value));
});
const getTemplate = async (name, data) => {
    var _a;
    const templatePath = (0, path_1.join)(((_a = require.main) === null || _a === void 0 ? void 0 : _a.path) || '', `./templates/${name}.hbs`);
    if ((0, fs_1.existsSync)(templatePath)) {
        const content = await (0, fs_1.readFileSync)(templatePath);
        const template = handlebars_1.default.compile(content.toString());
        return template(data);
    }
    return null;
};
exports.getTemplate = getTemplate;
const buildProjectStructure = async (basePath, structure) => {
    var _a;
    if (!(0, fs_1.existsSync)(basePath)) {
        (0, fs_1.mkdirSync)(basePath);
    }
    for (const item of structure) {
        const path = (0, path_1.join)(basePath, item.name);
        const isFile = item.name.includes('.ts');
        if (!(0, fs_1.existsSync)(path)) {
            if (isFile) {
                let content = '';
                if (item.template) {
                    content = (await (0, exports.getTemplate)(item.template, {})) || '';
                }
                (0, fs_1.writeFileSync)(path, content);
            }
            else {
                (0, fs_1.mkdirSync)(path);
            }
        }
        if (((_a = item.children) === null || _a === void 0 ? void 0 : _a.length) && !isFile) {
            (0, exports.buildProjectStructure)(path, item.children);
        }
    }
};
exports.buildProjectStructure = buildProjectStructure;
const createController = async (basePath, name) => {
    const path = (0, path_1.join)(basePath, `app/controllers/${(0, lodash_1.snakeCase)(name)}.controller.ts`);
    if (!(0, fs_1.existsSync)(path)) {
        const template = await (0, exports.getTemplate)('controller', { name });
        if (template) {
            (0, fs_1.writeFileSync)(path, template);
        }
    }
};
exports.createController = createController;
const createModel = async (basePath, name) => {
    const path = (0, path_1.join)(basePath, `app/models/${(0, lodash_1.snakeCase)(name)}.model.ts`);
    if (!(0, fs_1.existsSync)(path)) {
        const template = await (0, exports.getTemplate)('model', { name });
        if (template) {
            (0, fs_1.writeFileSync)(path, template);
        }
    }
};
exports.createModel = createModel;
const createPlugin = async (basePath, name) => {
    const path = (0, path_1.join)(basePath, `plugins/${(0, lodash_1.kebabCase)(name)}`);
    if (!(0, fs_1.existsSync)(path)) {
        (0, fs_1.mkdirSync)(path);
    }
    const template = await (0, exports.getTemplate)('plugin', { name });
    if (template) {
        (0, fs_1.writeFileSync)((0, path_1.join)(path, 'index.ts'), template);
    }
};
exports.createPlugin = createPlugin;
const getSourceDir = () => {
    return (0, path_1.join)(process.cwd(), 'src');
};
exports.getSourceDir = getSourceDir;
