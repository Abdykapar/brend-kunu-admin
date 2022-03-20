import { BaseApiService } from "@/_services/baseApi.service";

class SubCategoryService extends BaseApiService {
  getById(id) {
    const url = `/sub-categories/${id}`;
    return this.sendGetRequest(url);
  }

  getAll() {
    const url = "/sub-categories";
    return this.sendGetRequest(url);
  }

  create(data) {
    const url = "/sub-categories/create";
    return this.sendPostRequest(url, data);
  }

  update(data) {
    const url = `/sub-categories/update/${data._id}`;
    delete data._id;
    return this.sendPutRequest(url, data);
  }

  delete(id) {
    const url = `/sub-categories/${id}`;
    return this.sendDeleteRequest(url);
  }
}

export const subCategoryService = new SubCategoryService();
