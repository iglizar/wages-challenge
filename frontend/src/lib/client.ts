const clientUrl = process.env.API_URL || "http://localhost:3001";

export const apiClient = {
  get: async (path: string) => {
    const url = `${clientUrl}/${path}`;
    const token = localStorage.getItem("user");
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },
  post: async (path: string, body: any) => {
    const url = `${clientUrl}/${path}`;
    const token = localStorage.getItem("user");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  },
};
