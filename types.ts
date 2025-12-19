
export interface APIEntry {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}

export interface ApiResponse {
  count: number;
  entries: APIEntry[];
}

export type Theme = 'light' | 'dark';

export interface Category {
  name: string;
  count: number;
}
