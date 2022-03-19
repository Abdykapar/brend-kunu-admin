import { BaseApiService } from "@/_services/baseApi.service"

class SubCategoryService extends BaseApiService {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
  }

  getById (id: string) {
    const url = `${BaseApiService.baseApiV1}/sub-categories/${id}`
    return this.sendGetRequest(url)
  }

  getAll () {
    const url = `${BaseApiService.baseApiV1}/sub-categories`
    return this.sendGetRequest(url)
  }

  create (data: object) {
    const url = `${BaseApiService.baseApiV1}/sub-categories/create`
    return this.sendPostRequest(url, data)
  }

  update (data: any) {
    const url = `${BaseApiService.baseApiV1}/sub-categories/update/${data._id}`
    delete data._id
    return this.sendPutRequest(url, data)
  }

  delete (id: string) {
    const url = `${BaseApiService.baseApiV1}/sub-categories/${id}`
    return this.sendDeleteRequest(url)
  }
}

export const subCategoryService = new SubCategoryService()
