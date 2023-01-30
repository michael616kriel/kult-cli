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
        name: 'plugins.ts',
        template: 'config/database',
      },
      {
        name: 'database.ts',
        template: 'config/plugins',
      },
      {
        name: 'cors.ts',
        template: 'config/cors',
      },
      {
        name: 'drive.ts',
        template: 'config/drive',
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
