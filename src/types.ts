// raw story shape returned by algolia HN API
export type AlgoliaStory = {
  objectID: string;
  story_id: number;
  title: string | null;
  url: string | null;
  author: string;
  points: number | null;
  num_comments: number | null;
  created_at: string;
  created_at_i: number;
  updated_at: string;
  children?: number[];
  _tags: string[];
};

export type AlgoliaSearchResponse = {
  hits: AlgoliaStory[];
  page: number;
  nbPages: number;
  hitsPerPage: number;
  nbHits: number;
};

export type Theme = "light" | "dark";
