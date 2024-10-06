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
}

export interface SearchResults {
  features: Suggestion[];
}
