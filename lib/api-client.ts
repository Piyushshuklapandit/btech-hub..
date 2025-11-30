const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/api"

class APIClient {
  private token: string | null = null

  setToken(token: string) {
    this.token = token
  }

  clearToken() {
    this.token = null
  }

  private getHeaders(contentType = "application/json") {
    const headers: Record<string, string> = {
      "Content-Type": contentType,
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    return headers
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: this.getHeaders(options.headers?.["Content-Type"] as string),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "API Error")
    }

    return response.json()
  }

  // Auth
  login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  // Subjects
  getSubjects() {
    return this.request("/subjects")
  }

  createSubject(data: any) {
    return this.request("/subjects", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  updateSubject(id: string, data: any) {
    return this.request(`/subjects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  deleteSubject(id: string) {
    return this.request(`/subjects/${id}`, {
      method: "DELETE",
    })
  }

  // Config
  getConfig() {
    return this.request("/config")
  }

  updateConfig(data: any) {
    return this.request("/config", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new APIClient()
