import { ResponseLimit } from '../types/limits';

export async function getLimits() {
  try {
    const response = await fetch('http://localhost:3001/limits');
    const data = await response.json();
    return data as ResponseLimit;
  } catch (error) {
    console.error(error);
    return {} as ResponseLimit;
  }
}
