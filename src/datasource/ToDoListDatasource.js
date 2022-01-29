import { BaseDatasource } from '@tbiegner99/ui-app-components';

import ToDoSerializer from '../serializers/todo/ToDoSerializer';

const BASE_URL = '/api/todo';

class ToDoListDatasource extends BaseDatasource {
  constructor() {
    super(null, BASE_URL);
  }

  async getAllLists() {
    const url = this.constructUrl('/list');
    const { data: dbResults } = await this.client.get(url);
    const results = dbResults.map((listResult) => ToDoSerializer.fromListResponse(listResult));
    return results;
  }

  async getListItems(listId) {
    const url = this.constructUrl(`/list/${listId}/items`);
    const { data: dbResults } = await this.client.get(url);
    const results = dbResults.map((listItemResult) =>
      ToDoSerializer.fromListItemResponse(listItemResult)
    );
    return results;
  }

  async createItem(listId, item) {
    const url = this.constructUrl(`/list/${listId}/items`);
    const listItemBody = ToDoSerializer.toCreateItemRequest(listId, item);
    const { data: result } = await this.client.post(url, listItemBody);
    return ToDoSerializer.fromListItemResponse(result);
  }

  async deleteItem(listId, itemId) {
    const url = this.constructUrl(`/list/${listId}/items/${itemId}`);
    await this.client.delete(url);
  }

  async createList(list) {
    const url = this.constructUrl('/list');
    const listBody = ToDoSerializer.toCreateListRequest(list);
    const { data: result } = await this.client.post(url, listBody);
    return ToDoSerializer.fromListResponse(result);
  }

  deleteList(listId) {
    const url = this.constructUrl(`/list/${listId}`);
    return this.client.delete(url);
  }
}

export default new ToDoListDatasource();
