import axios from 'axios';

class Api {
  PAGE_DEFAULT = 1;
  LIMIT_DEFAULT = 10;

  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  #filterUndefined(obj = {}) {
    return Object.fromEntries(
      Object.entries(obj)
        .map(([k, v]) => [k, this.#cleanString(v)])
        .filter(([_, v]) => v !== undefined)
    );
  }

  #cleanString(value = '') {
    if (typeof value !== 'string') return undefined;
    const trimmed = value.trim();
    return trimmed.length ? trimmed : undefined;
  }

  #cleanNumber(value, defaultValue) {
    const num = Number(value);
    return Number.isFinite(num) ? num : defaultValue;
  }

  async getExercisesByFilters(payload = {}) {
    const { page, limit, ...rest } = payload;

    const params = {
      ...this.#filterUndefined(rest),
      page: this.#cleanNumber(page, this.PAGE_DEFAULT),
      limit: this.#cleanNumber(limit, this.LIMIT_DEFAULT),
    };

    try {
      const response = await this.client.get('exercises', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async getExercisesById(id = '') {
    const cleanId = this.#cleanString(id);
    if (!cleanId) {
      return {};
    }

    try {
      const response = await this.client.get(`exercises/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async getFiltersOfExercises(payload = {}) {
    const { filter, page, limit } = payload;

    console.log(filter);

    const params = {
      filter: this.#cleanString(filter),
      page: this.#cleanNumber(page, this.PAGE_DEFAULT),
      limit: this.#cleanNumber(limit, this.LIMIT_DEFAULT),
    };

    try {
      const response = await this.client.get('filters', { params });
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async getQuote() {
    const response = await this.client.get('quote');
    return response.data;
  }

  async subscribe(email = '') {
    try {
      const response = await this.client.post('subscription', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
}

export const api = new Api('https://your-energy.b.goit.study/api/');
