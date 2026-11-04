const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  async getCategories() {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  async getActiveList() {
    const res = await fetch(`${API_BASE_URL}/shopping-lists/active`);
    if (!res.ok) throw new Error('Failed to fetch active list');
    return res.json();
  },

  async getListItems(listId = 1, categoryId = null) {
    let url = `${API_BASE_URL}/shopping-lists/${listId}/items`;
    if (categoryId) url += `?categoryId=${categoryId}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch items');
    return res.json();
  },

  async addItem(listId = 1, itemData) {
    const res = await fetch(`${API_BASE_URL}/shopping-lists/${listId}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    });
    if (!res.ok) throw new Error('Failed to add item');
    return res.json();
  },

  async updateItemStatus(itemId, status, receivedQuantity = null) {
    const res = await fetch(`${API_BASE_URL}/shopping-lists/items/${itemId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, receivedQuantity }),
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  },

  async deleteItem(itemId) {
    const res = await fetch(`${API_BASE_URL}/shopping-lists/items/${itemId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete item');
  },

  async clearPurchased(listId = 1) {
    const res = await fetch(`${API_BASE_URL}/shopping-lists/${listId}/clear-purchased`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to clear purchased items');
  },

  // Price Catalog APIs
  async getPrices(categoryId = null, search = '') {
    let url = `${API_BASE_URL}/prices`;
    const params = new URLSearchParams();
    if (categoryId) params.append('categoryId', categoryId);
    if (search) params.append('search', search);
    if (params.toString()) url += `?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch prices');
    return res.json();
  },

  async addPrice(priceData) {
    const res = await fetch(`${API_BASE_URL}/prices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(priceData),
    });
    if (!res.ok) throw new Error('Failed to add price');
    return res.json();
  },

  async deletePrice(priceId) {
    const res = await fetch(`${API_BASE_URL}/prices/${priceId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete price');
  }
};
