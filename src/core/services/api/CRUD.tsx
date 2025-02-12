export abstract class AbstractCRUD<T> {
  abstract apiUrl: string;

  async getById(id: string) {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      credentials: 'include',
    });
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Resource not found');
      }
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return await response.json();
  }

  async getAll() {
    const response = await fetch(this.apiUrl, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result;
  }

  async create(data: T) {
    const response = await fetch(this.apiUrl + '/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }

  async updateData(id: string, data: T) {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();

  }

  async deleteData(id: string) {

    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();

  }
}