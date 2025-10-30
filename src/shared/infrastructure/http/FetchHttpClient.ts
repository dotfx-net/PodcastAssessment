import { HttpClient } from './HttpClient';

export class FetchHttpClient implements HttpClient {
  constructor(private readonly baseUrl: string) {}

  async get<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(this.baseUrl + url, { ...init, method: 'GET' });

    if (!res.ok) { throw new Error(`HTTP ${res.status}`); }

    return res.json() as Promise<T>;
  }
};
