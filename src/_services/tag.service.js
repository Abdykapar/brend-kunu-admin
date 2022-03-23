import { BaseApiService } from "@/_services/baseApi.service";

const TAG_PREFIX = "tag"

class TagService extends BaseApiService {
  getById(id) {
    const url = `/${TAG_PREFIX}/${id}`;
    return this.sendGetRequest(url);
  }

  getAll() {
    const url = `/${TAG_PREFIX}`;
    return this.sendGetRequest(url);
  }

  create(data) {
    const url = `/${TAG_PREFIX}/create`;
    return this.sendPostRequest(url, data);
  }

  update(data) {
    const url = `/${TAG_PREFIX}/update/${data._id}`;
    delete data._id;
    return this.sendPutRequest(url, data);
  }

  delete(id) {
    const url = `/${TAG_PREFIX}/${id}`;
    return this.sendDeleteRequest(url);
  }
}

export const tagService = new TagService();
