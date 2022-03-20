import { BaseApiService } from "@/_services/baseApi.service";

class CategoryService extends BaseApiService {
  getById(id) {
    const url = `/categories/${id}`;
    return this.sendGetRequest(url);
  }

  getAll(sub = "") {
    const url = `/categories?sub=${sub}`;
    return this.sendGetRequest(url);
  }

  create(data) {
    const url = "/categories/create";
    return this.sendPostRequest(url, data);
  }

  update(data) {
    const url = `/categories/update/${data._id}`;
    delete data._id;
    return this.sendPutRequest(url, data);
  }

  delete(id) {
    const url = `/categories/${id}`;
    return this.sendDeleteRequest(url);
  }
}

export const categoryService = new CategoryService();
