export abstract class AbstractCRUD<T> {
  abstract apiUrl: string;

  async getById(id: string) {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Resource not found');
        }
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await fetch(this.apiUrl, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }

  async create(data: T) {
    try {
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async updateData(id: string, data: T) {
    try {
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async deleteData(id: string) {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}