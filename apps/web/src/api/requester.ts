type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method?: Method;
  headers?: Record<string, string>;
  body?: string;
}

async function requester<T>(method: Method, url: string, data?: unknown): Promise<T> {
  const options: RequestOptions = {};

  const state = JSON.parse(localStorage.getItem('__state') || '{}');
  const accessToken = state.accessToken;

  if (accessToken) {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
    };
  }

  if (method !== 'GET') {
    options.method = method;
  }

  if (data) {
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json',
    };

    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  const hasContent = response.headers.get('Content-Length') !== '0' && response.status !== 204;
  let result: T | undefined = undefined;

  if (hasContent) {
    result = await response.json();
  }

  if (!response.ok) {
    throw result;
  }

  return result!;
}

export const get = requester.bind(null, 'GET') as <T>(url: string) => Promise<T>;
export const post = requester.bind(null, 'POST') as <T>(url: string, data?: unknown) => Promise<T>;
export const put = requester.bind(null, 'PUT') as <T>(url: string, data?: unknown) => Promise<T>;
export const del = requester.bind(null, 'DELETE') as <T>(url: string) => Promise<T>;

export default {
  get,
  post,
  put,
  del,
};
