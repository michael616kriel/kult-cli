export type StructureType = {
  name: string;
  children?: StructureType;
  template?: string;
}[];
