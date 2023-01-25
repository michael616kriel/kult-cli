#!/usr/bin/env node

import { join } from 'path';
import prompts, { PromptObject } from 'prompts';
import {
  buildProjectStructure,
  createController,
  createModel,
  createPlugin,
  projectStruture,
} from './helpers.mjs';

const deafaultPrompt: PromptObject<string> = {
  type: 'select',
  name: 'type',
  message: 'What would you like to?',
  choices: [
    { title: 'Configure Project', value: 'configure' },
    { title: 'Create Models, Controllers, Plugin', value: 'create' },
  ],
};

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
    message: 'Please enter a name:',
  },
];

export const getPrompts = async () => {
  const responses = [];
  const action = await prompts(deafaultPrompt);
  const currentDirectory = process.cwd();
  const folderPath = join(currentDirectory, 'src/test');

  if (action.type === 'create') {
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
  }
  if (action.type === 'configure') {
    buildProjectStructure(folderPath, projectStruture);
  }
};
