export type LayerInfo = {
  identifier: string;
  packages: string;
  note?: string;
  runtime: string;
  architectures: string[];
  layer_version_arn: string;
  created_at: string;
  region: string;
};

export type PublicLayer = {
  identifier: string;
  latest_layers: LayerInfo[];
  all_layers: LayerInfo[];
};

export type RawSourceData = {
  layers: PublicLayer[];
};

export type SourceData = {
  identifiers: string[];
  mapping: { [key: string]: PublicLayer };
};
