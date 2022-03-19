import { BaseApiService } from "@/_services/baseApi.service"

const USER_PREFIX = "users"

class UserService extends BaseApiService {
  getById (id) {
    const url = `/${USER_PREFIX}/${id}`
    return this.sendGetRequest(url)
  }

  getAll (sub = "") {
    const url = `/${USER_PREFIX}?sub=${sub}`
    return this.sendGetRequest(url)
  }

  create (data) {
    const url = `/${USER_PREFIX}/create`
    return this.sendPostRequest(url, data)
  }

  update (data) {
    const url = `/${USER_PREFIX}/update/${data._id}`
    delete data._id
    return this.sendPutRequest(url, data)
  }

  delete (id) {
    const url = `/${USER_PREFIX}/${id}`
    return this.sendDeleteRequest(url)
  }
}

export const userService = new UserService()
