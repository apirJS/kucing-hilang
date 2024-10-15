export interface Suggestion {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: {
    mapbox_id: string;
    wikidata: string;
    short_code: string;
  };
  text: string;
  place_name: string;
  bbox: number[];
  center: [number, number];
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  context: {
    id: string;
    mapbox_id: string;
    wikidata: string;
    short_code: string;
    text: string;
  }[];
  selected: boolean;
}

export interface SearchResults {
  features: Suggestion[];
}

type BaseLocation = {
  id: string;
  name: string;
};

export type Province = BaseLocation;

export type Regency = BaseLocation & {
  province_id: string;
};

export type District = BaseLocation & {
  regency_id: string;
};

export type Village = BaseLocation & {
  district_id: string;
};
