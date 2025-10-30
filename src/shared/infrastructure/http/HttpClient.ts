export interface HttpClient {
  get<T>(url: string, init?: RequestInit): Promise<T>;
};
