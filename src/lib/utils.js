export async function apiRequest(method, url, data) {
  try {
    let finalUrl = `https://intelliform.onrender.com${url}`;
    if (process.env.NODE_ENV === "development") {
      finalUrl = `http://localhost:5000${url}`;
    }
    const res = await fetch(finalUrl, {
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
