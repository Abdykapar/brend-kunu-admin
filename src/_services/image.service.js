import { BaseApiService } from "@/_services/baseApi.service";
class ImageService extends BaseApiService {
  getById(id) {
    const url = `/image/${id}`;
    return this.sendGetRequest(url);
  }

  getAll() {
    const url = "/image";
    return this.sendGetRequest(url);
  }

  create(data) {
    const fd = new FormData();
    for (const [i, value] of Object.entries(data)) {
      fd.append(`${i}`, value);
    }
    const url = "/image/create";
    return this.sendPostRequest(url, fd);
  }

  update(data, id) {
    const fd = new FormData();
    for (const [i, value] of Object.entries(data)) {
      fd.append(`${i}`, value);
    }
    const url = `/image/update/${id}`;
    return this.sendPutRequest(url, fd);
  }

  delete(id) {
    const url = `/image/${id}`;
    return this.sendDeleteRequest(url);
  }

  deleteByName(name) {
    const url = `/image?url=${name}`;
    return this.sendDeleteRequest(url);
  }
}

export const imageService = new ImageService();
