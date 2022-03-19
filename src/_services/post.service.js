import { BaseApiService } from "@/_services/baseApi.service"
// interface Post {
// 	title: string;
// 	description: string;
// 	text: string;
// 	image: string;
// 	categogyId: string;
//     _id?: string;
// }
class PostService extends BaseApiService {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
  }

  getById (id: string) {
    const url = `${BaseApiService.baseApiV1}/post/${id}`
    return this.sendGetRequest(url)
  }

  getAll () {
    const url = `${BaseApiService.baseApiV1}/post`
    return this.sendGetRequest(url)
  }

  create (data: object) {
    const fd = new FormData()
    for (const [i, value] of Object.entries(data)) {
      fd.append(`${i}`, value)
    }
    const url = `${BaseApiService.baseApiV1}/post/create`
    return this.sendPostRequest(url, fd)
  }

  update (data: Record<string, any>, id: string) {
    delete data.image_url
    const fd = new FormData()
    for (const [i, value] of Object.entries(data)) {
      fd.append(`${i}`, value)
    }
    const url = `${BaseApiService.baseApiV1}/post/update/${id}`
    return this.sendPutRequest(url, fd)
  }

  delete (id: string) {
    const url = `${BaseApiService.baseApiV1}/post/${id}`
    return this.sendDeleteRequest(url)
  }
}

export const postService = new PostService()
