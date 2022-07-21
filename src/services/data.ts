export type Supply = {
  id: string;
  material?: string;
  materialCategory?: string;
  materialType?: string;
  packaging?: string;
  totalMass?: number;
  processing?: Processing[];
  transportation?: Transportation[];
};

export type Processing = {
  supplyid?: number;
  id: string;
  materialCategory?: string;
  materialType?: string;
  processCategory?: string;
};

export type Transportation = {
  supplyid?: number;
  id: string;
  supplierPercentage?: string;
  supplierLocation?: string;
  transportMode?: string;
};

export type Destination = {
  id: string;
  destinationPercentage?: number;
  destinationLocation?: string;
  transportMode?: string;
};

export type Project = {
  projectName?: string;
  totalProductWeignt?: number;
  projectCategory?: string;
  supply: Supply[];
  location?: string;
  electricitySource?: string;
  electricity?: number;
  ratio?: string;
  co2e?: string;
  destination?: Destination[];
};
