export async function requestServer<T>(
  url: string,
  method: string = "GET",
  data?: any
) {
  try {
    const response = await fetch("/api" + url, {
      headers: {
        "content-type": "application/json",
      },
      method,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка при выполнении запроса");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
