export const handleResponse = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // userService.logout()
        // window.location.href = '/'
        // location.reload(true)
      }
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }
    return data
  })
}
