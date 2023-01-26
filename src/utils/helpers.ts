import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import Handlebars from 'handlebars';
import { camelCase, kebabCase, snakeCase, startCase } from 'lodash';
import { join } from 'path';
import { StructureType } from './types';

Handlebars.registerHelper('pascalCase', function (value) {
  return startCase(camelCase(value)).replace(/ /g, '');
});

Handlebars.registerHelper('kebabCase', function (value) {
  return kebabCase(value);
});

Handlebars.registerHelper('titleCase', function (value) {
  return startCase(camelCase(value));
});

export const getTemplate = async (
  name: string,
  data: { [key: string]: string | number }
): Promise<string | null> => {
  const templatePath = join(
    require.main?.path || '',
    `./templates/${name}.hbs`
  );
  if (existsSync(templatePath)) {
    const content = await readFileSync(templatePath);
    const template = Handlebars.compile(content.toString());
    return template(data);
  }
  return null;
};

export const buildProjectStructure = async (
  basePath: string,
  structure: StructureType
) => {
  if (!existsSync(basePath)) {
    mkdirSync(basePath);
  }
  for (const item of structure) {
    const path = join(basePath, item.name);
    const isFile = item.name.includes('.ts');
    if (!existsSync(path)) {
      if (isFile) {
        let content = '';
        if (item.template) {
          content = (await getTemplate(item.template, {})) || '';
        }
        writeFileSync(path, content);
      } else {
        mkdirSync(path);
      }
    }
    if (item.children?.length && !isFile) {
      buildProjectStructure(path, item.children);
    }
  }
};

export const createController = async (basePath: string, name: string) => {
  const path = join(
    basePath,
    `app/controllers/${snakeCase(name)}.controller.ts`
  );
  if (!existsSync(path)) {
    const template = await getTemplate('controller', { name });
    if (template) {
      writeFileSync(path, template);
    }
  }
};

export const createModel = async (basePath: string, name: string) => {
  const path = join(basePath, `app/models/${snakeCase(name)}.model.ts`);
  if (!existsSync(path)) {
    const template = await getTemplate('model', { name });
    if (template) {
      writeFileSync(path, template);
    }
  }
};

export const createPlugin = async (basePath: string, name: string) => {
  const path = join(basePath, `plugins/${kebabCase(name)}`);
  if (!existsSync(path)) {
    mkdirSync(path);
  }
  const template = await getTemplate('plugin', { name });
  if (template) {
    writeFileSync(join(path, 'index.ts'), template);
  }
};

export const getSourceDir = () => {
  return join(process.cwd(), 'src');
};
