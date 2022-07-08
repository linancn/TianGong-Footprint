export type Supply = {
  id: number;
  material?: string;
  materialCategory?: string;
  materialType?: string;
  packaging?: string;
  totalMass?: number;
  processing?: Processing[];
  tansportation?: Tansportation[];
};

export type Processing = {
  id: number;
  materialCategory?: string;
  materialType?: string;
  processCategory?: string;
};
export type Tansportation = {
  id: number;
  supplierPercentage?: string;
  supplierLocation?: string;
  transportMode?: string;
};
export type Project = {
  projectName: string;
  totalProductWeignt: number;
  projectCategory: string;
  supply: Supply[];
  location: string;
  electricitySource: string;
  electricity: number;
  ratio: string;
};
