import { apiURL } from '../constants/config';
import { ResponseLimit } from '../types/limits';

export async function getLimits() {
  try {
    const response = await fetch(`${apiURL}/limits`);
    const data = await response.json();
    return data as ResponseLimit;
  } catch (error) {
    console.error(error);
    return {} as ResponseLimit;
  }
}
