import { StructureType } from '../utils/types';
import { buildProjectStructure, getSourceDir } from '../utils/helpers';

const projectStruture: StructureType = [
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
  const folderPath = getSourceDir();
  buildProjectStructure(folderPath, projectStruture);
};

export default configure;
