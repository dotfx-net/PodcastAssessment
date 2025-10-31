import { HttpClient } from './HttpClient';

export class FetchHttpClient implements HttpClient {
  constructor(private readonly baseUrl: string) {}

  async get<T>(url: string, init?: RequestInit): Promise<T> {
    const isDev = process.env.NODE_ENV === 'development';
    const finalUrl = this.baseUrl + (isDev ? url : `/get?url=${encodeURIComponent(url)}`);

    const res = await fetch(finalUrl, { ...init, method: 'GET' });

    if (!res.ok) { throw new Error(`HTTP ${res.status}`); }

    return res.json() as Promise<T>;
  }
};
