import { BaseApiService } from "@/_services/baseApi.service";
class PostService extends BaseApiService {
  getById(id) {
    const url = `/post/${id}`;
    return this.sendGetRequest(url);
  }

  getAll() {
    const url = "/post";
    return this.sendGetRequest(url);
  }

  create(data) {
    const fd = new FormData();
    for (const [i, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        for (const j of value) {
          fd.append(`${i}`, j);
        }
      } else fd.append(`${i}`, value);
    }
    const url = "/post/create";
    return this.sendPostRequest(url, fd);
  }

  update(data, id) {
    delete data.image_url;
    const fd = new FormData();
    for (const [i, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        for (const j of value) {
          fd.append(`${i}`, j);
        }
      } else fd.append(`${i}`, value);
    }
    const url = `/post/update/${id}`;
    return this.sendPutRequest(url, fd);
  }

  delete(id) {
    const url = `/post/${id}`;
    return this.sendDeleteRequest(url);
  }
}

export const postService = new PostService();
