export async function apiRequest(method, url, data) {
  const res = await fetch(`https://intelliform.onrender.com${url}`, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

//   await throwIfResNotOk(res);
  return res;
}
