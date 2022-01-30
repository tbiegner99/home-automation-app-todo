import dayjs from 'dayjs';

class ToDoListSerializer {
  fromListResponse(list) {
    return {
      listId: list.listId,
      name: list.name,
      description: list.description,
      created: dayjs(list.created)
    };
  }

  toCreateListRequest(list) {
    return {
      name: list.name,
      description: list.description || null
    };
  }

  toCreateItemRequest(listId, item) {
    return {
      name: item.name,
      description: item.description || null,
      quantity: item.quantity || null,
      where: item.whereToBuy || null,
      estimatedCost: item.estimatedCost || null,
      notes: item.notes || null,
      link: item.link || null
    };
  }

  fromListItemResponse(item) {
    return {
      listItemId: item.itemId,
      listId: item.listId,
      name: item.name,
      description: item.description,
      priority: item.description,
      state: item.state,
      completed: item.completed,
      quantity: item.quantity,
      whereToBuy: item.where,
      estimatedCost: item.estimatedCost,
      notes: item.notes,
      link: item.link
    };
  }
}

export default new ToDoListSerializer();
