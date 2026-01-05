export async function apiGet<T>(url: string): Promise<T> {
    const res = await fetch(url)
    if (!res.ok) throw new Error("API error")
    return res.json()
  }
  
  export async function apiPost<T>(
    url: string,
    body: unknown
  ): Promise<T> {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error("API error")
    return res.json()
  }
  