export async function apiRequest(method, url, data) {
  try {
    // const res = await fetch(`http://localhost:5000${url}`, {
    const res = await fetch(`https://intelliform.onrender.com${url}`, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "omit",
      // credentials: "include",
    });

    if (!res.ok) {
      throw new Error("API Failed!");
    }

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
