import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import Handlebars from 'handlebars';
import { join } from 'path';

type StructureType = {
  name: string;
  children?: StructureType;
  template?: string;
}[];

export const projectStruture: StructureType = [
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

export const getTemplate = async (
  name: string,
  data: { [key: string]: string | number }
): Promise<string | null> => {
  const templatePath = join(process.cwd(), `./src/templates/${name}.hbs`);
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
    `app/controllers/${name.toLowerCase()}.controller.ts`
  );
  if (!existsSync(path)) {
    const template = await getTemplate('controller', { name });
    if (template) {
      writeFileSync(path, template);
    }
  }
};

export const createModel = async (basePath: string, name: string) => {
  const path = join(basePath, `app/models/${name.toLowerCase()}.model.ts`);
  if (!existsSync(path)) {
    const template = await getTemplate('model', { name });
    if (template) {
      writeFileSync(path, template);
    }
  }
};

export const createPlugin = async (basePath: string, name: string) => {
  const path = join(basePath, `plugins/${name.toLowerCase()}`);
  if (!existsSync(path)) {
    mkdirSync(path);
  }
  const template = await getTemplate('plugin', { name });
  if (template) {
    writeFileSync(join(path, 'index.ts'), template);
  }
};
