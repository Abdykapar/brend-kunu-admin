export function authHeader () {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}

  if (user && user.token) {
    return { Authorization: "Bearer_" + user.token }
  } else {
    return {}
  }
}
