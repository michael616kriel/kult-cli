import { StructureType } from './types';
export declare const getTemplate: (name: string, data: {
    [key: string]: string | number;
}) => Promise<string | null>;
export declare const buildProjectStructure: (basePath: string, structure: StructureType) => Promise<void>;
export declare const createController: (basePath: string, name: string) => Promise<void>;
export declare const createModel: (basePath: string, name: string) => Promise<void>;
export declare const createPlugin: (basePath: string, name: string) => Promise<void>;
export declare const getSourceDir: () => string;
