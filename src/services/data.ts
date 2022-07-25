export type Supply = {
  id: string;
  material?: string;
  materialCategory?: string;
  materialType?: string;
  packaging?: boolean;
  totalMass?: number;
  processing?: Processing[];
  transportation?: Transportation[];
};

export type Processing = {
  // supplyid?: number;
  id: string;
  // materialCategory?: string;
  processType?: string;
  processCategory?: string;
};

export type Transportation = {
  // supplyid?: number;
  id: string;
  supplierPercentage?: number;
  supplierLocation?: string;
  transportMode?: string;
  distance?: number;
};

export type Destination = {
  id: string;
  destinationPercentage?: number;
  destinationLocation?: string;
  transportMode?: string;
  distance?: number;
};

export type Project = {
  projectName?: string;
  // totalProductWeignt?: number;
  // projectCategory?: string;
  supply: Supply[];
  location?: string;
  electricitySource?: string;
  electricity?: number;
  ratio?: number;
  manufactureCo2e?: number;
  destination?: Destination[];
};
