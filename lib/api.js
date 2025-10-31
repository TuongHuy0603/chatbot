export async function api(endpoint, { method = 'GET', data, headers = {} } = {}) {
  const res = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include',
    cache: 'no-store',
  });

  let json;
  try {
    json = await res.json();
  } catch (_) {
    json = null;
  }

  if (!res.ok) {
    const err = new Error('API error');
    err.status = res.status;
    err.data = json;
    throw err;
  }

  return json;
}


