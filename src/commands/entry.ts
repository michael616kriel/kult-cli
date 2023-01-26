import prompts, { PromptObject } from 'prompts';
import create from './create';
import configure from './configure';

const mainPrompt: PromptObject<string> = {
  type: 'select',
  name: 'type',
  message: 'Welcome to KultCLI',
  choices: [
    { title: 'Bootstrap', value: 'configure' },
    { title: 'Generate', value: 'create' },
  ],
};

export const run = async () => {
  const action = await prompts(mainPrompt);
  switch (action.type) {
    case 'configure':
      configure();
      break;
    case 'create':
      create();
      break;
  }
};
