import { handleResponse } from "@/_helpers"

const baseApi = process.env.VUE_APP_URL

export const authService = {
  login ({ username, password }) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    }
    return fetch(`${baseApi}/users/login`, requestOptions)
      .then(handleResponse)
  },
  register ({ username, password }) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    }
    return fetch(`${baseApi}/users/register`, requestOptions)
      .then(handleResponse)
  },
  logout () {
    localStorage.removeItem("user")
  }
}
