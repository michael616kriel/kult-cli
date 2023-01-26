import prompts, { PromptObject } from 'prompts';
import {
  createController,
  createModel,
  createPlugin,
  getSourceDir,
} from '../utils/helpers';

const createPrompts: PromptObject<string> | PromptObject<string>[] = [
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
  const folderPath = getSourceDir();
  for (const prompt of createPrompts) {
    const response = await prompts(prompt);
    responses.push(response);
  }
  const [createType, createName] = responses.map((item) => item.value);
  switch (createType) {
    case 'controller':
      createController(folderPath, createName);
      break;
    case 'model':
      createModel(folderPath, createName);
      break;
    case 'plugin':
      createPlugin(folderPath, createName);
      break;
  }
};

export default create;
